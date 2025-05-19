import { useState, useEffect, useContext } from 'react';

import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

import { AddNotasModal } from '../components/AddNotasModal';
import  VisualizaNotaModal  from '../components/VisualizaNotaModal';
import EditarNotaModal from '../components/EditarNotaModal';
import DeletarNotaModal from '../components/DeletarNotaModal';


export default function Home() {
  const [notas, setNotas] = useState([]);
  const { logout } = useContext(AuthContext);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVisualizaModalOpen, setIsVisualizaModalOpen] = useState(false);
  
  const [isDeletarModalOpen, setIsDeletarModalOpen] = useState(false);
  const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);

  const [notaSelecionadaId, setNotaSelecionadaId] = useState(null);
  const notaSelecionada = notas.find(n => n.id_nota === notaSelecionadaId);

  const fetchNotas = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get('/listas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotas(response.data.notas);
    return response;
  };

  const deletarNota = async (notaId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.delete(`/deletarNota/${notaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // ou você pode retornar algo específico da resposta
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
      throw error;
    }
  };



  useEffect(() => {
    fetchNotas();
  }, []);

  const abrirVisualizar = (id) => {
    setNotaSelecionadaId(id);
    setIsVisualizaModalOpen(true);
  };

  const abrirEditar = (id) => {
    setNotaSelecionadaId(id);
    setIsEditarModalOpen(true);
  };

  const abrirDeletar = (id) => {
    setNotaSelecionadaId(id);
    setIsDeletarModalOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-3xl mb-6">Minhas Anotações</h1>
      {notas.length === 0 && <p>Nenhuma anotação encontrada.</p>}
      <ul>
        {notas.map((nota) => (
          <li key={nota.id_nota} className="border p-3 mb-3 rounded shadow-sm">
            <h3 className="font-bold text-xl">{nota.titulo}</h3>
            <p>{nota.corpo}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => abrirVisualizar(nota.id_nota)} className="bg-gray-200 px-2 py-1 rounded">👁 Visualizar</button>
              <button onClick={() => abrirEditar(nota.id_nota)} className="bg-green-300 px-2 py-1 rounded">✏ Editar</button>
              <button onClick={() => abrirDeletar(nota.id_nota)} className="bg-red-400 px-2 py-1 rounded">🗑 Deletar</button>
              
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Criar Nova Anotação
      </button>

      <button
        onClick={logout}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 ml-2"
      >
        Sair
      </button>

      {isAddModalOpen && (
        <AddNotasModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={(novaNota) => {
            setNotas([...notas, novaNota]);
            setIsAddModalOpen(false);
          }}
        />
      )}

      {isVisualizaModalOpen && (
        <VisualizaNotaModal
          isOpen={isVisualizaModalOpen}
          onClose={() => setIsVisualizaModalOpen(false)}
          notaId={notaSelecionadaId}
          onSuccess={fetchNotas}
          onSubmit={async (dadosAtualizados) => {
            await visualizarNota(notaSelecionadaId, dadosAtualizados);
            setNotas(notas.map((nota) => (nota.id_nota === notaSelecionadaId ? { ...nota, ...dadosAtualizados } : nota)));
            setIsVisualizaModalOpen(false);
          }}
        />
      )}

      
      {isEditarModalOpen && (
        <EditarNotaModal
        isOpen={isEditarModalOpen}
        onClose={() => setIsEditarModalOpen(false)}
        nota={notas.find(n => n.id_nota === notaSelecionadaId)}
        onSubmit={async (dadosAtualizados) => {
          await corrigirNota(notaSelecionadaId, dadosAtualizados);
          setNotas(notas.map((nota) => (nota.id_nota === notaSelecionadaId ? { ...nota, ...dadosAtualizados } : nota)));
          setIsEditarModalOpen(false);
        }}
      />

      )}


      {isDeletarModalOpen && (
        <DeletarNotaModal
          isOpen={isDeletarModalOpen}
          onClose={() => setIsDeletarModalOpen(false)}
          notaId={notaSelecionadaId}
          onSuccess={fetchNotas}
          onDelete={async (id) => {
            await deletarNota(id);
            setNotas(notas.filter((nota) => nota.id_nota !== id));
            setIsDeletarModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
