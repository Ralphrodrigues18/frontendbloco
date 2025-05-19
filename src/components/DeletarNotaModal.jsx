// ModalDeletarNota.jsx
import React from 'react';

export default function DeletarNotaModal({ notaId, onClose, onDelete }) {
  
    
    return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold mb-4">Confirmar exclusão</h2>
        <p>Tem certeza que deseja deletar esta nota?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => onDelete(notaId)} className="px-4 py-2 bg-red-600 text-white rounded">Deletar</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
