import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Automatización Inteligente</h2>
        <input type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" className="w-full mb-4 p-2 border rounded" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;