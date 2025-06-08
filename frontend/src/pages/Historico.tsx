
import { useState } from "react";
import { Search, Calendar, CheckCircle, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTarefasFuncionario, mockFuncionarios, mockAgendamentos, mockPets, mockTutores } from "@/data/mockData";

type ItemHistorico = {
  id: string;
  titulo: string;
  descricao: string;
  dataTarefa: string;
  horaInicio: string;
  horaFim?: string;
  status: string;
  tipo: 'tarefa' | 'agendamento';
} & (
  | {
      tipo: 'tarefa';
      funcionario?: any;
      funcionarioId: string;
      agendamentoId?: string;
      hospedagemId?: string;
    }
  | {
      tipo: 'agendamento';
      pet?: any;
      tutor?: any;
      servicos?: any[];
      valorTotal?: number;
    }
);

const Historico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroFuncionario, setFiltroFuncionario] = useState<string>('todos');
  const [filtroServico, setFiltroServico] = useState<string>('todos');

  // Combinar tarefas e agendamentos finalizados
  const tarefasFinalizadas = mockTarefasFuncionario
    .filter(tarefa => tarefa.status === 'concluida')
    .map(tarefa => ({
      ...tarefa,
      tipo: 'tarefa' as const,
      funcionario: mockFuncionarios.find(f => f.id === tarefa.funcionarioId)
    }));

  const agendamentosFinalizados = mockAgendamentos
    .filter(agendamento => agendamento.status === 'finalizado')
    .map(agendamento => {
      const pet = mockPets.find(p => p.id === agendamento.petId);
      const tutor = pet ? mockTutores.find(t => t.id === pet.tutorId) : null;
      return {
        id: agendamento.id,
        titulo: `${agendamento.servicos.map(s => s.tipoServico).join(', ')} - ${pet?.nome}`,
        descricao: `Serviços realizados para ${pet?.nome} (${tutor?.nome})`,
        dataTarefa: agendamento.dataAgendamento,
        horaInicio: agendamento.horaInicio,
        horaFim: agendamento.horaFim,
        status: 'concluida',
        tipo: 'agendamento' as const,
        pet,
        tutor,
        servicos: agendamento.servicos,
        valorTotal: agendamento.valorTotal
      };
    });

  const todosItens = [...tarefasFinalizadas, ...agendamentosFinalizados]
    .filter(item => {
      const searchMatch = searchTerm === "" || 
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tipo === 'tarefa' && item.funcionario?.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.tipo === 'agendamento' && item.pet?.nome.toLowerCase().includes(searchTerm.toLowerCase()));

      const funcionarioMatch = filtroFuncionario === 'todos' || 
        (item.tipo === 'tarefa' && item.funcionario?.id === filtroFuncionario);

      const servicoMatch = filtroServico === 'todos' ||
        (item.tipo === 'agendamento' && item.servicos?.some(s => s.tipoServico === filtroServico)) ||
        (item.tipo === 'tarefa' && item.titulo.toLowerCase().includes(filtroServico.toLowerCase()));

      return searchMatch && funcionarioMatch && servicoMatch;
    })
    .sort((a, b) => new Date(b.dataTarefa).getTime() - new Date(a.dataTarefa).getTime());

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Histórico de Serviços</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Todas as tarefas e serviços finalizados
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Finalizado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{todosItens.length}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{tarefasFinalizadas.length}</div>
            <p className="text-xs text-muted-foreground">Concluídas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{agendamentosFinalizados.length}</div>
            <p className="text-xs text-muted-foreground">Realizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {agendamentosFinalizados.reduce((total, item) => total + (item.valorTotal || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Serviços realizados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por pet, funcionário ou serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filtroFuncionario} onValueChange={setFiltroFuncionario}>
          <SelectTrigger>
            <SelectValue placeholder="Funcionário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Funcionários</SelectItem>
            {mockFuncionarios.map(funcionario => (
              <SelectItem key={funcionario.id} value={funcionario.id}>
                {funcionario.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filtroServico} onValueChange={setFiltroServico}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Serviços</SelectItem>
            <SelectItem value="banho">Banho</SelectItem>
            <SelectItem value="tosa">Tosa</SelectItem>
            <SelectItem value="consulta">Consulta</SelectItem>
            <SelectItem value="hospedagem">Hospedagem</SelectItem>
            <SelectItem value="veterinario">Veterinário</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => {
          setSearchTerm("");
          setFiltroFuncionario('todos');
          setFiltroServico('todos');
        }}>
          Limpar Filtros
        </Button>
      </div>

      {/* Lista de itens */}
      <div className="space-y-4">
        {todosItens.map((item) => (
          <Card key={`${item.tipo}-${item.id}`}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {item.tipo === 'agendamento' && item.pet?.fotoUrl && (
                      <span className="text-2xl">{item.pet.fotoUrl}</span>
                    )}
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">{item.titulo}</h3>
                      <p className="text-gray-600 text-sm">{item.descricao}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Data</p>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(item.dataTarefa).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horário</p>
                      <p className="font-medium">
                        {item.horaInicio}{item.horaFim ? ` - ${item.horaFim}` : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Responsável</p>
                      <p className="font-medium flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.tipo === 'tarefa' ? item.funcionario?.nome || 'Não informado' : 'Equipe'}
                      </p>
                    </div>
                  </div>

                  {item.tipo === 'agendamento' && item.valorTotal && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Valor Total</p>
                      <p className="font-medium text-green-600">R$ {item.valorTotal}</p>
                    </div>
                  )}

                  {item.tipo === 'agendamento' && item.servicos && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 mb-2">Serviços realizados:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.servicos.map((servico) => (
                          <Badge key={servico.id} variant="outline">
                            {servico.tipoServico} - R$ {servico.valor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Finalizado
                  </Badge>
                  <Badge variant="outline">
                    {item.tipo === 'agendamento' ? 'Agendamento' : 'Tarefa'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {todosItens.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum item finalizado encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Historico;
