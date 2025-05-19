import api from "../api/api";
import {useState} from 'react';
export function AddNotasModal({ isOpen, onClose }) {
  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/notas', { titulo, corpo });
      alert('Nota adicionada com sucesso!');
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao adicionar nota');
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Adicionar Nota</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />
        <textarea
          placeholder="Corpo"
          value={corpo}
          onChange={e => setCorpo(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Adicionar
        </button>
        <button type="button" onClick={onClose} className="ml-2 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
          Cancelar
        </button>
      </form>
    </div>
  );
}