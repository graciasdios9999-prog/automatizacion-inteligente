import express from 'express';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  res.json({ success: true, message: 'Usuario registrado', user: { email, name } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  res.json({ success: true, token: 'jwt_token_here', user: { email } });
});

export default router;