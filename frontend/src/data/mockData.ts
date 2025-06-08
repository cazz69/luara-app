import { Tutor, Pet, Agendamento, Hospedagem, Funcionario, TarefaFuncionario, EtapaServico, ItemPet, ServicoAgendamento } from '@/types';

export const mockEtapasServico: Record<string, EtapaServico[]> = {
  'banho': [
    {
      id: 'banho-1',
      nome: 'Pré-banho',
      ordem: 1,
      status: 'concluida',
      funcionarioId: '2',
      horaInicio: '14:00',
      horaFim: '14:15',
      observacoes: 'Escovação e remoção de nós'
    },
    {
      id: 'banho-2',
      nome: 'Banho',
      ordem: 2,
      status: 'concluida',
      funcionarioId: '2',
      horaInicio: '14:15',
      horaFim: '14:45',
      observacoes: 'Shampoo hipoalergênico'
    },
    {
      id: 'banho-3',
      nome: 'Secagem',
      ordem: 3,
      status: 'concluida',
      funcionarioId: '2',
      horaInicio: '14:45',
      horaFim: '15:15'
    },
    {
      id: 'banho-4',
      nome: 'Finalização',
      ordem: 4,
      status: 'concluida',
      funcionarioId: '2',
      horaInicio: '15:15',
      horaFim: '15:30',
      observacoes: 'Perfume e laço'
    }
  ],
  'tosa': [
    {
      id: 'tosa-1',
      nome: 'Pré-tosa',
      ordem: 1,
      status: 'pendente',
      funcionarioId: '2'
    },
    {
      id: 'tosa-2',
      nome: 'Banho',
      ordem: 2,
      status: 'pendente'
    },
    {
      id: 'tosa-3',
      nome: 'Secagem',
      ordem: 3,
      status: 'pendente'
    },
    {
      id: 'tosa-4',
      nome: 'Tosa',
      ordem: 4,
      status: 'pendente'
    },
    {
      id: 'tosa-5',
      nome: 'Finalização',
      ordem: 5,
      status: 'pendente'
    }
  ],
  'consulta': [
    {
      id: 'consulta-1',
      nome: 'Recepção',
      ordem: 1,
      status: 'pendente',
      funcionarioId: '3'
    },
    {
      id: 'consulta-2',
      nome: 'Exame Clínico',
      ordem: 2,
      status: 'pendente',
      funcionarioId: '1'
    },
    {
      id: 'consulta-3',
      nome: 'Diagnóstico',
      ordem: 3,
      status: 'pendente',
      funcionarioId: '1'
    },
    {
      id: 'consulta-4',
      nome: 'Orientações',
      ordem: 4,
      status: 'pendente',
      funcionarioId: '1'
    }
  ]
};

export const mockTutores: Tutor[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-1111',
    whatsapp: '5511999991111',
    endereco: 'Rua das Flores, 123'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@email.com',
    telefone: '(11) 99999-2222',
    whatsapp: '5511999992222',
    endereco: 'Av. Principal, 456'
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    email: 'pedro@email.com',
    telefone: '(11) 99999-3333',
    whatsapp: '5511999993333',
    endereco: 'Rua do Campo, 789'
  }
];

export const mockItensPets: ItemPet[] = [
  {
    id: 'item-1',
    nome: 'Coleira Principal',
    tipo: 'coleira',
    cor: 'Branca',
    marca: 'ZeeDog',
    tamanho: 'M',
    observacoes: 'Coleira do dia a dia'
  },
  {
    id: 'item-2',
    nome: 'Guia de Passeio',
    tipo: 'guia',
    cor: 'Preta',
    marca: 'ZeeDog',
    tamanho: '1.5m',
    observacoes: 'Guia retrátil'
  },
  {
    id: 'item-3',
    nome: 'Roupinha de Frio',
    tipo: 'roupinha',
    cor: 'Azul',
    marca: 'PetClub',
    tamanho: 'M',
    observacoes: 'Para dias frios'
  },
  {
    id: 'item-4',
    nome: 'Coleira Rosa',
    tipo: 'coleira',
    cor: 'Rosa',
    marca: 'Petite',
    tamanho: 'P'
  },
  {
    id: 'item-5',
    nome: 'Guia Azul',
    tipo: 'guia',
    cor: 'Azul',
    marca: 'Flexi',
    tamanho: '3m'
  }
];

export const mockPets: Pet[] = [
  {
    id: '1',
    nome: 'Rex',
    raca: 'Golden Retriever',
    idade: '3 anos',
    peso: '28kg',
    fotoUrl: '🐕',
    alergias: ['Frango', 'Pólen'],
    observacoes: 'Pet muito dócil, gosta de brincar com outros cães. Tem medo de fogos de artifício.',
    tutorId: '1',
    itens: [
      mockItensPets[0], // Coleira Branca ZeeDog
      mockItensPets[1]  // Guia Preta ZeeDog
    ]
  },
  {
    id: '2',
    nome: 'Luna',
    raca: 'Golden Retriever',
    idade: '1 ano',
    peso: '20kg',
    fotoUrl: '🐕',
    alergias: [],
    observacoes: 'Filhote muito energética, irmã do Rex.',
    tutorId: '1',
    itens: [
      mockItensPets[3], // Coleira Rosa
      mockItensPets[4], // Guia Azul
      mockItensPets[2]  // Roupinha de Frio
    ]
  },
  {
    id: '3',
    nome: 'Bella',
    raca: 'Poodle',
    idade: '5 anos',
    peso: '8kg',
    fotoUrl: '🐩',
    alergias: ['Frango'],
    observacoes: 'Gosta de carinho, um pouco tímida',
    tutorId: '2',
    itens: [
      {
        id: 'item-6',
        nome: 'Coleira de Strass',
        tipo: 'coleira',
        cor: 'Dourada',
        marca: 'Luxury Pet',
        tamanho: 'P',
        observacoes: 'Coleira especial para ocasiões'
      }
    ]
  },
  {
    id: '4',
    nome: 'Max',
    raca: 'Vira-lata',
    idade: '2 anos',
    peso: '15kg',
    fotoUrl: '🐶',
    alergias: [],
    observacoes: 'Muito brincalhão e sociável',
    tutorId: '3',
    itens: []
  }
];

export const mockFuncionarios: Funcionario[] = [
  {
    id: '1',
    nome: 'Dr. Carlos Veterinário',
    email: 'carlos@meupetpro.com',
    telefone: '(11) 98888-1111',
    cargo: 'veterinario',
    dataAdmissao: '2023-01-15',
    ativo: true,
    permissoes: ['consultas', 'cirurgias', 'medicacao']
  },
  {
    id: '2',
    nome: 'Ana Tosadora',
    email: 'ana@meupetpro.com',
    telefone: '(11) 98888-2222',
    cargo: 'tosador',
    dataAdmissao: '2023-03-01',
    ativo: true,
    permissoes: ['banho', 'tosa', 'estetica']
  },
  {
    id: '3',
    nome: 'Roberto Atendente',
    email: 'roberto@meupetpro.com',
    telefone: '(11) 98888-3333',
    cargo: 'atendente',
    dataAdmissao: '2023-02-10',
    ativo: true,
    permissoes: ['agendamentos', 'recepcao', 'vendas']
  },
  {
    id: '4',
    nome: 'Julia Cuidadora',
    email: 'julia@meupetpro.com',
    telefone: '(11) 98888-4444',
    cargo: 'cuidador',
    dataAdmissao: '2023-04-05',
    ativo: true,
    permissoes: ['hospedagem', 'passeios', 'alimentacao']
  },
  {
    id: '5',
    nome: 'Mariana Silva',
    email: 'mariana@freelancer.com',
    telefone: '(11) 99777-5555',
    cargo: 'freelancer',
    dataAdmissao: '2024-01-10',
    ativo: true,
    permissoes: ['banho', 'tosa', 'passeios']
  },
  {
    id: '6',
    nome: 'Pedro Santos',
    email: 'pedro@freelancer.com',
    telefone: '(11) 99777-6666',
    cargo: 'freelancer',
    dataAdmissao: '2024-02-01',
    ativo: true,
    permissoes: ['recreacao', 'passeios', 'cuidados']
  },
  {
    id: '7',
    nome: 'Carla Recreacionista',
    email: 'carla@meupetpro.com',
    telefone: '(11) 98888-7777',
    cargo: 'recreacionista',
    dataAdmissao: '2023-06-15',
    ativo: true,
    permissoes: ['creche', 'recreacao', 'atividades']
  },
  {
    id: '8',
    nome: 'Ricardo Plantonista',
    email: 'ricardo@meupetpro.com',
    telefone: '(11) 98888-8888',
    cargo: 'plantonista',
    dataAdmissao: '2023-05-20',
    ativo: true,
    permissoes: ['hotel', 'monitoramento', 'cuidados_noturnos']
  },
  {
    id: '9',
    nome: 'Fernanda Costa',
    email: 'fernanda@freelancer.com',
    telefone: '(11) 99777-9999',
    cargo: 'freelancer',
    dataAdmissao: '2024-01-25',
    ativo: true,
    permissoes: ['tosa', 'banho', 'estetica']
  }
];

export const mockAgendamentos: Agendamento[] = [
  {
    id: '1',
    petId: '1',
    servicos: [
      {
        id: 'serv-1',
        tipoServico: 'banho',
        valor: 60,
        funcionarioId: '2',
        etapas: mockEtapasServico['banho'],
        observacoes: 'Banho medicamentoso - cliente trouxe shampoo próprio'
      }
    ],
    dataAgendamento: '2024-02-05',
    horaInicio: '14:00',
    horaFim: '15:30',
    status: 'finalizado',
    itensTrazidos: ['coleira', 'guia', 'shampoo medicamentoso'],
    valorTotal: 60
  },
  {
    id: '2',
    petId: '3',
    servicos: [
      {
        id: 'serv-2',
        tipoServico: 'tosa',
        valor: 80,
        funcionarioId: '2',
        etapas: mockEtapasServico['tosa']
      }
    ],
    dataAgendamento: '2024-02-06',
    horaInicio: '10:00',
    status: 'confirmado',
    itensTrazidos: ['coleira', 'guia'],
    valorTotal: 80
  },
  {
    id: '3',
    petId: '4',
    servicos: [
      {
        id: 'serv-3',
        tipoServico: 'banho',
        valor: 50,
        funcionarioId: '2',
        etapas: mockEtapasServico['banho']
      },
      {
        id: 'serv-4',
        tipoServico: 'tosa',
        valor: 70,
        funcionarioId: '2',
        etapas: mockEtapasServico['tosa']
      },
      {
        id: 'serv-5',
        tipoServico: 'consulta',
        valor: 120,
        funcionarioId: '1',
        etapas: mockEtapasServico['consulta']
      }
    ],
    dataAgendamento: '2024-02-07',
    horaInicio: '09:30',
    status: 'confirmado',
    itensTrazidos: ['coleira', 'guia', 'roupinha'],
    valorTotal: 240
  }
];

export const mockHospedagem: Hospedagem[] = [
  {
    id: '1',
    petId: '1',
    dataCheckin: '2024-02-10',
    dataCheckout: '2024-02-15',
    horaCheckin: '08:00',
    status: 'confirmado',
    funcionarioResponsavelId: '4',
    itensTrazidos: ['caminha', 'cobertor do dono', 'brinquedos', 'ração especial'],
    observacoes: 'Precisa de medicação às 14h',
    valorTotal: 300
  },
  {
    id: '2',
    petId: '2',
    dataCheckin: '2024-02-12',
    dataCheckout: '2024-02-18',
    horaCheckin: '09:00',
    status: 'pendente',
    funcionarioResponsavelId: '4',
    itensTrazidos: ['caminha', 'petiscos', 'camiseta do tutor'],
    observacoes: 'Primeira hospedagem, pode ficar ansiosa',
    valorTotal: 350
  }
];

export const mockTarefasFuncionario: TarefaFuncionario[] = [
  {
    id: '1',
    funcionarioId: '1',
    agendamentoId: '3',
    titulo: 'Consulta - Max',
    descricao: 'Consulta de rotina e vacinação',
    dataTarefa: '2024-02-07',
    horaInicio: '09:30',
    horaFim: '10:30',
    status: 'pendente'
  },
  {
    id: '2',
    funcionarioId: '2',
    agendamentoId: '2',
    titulo: 'Tosa - Bella',
    descricao: 'Tosa higiênica + banho',
    dataTarefa: '2024-02-06',
    horaInicio: '10:00',
    horaFim: '12:00',
    status: 'em_andamento'
  },
  {
    id: '3',
    funcionarioId: '4',
    hospedagemId: '1',
    titulo: 'Check-in Rex',
    descricao: 'Receber Rex para hospedagem',
    dataTarefa: '2024-02-10',
    horaInicio: '08:00',
    status: 'pendente'
  }
];
