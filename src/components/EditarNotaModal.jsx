import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditarNotaModal({ nota, onClose }) {
  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');
  const [metodo, setMetodo] = useState('patch'); // pode ser 'put' ou 'patch'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (nota) {
      setTitulo(nota.titulo || '');
      setCorpo(nota.corpo || '');
    }
  }, [nota]);

  const handleSalvar = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    // Pega o id da nota, tentando diferentes propriedades
    const notaId = nota?.id || nota?.id_nota;

    if (!notaId) {
      console.error('ID da nota não definido:', nota);
      setLoading(false);
      return;
    }

    try {
      let response;
      const dados = { titulo, corpo };

      if (metodo === 'put') {
        // PUT atualiza a nota inteira
        response = await axios.put(`http://localhost:8080/atualizaNota/${notaId}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // PATCH atualiza parcialmente (pode enviar só os campos que mudou)
        response = await axios.patch(`http://localhost:8080/corrigirNota/${notaId}`, dados, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!nota) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Nota</h2>

        <label className="block mb-1 font-semibold">Título</label>
        <input
          type="text"
          className="w-full mb-3 border p-2 rounded"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label className="block mb-1 font-semibold">Corpo</label>
        <textarea
          className="w-full mb-3 border p-2 rounded"
          placeholder="Corpo da nota"
          value={corpo}
          onChange={(e) => setCorpo(e.target.value)}
        />

        <div className="mb-4">
          <label className="mr-4 font-semibold">Método HTTP:</label>
          <select
            value={metodo}
            onChange={(e) => setMetodo(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="patch">PATCH (atualização parcial)</option>
            <option value="put">PUT (atualização completa)</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
