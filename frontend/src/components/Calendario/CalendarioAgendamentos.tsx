
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Filter, Package } from "lucide-react";
import { mockAgendamentos, mockPets, mockTutores } from "@/data/mockData";
import { TipoServico, StatusAgendamento } from "@/types";

const CalendarioAgendamentos = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filtroServico, setFiltroServico] = useState<TipoServico | 'todos'>('todos');
  const [filtroStatus, setFiltroStatus] = useState<StatusAgendamento | 'todos'>('todos');

  const getServiceColor = (servico: TipoServico) => {
    const colors = {
      'banho': 'bg-blue-100 text-blue-800',
      'tosa': 'bg-purple-100 text-purple-800',
      'consulta': 'bg-green-100 text-green-800',
      'hospedagem': 'bg-orange-100 text-orange-800',
      'creche': 'bg-yellow-100 text-yellow-800',
      'veterinario': 'bg-red-100 text-red-800'
    };
    return colors[servico];
  };

  const getStatusColor = (status: StatusAgendamento) => {
    const colors = {
      'confirmado': 'bg-green-100 text-green-800',
      'pendente': 'bg-yellow-100 text-yellow-800',
      'cancelado': 'bg-red-100 text-red-800',
      'finalizado': 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const agendamentosFiltrados = mockAgendamentos.filter(agendamento => {
    const servicoMatch = filtroServico === 'todos' || 
      agendamento.servicos.some(s => s.tipoServico === filtroServico);
    const statusMatch = filtroStatus === 'todos' || agendamento.status === filtroStatus;
    return servicoMatch && statusMatch;
  });

  const agendamentosComDetalhes = agendamentosFiltrados.map(agendamento => {
    const pet = mockPets.find(p => p.id === agendamento.petId);
    const tutor = pet ? mockTutores.find(t => t.id === pet.tutorId) : null;
    return { ...agendamento, pet, tutor };
  });

  const agendamentosData = selectedDate 
    ? agendamentosComDetalhes.filter(ag => 
        ag.dataAgendamento === selectedDate.toISOString().split('T')[0]
      )
    : agendamentosComDetalhes;

  const diasComAgendamentos = new Set(
    agendamentosComDetalhes.map(ag => new Date(ag.dataAgendamento).toDateString())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendário de Agendamentos</h2>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os agendamentos
          </p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de Serviço</label>
              <Select value={filtroServico} onValueChange={(value) => setFiltroServico(value as TipoServico | 'todos')}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Serviços</SelectItem>
                  <SelectItem value="banho">Banho</SelectItem>
                  <SelectItem value="tosa">Tosa</SelectItem>
                  <SelectItem value="consulta">Consulta</SelectItem>
                  <SelectItem value="hospedagem">Hospedagem</SelectItem>
                  <SelectItem value="creche">Creche</SelectItem>
                  <SelectItem value="veterinario">Veterinário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filtroStatus} onValueChange={(value) => setFiltroStatus(value as StatusAgendamento | 'todos')}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasAppointment: (date) => diasComAgendamentos.has(date.toDateString())
              }}
              modifiersStyles={{
                hasAppointment: { 
                  backgroundColor: '#e3f2fd',
                  color: '#1565c0',
                  fontWeight: 'bold'
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Lista de Agendamentos */}
        <Card>
          <CardHeader>
            <CardTitle>
              Agendamentos {selectedDate ? `para ${selectedDate.toLocaleDateString('pt-BR')}` : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {agendamentosData.map((agendamento) => (
                <div key={agendamento.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{agendamento.pet?.nome}</h4>
                      <p className="text-sm text-gray-600">{agendamento.tutor?.nome}</p>
                    </div>
                    <Badge className={getStatusColor(agendamento.status)}>
                      {agendamento.status}
                    </Badge>
                  </div>
                  
                  {/* Múltiplos Serviços */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Serviços:</p>
                    <div className="flex flex-wrap gap-1">
                      {agendamento.servicos.map((servico) => (
                        <Badge key={servico.id} className={getServiceColor(servico.tipoServico)}>
                          {servico.tipoServico}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Horário: {agendamento.horaInicio}{agendamento.horaFim ? ` - ${agendamento.horaFim}` : ''}</p>
                    
                    {/* Itens do Pet */}
                    {agendamento.pet?.itens && agendamento.pet.itens.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 flex items-center mb-1">
                          <Package className="h-3 w-3 mr-1" />
                          Itens do pet:
                        </p>
                        <div className="text-xs">
                          {agendamento.pet.itens.map((item, index) => (
                            <span key={item.id}>
                              {item.nome} {item.cor && `${item.cor}`} {item.marca && `(${item.marca})`}
                              {index < agendamento.pet!.itens!.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {agendamento.itensTrazidos.length > 0 && (
                      <p className="mt-1">Itens trazidos: {agendamento.itensTrazidos.join(', ')}</p>
                    )}
                    <p className="font-semibold text-green-600 mt-1">Valor Total: R$ {agendamento.valorTotal}</p>
                  </div>
                </div>
              ))}
              {agendamentosData.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Nenhum agendamento encontrado
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarioAgendamentos;
