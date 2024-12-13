export interface Notificacao {
    id: number;
    paciente: string;
    descricao: string;
    dae?: string;
    origem: string;
    operador: string;
    status: 'pendente' | 'em_analise';
  }