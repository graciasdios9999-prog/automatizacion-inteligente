import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import io from 'socket.io-client';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

const AdvancedDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Conectar WebSocket
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Suscribirse a usuario (ejemplo: user123)
    newSocket.emit('subscribe', 'user123');

    // Escuchar actualizaciones en tiempo real
    newSocket.on('metrics-update', (data) => {
      setMetrics(data);
      setHistory(prev => [...prev, { ...data, timestamp: new Date() }].slice(-50));
    });

    // Cargar datos iniciales
    fetch('http://localhost:3000/api/analytics/dashboard/user123')
      .then(res => res.json())
      .then(data => {
        setMetrics(data.metrics);
        setHistory(data.history || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    return () => newSocket.disconnect();
  }, []);

  if (loading) return <div className="p-8 text-center">⏳ Cargando métricas...</div>;

  const platformData = metrics ? [
    { name: 'Instagram', value: metrics.byPlatform?.instagram || 0 },
    { name: 'Twitter', value: metrics.byPlatform?.twitter || 0 },
    { name: 'Facebook', value: metrics.byPlatform?.facebook || 0 },
    { name: 'TikTok', value: metrics.byPlatform?.tiktok || 0 },
    { name: 'LinkedIn', value: metrics.byPlatform?.linkedin || 0 }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">📊 Dashboard Inteligente Real-Time</h1>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600 p-6 rounded-lg">
          <p className="text-gray-200">Total Posts</p>
          <p className="text-3xl font-bold">{metrics?.totalPosts || 0}</p>
        </div>
        <div className="bg-green-600 p-6 rounded-lg">
          <p className="text-gray-200">Engagement</p>
          <p className="text-3xl font-bold">{(metrics?.totalEngagement || 0).toLocaleString()}</p>
        </div>
        <div className="bg-purple-600 p-6 rounded-lg">
          <p className="text-gray-200">Reach</p>
          <p className="text-3xl font-bold">{(metrics?.totalReach || 0).toLocaleString()}</p>
        </div>
        <div className="bg-yellow-600 p-6 rounded-lg">
          <p className="text-gray-200">Impressions</p>
          <p className="text-3xl font-bold">{(metrics?.totalImpressions || 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Pie Chart - Platforms */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Posts por Plataforma</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={platformData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Metrics */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Engagement vs Reach</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: 'Engagement', value: metrics?.totalEngagement || 0, fill: '#3b82f6' }, { name: 'Reach', value: metrics?.totalReach || 0, fill: '#10b981' }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Histórico */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Histórico (últimas 50 actualizaciones)</h2>
        {history.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={history.slice(-20)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalEngagement" stroke="#3b82f6" name="Engagement" />
              <Line type="monotone" dataKey="totalReach" stroke="#10b981" name="Reach" />
              <Line type="monotone" dataKey="totalImpressions" stroke="#f59e0b" name="Impressions" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">Sin datos históricos aún</p>
        )}
      </div>

      {/* Botón Simular */}
      <div className="mt-8">
        <button
          onClick={() => fetch('http://localhost:3000/api/analytics/simulate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 'user123' }) })}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
        >
          🔄 Simular Actualización
        </button>
      </div>
    </div>
  );
};

export default AdvancedDashboard;