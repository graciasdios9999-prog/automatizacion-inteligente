import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import winston from 'winston';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

// ==================== CONFIGURACIÓN ====================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Base de datos PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/automation_db'
});

pool.on('error', (err) => {
  logger.error('Pool error:', err);
});

// ==================== MIDDLEWARE ====================
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// ==================== RUTAS HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ==================== AUTENTICACIÓN ====================
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    // Simple token validation (en producción usar JWT)
    const result = await pool.query(
      'SELECT id, email, name FROM users WHERE api_token = $1',
      [token]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    req.user = result.rows[0];
    next();
  } catch (error) {
    logger.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// ==================== RUTAS USUARIOS ====================
app.post('/api/auth/register', async (req, res) => {
  const { email, name, password } = req.body;
  
  try {
    const userId = uuidv4();
    const apiToken = uuidv4();
    
    await pool.query(
      'INSERT INTO users (id, email, name, password, api_token, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
      [userId, email, name, password, apiToken]
    );
    
    logger.info(`New user registered: ${email}`);
    res.json({ 
      success: true, 
      user_id: userId, 
      api_token: apiToken,
      message: 'User created successfully' 
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT id, email, name, api_token FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    logger.info(`User logged in: ${email}`);
    res.json({ 
      success: true, 
      api_token: user.api_token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ==================== GENERADOR DE CONTENIDO FINANCIERO ====================
const FINANCIAL_CONTENT_TEMPLATES = {
  investment_tip: [
    "💰 Tip de inversión: {insight}\n\n✅ Razón: {reason}\n\n🎯 Acción: {action}\n\n#FinanzasPersonales #Wealth #Inversión",
    "📈 Inversión inteligente: {insight}\n\nMuchas personas no saben que {reason}. Por eso {action}.\n\n#FinancialFreedom #Wealthy #Inversiones",
    "🚀 Oportunidad: {insight}\n\nData real: {reason}\n\nPróximo paso: {action}\n\n#BuildWealth #FinancialFreedom"
  ],
  mindset: [
    "🧠 Mentalidad de riqueza:\n\n{insight}\n\nNo es sobre dinero, es sobre {reason}.\n\n💡 Hoy: {action}\n\n#MindsetRico #Abundancia",
    "💭 Creencia limitante detectada:\n\n❌ {insight}\n✅ La verdad es: {reason}\n\n{action}\n\n#FinancialMindset #Wealthy",
  ],
  case_study: [
    "📊 Caso de éxito:\n\nJuan pasó de {from} a {to} en {time}.\n\n🔑 Cómo lo hizo:\n{reason}\n\n¿Quieres el paso a paso? {action}\n\n#CasoDeÉxito #Libertad",
    "✅ Persona real: {insight}\n\nResultado: {reason}\n\nTe enseño cómo en mi próximo webinar.\n\n{action}\n\n#SuccessStory #Finanzas"
  ]
};

const FINANCIAL_INSIGHTS = {
  investment: [
    { insight: "El 72% de millonarios invierte en ETFs", reason: "Diversificación automática y bajo riesgo", action: "Abre tu cuenta hoy en el broker que recomendamos" },
    { insight: "Los dividendos son tu ingreso pasivo número 1", reason: "Dinero que ganas mientras duermes", action: "Busca acciones con dividend yield > 3%" },
    { insight: "Invertir $100/mes desde los 25 te hace millonario", reason: "Interés compuesto es tu mejor amigo", action: "Comienza HOY, no mañana" }
  ],
  mindset: [
    { insight: "Dinero no da felicidad, pero sí opciones", reason: "Libertad de elegir es lo que nos hace ricos", action: "Cambia tu mentalidad de escasez a abundancia" },
    { insight: "No necesitas $1M para empezar a invertir", reason: "La mayoría comenzó con $100", action: "El mejor momento fue ayer, el segundo es HOY" }
  ],
  case_study: [
    { from: "Deudas de $50k", to: "Libertad financiera", time: "3 años", reason: "Plan de pago estratégico + inversión adicional", action: "Descarga mi guía gratuita" }
  ]
};

app.post('/api/generate-content', authenticateUser, async (req, res) => {
  const { type = 'investment_tip', platform = 'instagram' } = req.body;
  
  try {
    const templates = FINANCIAL_CONTENT_TEMPLATES[type] || FINANCIAL_CONTENT_TEMPLATES.investment_tip;
    const insights = FINANCIAL_INSIGHTS[type] || FINANCIAL_INSIGHTS.investment;
    
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    
    let content = randomTemplate;
    Object.keys(randomInsight).forEach(key => {
      content = content.replace(`{${key}}`, randomInsight[key]);
    });
    
    // Optimización por plataforma
    if (platform === 'tiktok') {
      content = `[HOOK VIRAL]\n\n${content}\n\n[CTA: Sígueme para más]`;
    } else if (platform === 'twitter') {
      content = content.substring(0, 280);
    }
    
    // Guardar contenido generado
    const contentId = uuidv4();
    await pool.query(
      `INSERT INTO generated_content 
       (id, user_id, type, platform, content, created_at, status) 
       VALUES ($1, $2, $3, $4, $5, NOW(), $6)`,
      [contentId, req.user.id, type, platform, content, 'draft']
    );
    
    logger.info(`Content generated for user: ${req.user.id}`);
    
    res.json({
      success: true,
      content_id: contentId,
      content: content,
      platform: platform,
      type: type,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Content generation error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// ==================== LISTAR CONTENIDO ====================
app.get('/api/content', authenticateUser, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, type, platform, content, status, created_at 
       FROM generated_content 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 50`,
      [req.user.id]
    );
    
    res.json({
      success: true,
      total: result.rows.length,
      content: result.rows
    });
  } catch (error) {
    logger.error('Fetch content error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// ==================== ACTUALIZAR CONTENIDO ====================
app.put('/api/content/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { content, status } = req.body;
  
  try {
    await pool.query(
      `UPDATE generated_content 
       SET content = COALESCE($1, content), 
           status = COALESCE($2, status),
           updated_at = NOW()
       WHERE id = $3 AND user_id = $4`,
      [content, status, id, req.user.id]
    );
    
    logger.info(`Content updated: ${id}`);
    res.json({ success: true, message: 'Content updated' });
  } catch (error) {
    logger.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// ==================== DASHBOARD MÉTRICAS ====================
app.get('/api/dashboard', authenticateUser, async (req, res) => {
  try {
    const contentCount = await pool.query(
      'SELECT COUNT(*) as total FROM generated_content WHERE user_id = $1',
      [req.user.id]
    );
    
    const publishedCount = await pool.query(
      'SELECT COUNT(*) as total FROM generated_content WHERE user_id = $1 AND status = $2',
      [req.user.id, 'published']
    );
    
    const platformStats = await pool.query(
      `SELECT platform, COUNT(*) as count 
       FROM generated_content 
       WHERE user_id = $1 
       GROUP BY platform`,
      [req.user.id]
    );
    
    res.json({
      success: true,
      stats: {
        total_content: parseInt(contentCount.rows[0].total),
        published_content: parseInt(publishedCount.rows[0].total),
        by_platform: platformStats.rows
      }
    });
  } catch (error) {
    logger.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

// ==================== INICIALIZACIÓN BD ====================
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        password VARCHAR(255),
        api_token UUID,
        created_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS generated_content (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        type VARCHAR(50),
        platform VARCHAR(50),
        content TEXT,
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        email VARCHAR(255),
        name VARCHAR(255),
        source VARCHAR(50),
        quality VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_content_user ON generated_content(user_id);
      CREATE INDEX IF NOT EXISTS idx_leads_user ON leads(user_id);
    `);
    logger.info('Database initialized successfully');
  } catch (error) {
    logger.error('Database initialization error:', error);
  }
};

// ==================== INICIO DEL SERVIDOR ====================
const startServer = async () => {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    logger.info(`✅ Server running on http://localhost:${PORT}`);
    logger.info(`📊 Generate content: POST /api/generate-content`);
    logger.info(`📋 List content: GET /api/content`);
    logger.info(`📈 Dashboard: GET /api/dashboard`);
  });
};

startServer().catch(error => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
