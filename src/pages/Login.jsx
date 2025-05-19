import { useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password: senha });
      login(response.data.token);
      localStorage.setItem('token', response.data.token);
      alert('Login realizado!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Erro no login');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-2xl mb-4">Login</h2>
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
        Entrar
      </button>

      {/* Botão para ir para página de registro */}
      <button
        type="button"
        onClick={() => navigate('/register')}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        Criar Conta
      </button>
    </form>
  );
}
