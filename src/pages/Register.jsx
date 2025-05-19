import { useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/register', { name, email, password: senha });
      alert('Registrado com sucesso! Faça login.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Erro no registro');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-2xl mb-4">Registrar</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 mb-3 w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 mb-3 w-full"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        className="border p-2 mb-3 w-full"
        required
      />
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Registrar
      </button>

      {/* Botão para ir para página de login */}
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        Login
      </button>
    </form>
  );
}
