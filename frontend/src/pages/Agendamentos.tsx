
import { useState } from "react";
import { Plus, Search, Calendar, Filter, ChevronDown, ChevronUp, Package, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CalendarioAgendamentos from "@/components/Calendario/CalendarioAgendamentos";
import EtapasServico from "@/components/Servicos/EtapasServico";
import { mockAgendamentos, mockPets, mockTutores, mockFuncionarios } from "@/data/mockData";
import { TipoServico, StatusAgendamento } from "@/types";

const Agendamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroServico, setFiltroServico] = useState<TipoServico | 'todos'>('todos');
  const [filtroStatus, setFiltroStatus] = useState<StatusAgendamento | 'todos'>('todos');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

  const isBanhoMedicamentoso = (servico: any) => {
    return servico.tipoServico === 'banho' && 
           (servico.observacoes?.toLowerCase().includes('medicamentoso') || 
            servico.observacoes?.toLowerCase().includes('shampoo'));
  };

  const agendamentosFiltrados = mockAgendamentos
    .filter(agendamento => {
      const pet = mockPets.find(p => p.id === agendamento.petId);
      const tutor = pet ? mockTutores.find(t => t.id === pet.tutorId) : null;
      
      const searchMatch = searchTerm === "" || 
        pet?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor?.nome.toLowerCase().includes(searchTerm.toLowerCase());
      
      const servicoMatch = filtroServico === 'todos' || 
        agendamento.servicos.some(s => s.tipoServico === filtroServico);
      const statusMatch = filtroStatus === 'todos' || agendamento.status === filtroStatus;
      
      return searchMatch && servicoMatch && statusMatch;
    })
    .map(agendamento => {
      const pet = mockPets.find(p => p.id === agendamento.petId);
      const tutor = pet ? mockTutores.find(t => t.id === pet.tutorId) : null;
      return { ...agendamento, pet, tutor };
    });

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Agendamentos</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Gerencie todos os agendamentos de serviços
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">
            <Calendar className="h-4 w-4 mr-2" />
            Calendário
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-6">
          {/* Filtros e Busca */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por pet ou tutor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filtroServico} onValueChange={(value) => setFiltroServico(value as TipoServico | 'todos')}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Serviço" />
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
            <Select value={filtroStatus} onValueChange={(value) => setFiltroStatus(value as StatusAgendamento | 'todos')}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>

          {/* Lista de Agendamentos */}
          <div className="space-y-4">
            {agendamentosFiltrados.map((agendamento) => (
              <Card key={agendamento.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{agendamento.pet?.fotoUrl}</span>
                        <div>
                          <h3 className="text-lg font-semibold">{agendamento.pet?.nome}</h3>
                          <p className="text-gray-600">{agendamento.tutor?.nome}</p>
                        </div>
                      </div>

                      {/* Múltiplos Serviços */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Serviços Agendados ({agendamento.servicos.length})
                        </h4>
                        <div className="grid gap-2">
                          {agendamento.servicos.map((servico) => {
                            const funcionario = servico.funcionarioId ? 
                              mockFuncionarios.find(f => f.id === servico.funcionarioId) : null;
                            const isMedicamentoso = isBanhoMedicamentoso(servico);
                            return (
                              <div key={servico.id} className={`p-2 rounded-lg ${isMedicamentoso ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50'}`}>
                                <div className="flex flex-wrap items-center gap-1 mb-1">
                                  <Badge className={getServiceColor(servico.tipoServico)}>
                                    {servico.tipoServico}
                                  </Badge>
                                  {isMedicamentoso && (
                                    <Badge className="bg-orange-100 text-orange-800">
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      Medicamentoso
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600">
                                  R$ {servico.valor} - {funcionario?.nome || 'Não atribuído'}
                                </p>
                                {servico.observacoes && (
                                  <p className="text-xs text-orange-600 mt-1 font-medium">
                                    {servico.observacoes}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Data</p>
                          <p className="font-medium">{new Date(agendamento.dataAgendamento).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Horário</p>
                          <p className="font-medium">{agendamento.horaInicio}{agendamento.horaFim ? ` - ${agendamento.horaFim}` : ''}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Valor Total</p>
                          <p className="font-medium text-green-600">R$ {agendamento.valorTotal}</p>
                        </div>
                      </div>

                      {/* Itens do Pet */}
                      {agendamento.pet?.itens && agendamento.pet.itens.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Package className="h-4 w-4 mr-1" />
                            Itens do Pet
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {agendamento.pet.itens.map((item) => (
                              <div key={item.id} className="bg-blue-50 p-2 rounded text-xs">
                                <span className="font-medium">{item.nome}</span>
                                {item.cor && <span className="text-gray-600"> - {item.cor}</span>}
                                {item.marca && <span className="text-gray-600"> ({item.marca})</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {agendamento.itensTrazidos.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-1">Itens trazidos:</p>
                          <div className="flex flex-wrap gap-1">
                            {agendamento.itensTrazidos.map((item, index) => (
                              <Badge 
                                key={index} 
                                variant={item.toLowerCase().includes('shampoo') ? "default" : "outline"} 
                                className={item.toLowerCase().includes('shampoo') ? "bg-orange-100 text-orange-800" : "text-xs"}
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {agendamento.observacoes && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Observações:</p>
                          <p className="text-sm">{agendamento.observacoes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(agendamento.status)}>
                        {agendamento.status}
                      </Badge>
                      <div className="flex flex-col md:flex-row gap-2">
                        <Button size="sm" variant="outline" className="w-full md:w-auto">
                          Editar
                        </Button>
                        <Button size="sm" className="w-full md:w-auto">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Etapas dos Serviços */}
                  {agendamento.servicos.some(s => s.etapas && s.etapas.length > 0) && (
                    <Collapsible 
                      open={expandedCard === agendamento.id} 
                      onOpenChange={() => toggleCardExpansion(agendamento.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full mt-4 flex items-center justify-between">
                          <span>Ver Etapas dos Serviços</span>
                          {expandedCard === agendamento.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4 space-y-4">
                        {agendamento.servicos.map((servico) => (
                          servico.etapas && servico.etapas.length > 0 && (
                            <div key={servico.id}>
                              <h5 className="font-medium mb-2 capitalize">{servico.tipoServico}</h5>
                              <EtapasServico 
                                etapas={servico.etapas} 
                                agendamentoId={agendamento.id} 
                              />
                            </div>
                          )
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {agendamentosFiltrados.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum agendamento encontrado</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendario">
          <CalendarioAgendamentos />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agendamentos;
