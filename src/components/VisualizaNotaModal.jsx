import { useEffect, useState } from 'react';
import axios from 'axios';

export default function VisualizaNotaModal({ isOpen, onClose, notaId }) {
  const [nota, setNota] = useState(null);
  const [loading, setLoading] = useState(false);

  const visualizarNota = async (id) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/procuraNota/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNota(response.data.nota);
      console.log("Nota encontrada:", response.data);
    } catch (error) {
      console.error("Erro ao visualizar nota:", error);
      setNota(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && notaId) {
      visualizarNota(notaId);
    } else {
      setNota(null);
    }
  }, [isOpen, notaId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Detalhes da Nota</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : nota ? (
          <>
            <h3 className="text-lg font-medium">Título:</h3>
            <p className="mb-4 text-white">{nota.titulo}</p>
            <h3 className="text-lg font-medium">Corpo:</h3>
            <p className="mb-4 text-white">{nota.corpo}</p>
            <button onClick={onClose} className="mt-4 bg-gray-300 px-4 py-2 rounded">Fechar</button>
          </>
        ) : (
          <p className="text-red-500">Nota não encontrada.</p>
        )}
      </div>
    </div>
  );
}
