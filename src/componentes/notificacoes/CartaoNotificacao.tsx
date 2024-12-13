import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Notificacao } from '../../tipos/notificacao';

interface Props {
 notificacao: Notificacao;
}

export const CartaoNotificacao: React.FC<Props> = ({ notificacao }) => {
 return (
   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
     <div className="flex justify-between items-start mb-2">
       <div>
         <h3 className="font-medium text-sm">{notificacao.paciente}</h3>
         <span className="text-xs text-gray-500">ID: {notificacao.id}</span>
       </div>
       <span className={`text-xs px-2 py-1 rounded-full ${
         notificacao.status === 'pendente' 
           ? 'bg-yellow-100 text-yellow-800' 
           : 'bg-blue-100 text-blue-800'
       }`}>
         {notificacao.status === 'pendente' ? 'Pendente' : 'Em análise'}
       </span>
     </div>
     <p className="text-sm text-gray-600 mb-2">{notificacao.descricao}</p>
     {notificacao.dae && (
       <p className="text-xs text-blue-600 mb-2">DAE: {notificacao.dae}</p>
     )}
     <div className="flex justify-between items-center text-xs text-gray-500">
       <div>
         <div>{notificacao.origem}</div>
         <div>{notificacao.operador}</div>
       </div>
       <ChevronRight className="h-4 w-4" />
     </div>
   </div>
 );
};