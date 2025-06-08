
export interface Tutor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  whatsapp: string;
  endereco: string;
  foto?: string;
}

export interface ItemPet {
  id: string;
  nome: string;
  tipo: 'coleira' | 'guia' | 'brinquedo' | 'cama' | 'comedouro' | 'bebedouro' | 'roupinha' | 'remedio' | 'documento' | 'outro';
  cor?: string;
  marca?: string;
  tamanho?: string;
  observacoes?: string;
}

export interface Pet {
  id: string;
  nome: string;
  raca: string;
  idade: string;
  peso: string;
  fotoUrl?: string;
  alergias: string[];
  observacoes: string;
  tutorId: string;
  tutor?: Tutor;
  itens?: ItemPet[];
}

export type TipoServico = 'banho' | 'tosa' | 'consulta' | 'hospedagem' | 'creche' | 'veterinario';
export type StatusAgendamento = 'confirmado' | 'pendente' | 'cancelado' | 'finalizado';

export interface EtapaServico {
  id: string;
  nome: string;
  ordem: number;
  status: 'pendente' | 'em_andamento' | 'concluida';
  funcionarioId?: string;
  funcionario?: Funcionario;
  horaInicio?: string;
  horaFim?: string;
  observacoes?: string;
}

export interface ServicoAgendamento {
  id: string;
  tipoServico: TipoServico;
  valor: number;
  funcionarioId?: string;
  funcionario?: Funcionario;
  etapas?: EtapaServico[];
  observacoes?: string;
}

export interface Agendamento {
  id: string;
  petId: string;
  pet?: Pet;
  servicos: ServicoAgendamento[];
  dataAgendamento: string;
  horaInicio: string;
  horaFim?: string;
  status: StatusAgendamento;
  observacoes?: string;
  itensTrazidos: string[];
  valorTotal: number;
}

export interface Hospedagem {
  id: string;
  petId: string;
  pet?: Pet;
  dataCheckin: string;
  dataCheckout: string;
  horaCheckin?: string;
  horaCheckout?: string;
  status: StatusAgendamento;
  itensTrazidos: string[];
  observacoes?: string;
  funcionarioResponsavelId?: string;
  funcionarioResponsavel?: Funcionario;
  valorTotal?: number;
}

export type CargoFuncionario = 'administrador' | 'veterinario' | 'tosador' | 'atendente' | 'cuidador' | 'freelancer' | 'recreacionista' | 'plantonista';

export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cargo: CargoFuncionario;
  salario?: number;
  dataAdmissao: string;
  ativo: boolean;
  permissoes: string[];
  foto?: string;
}

export interface TarefaFuncionario {
  id: string;
  funcionarioId: string;
  funcionario?: Funcionario;
  agendamentoId?: string;
  hospedagemId?: string;
  titulo: string;
  descricao?: string;
  dataTarefa: string;
  horaInicio?: string;
  horaFim?: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
}
