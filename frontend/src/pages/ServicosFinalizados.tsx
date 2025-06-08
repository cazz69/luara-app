
import { useState } from "react";
import { Search, Calendar, CheckCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAgendamentos, mockPets, mockTutores, mockFuncionarios } from "@/data/mockData";

const ServicosFinalizados = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroSetor, setFiltroSetor] = useState<string>('todos');
  const [filtroData, setFiltroData] = useState<string>('todos');
  const [filtroFuncionario, setFiltroFuncionario] = useState<string>('todos');

  const servicosFinalizados = mockAgendamentos
    .filter(agendamento => agendamento.status === 'finalizado')
    .map(agendamento => {
      const pet = mockPets.find(p => p.id === agendamento.petId);
      const tutor = pet ? mockTutores.find(t => t.id === pet.tutorId) : null;
      return {
        ...agendamento,
        pet,
        tutor,
        servicos: agendamento.servicos.map(servico => ({
          ...servico,
          funcionario: servico.funcionarioId ? 
            mockFuncionarios.find(f => f.id === servico.funcionarioId) : null
        }))
      };
    });

  const getSetorByServico = (tipoServico: string) => {
    switch (tipoServico) {
      case 'banho':
      case 'tosa':
        return 'banho_tosa';
      case 'consulta':
      case 'veterinario':
        return 'veterinario';
      case 'hospedagem':
        return 'hotel';
      case 'creche':
        return 'creche';
      default:
        return 'outros';
    }
  };

  const servicosFiltrados = servicosFinalizados.filter(agendamento => {
    const searchMatch = searchTerm === "" || 
      agendamento.pet?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agendamento.tutor?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agendamento.servicos.some(s => s.tipoServico.toLowerCase().includes(searchTerm.toLowerCase())) ||
      agendamento.servicos.some(s => s.funcionario?.nome.toLowerCase().includes(searchTerm.toLowerCase()));

    const setorMatch = filtroSetor === 'todos' || 
      agendamento.servicos.some(s => getSetorByServico(s.tipoServico) === filtroSetor);

    const funcionarioMatch = filtroFuncionario === 'todos' ||
      agendamento.servicos.some(s => s.funcionarioId === filtroFuncionario);

    const today = new Date().toISOString().split('T')[0];
    let dataMatch = true;
    
    if (filtroData === 'hoje') {
      dataMatch = agendamento.dataAgendamento === today;
    } else if (filtroData === 'semana') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dataMatch = new Date(agendamento.dataAgendamento) >= weekAgo;
    } else if (filtroData === 'mes') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dataMatch = new Date(agendamento.dataAgendamento) >= monthAgo;
    }

    return searchMatch && setorMatch && dataMatch && funcionarioMatch;
  });

  const getSetorColor = (setor: string) => {
    switch (setor) {
      case 'banho_tosa':
        return 'bg-blue-100 text-blue-800';
      case 'veterinario':
        return 'bg-green-100 text-green-800';
      case 'hotel':
        return 'bg-orange-100 text-orange-800';
      case 'creche':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSetorName = (setor: string) => {
    switch (setor) {
      case 'banho_tosa':
        return 'Banho e Tosa';
      case 'veterinario':
        return 'Veterinário';
      case 'hotel':
        return 'Hotel';
      case 'creche':
        return 'Creche';
      default:
        return 'Outros';
    }
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Serviços Finalizados</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Histórico de todos os serviços realizados por setor
        </p>
      </div>

      {/* Estatísticas por Setor */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Banho e Tosa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-blue-600">
              {servicosFinalizados.filter(s => s.servicos.some(srv => ['banho', 'tosa'].includes(srv.tipoServico))).length}
            </div>
            <p className="text-xs text-muted-foreground">Serviços</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Veterinário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-green-600">
              {servicosFinalizados.filter(s => s.servicos.some(srv => ['consulta', 'veterinario'].includes(srv.tipoServico))).length}
            </div>
            <p className="text-xs text-muted-foreground">Consultas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hotel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-orange-600">
              {servicosFinalizados.filter(s => s.servicos.some(srv => srv.tipoServico === 'hospedagem')).length}
            </div>
            <p className="text-xs text-muted-foreground">Hospedagens</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Creche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-yellow-600">
              {servicosFinalizados.filter(s => s.servicos.some(srv => srv.tipoServico === 'creche')).length}
            </div>
            <p className="text-xs text-muted-foreground">Atendimentos</p>
          </CardContent>
        </Card>
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
          <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por pet, tutor, funcionário ou serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filtroSetor} onValueChange={setFiltroSetor}>
              <SelectTrigger>
                <SelectValue placeholder="Setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Setores</SelectItem>
                <SelectItem value="banho_tosa">Banho e Tosa</SelectItem>
                <SelectItem value="veterinario">Veterinário</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="creche">Creche</SelectItem>
              </SelectContent>
            </Select>
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
            <Select value={filtroData} onValueChange={setFiltroData}>
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Períodos</SelectItem>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="semana">Última Semana</SelectItem>
                <SelectItem value="mes">Último Mês</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setFiltroSetor('todos');
              setFiltroData('todos');
              setFiltroFuncionario('todos');
            }}>
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Serviços */}
      <div className="space-y-4">
        {servicosFiltrados.map((agendamento) => (
          <Card key={agendamento.id}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{agendamento.pet?.fotoUrl}</span>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">{agendamento.pet?.nome}</h3>
                      <p className="text-gray-600 text-sm">{agendamento.tutor?.nome}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Data do Serviço</p>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(agendamento.dataAgendamento).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horário</p>
                      <p className="font-medium">
                        {agendamento.horaInicio}{agendamento.horaFim ? ` - ${agendamento.horaFim}` : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Valor Total</p>
                      <p className="font-medium text-green-600">R$ {agendamento.valorTotal}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Serviços Realizados:</h4>
                    <div className="grid gap-3">
                      {agendamento.servicos.map((servico) => {
                        const setor = getSetorByServico(servico.tipoServico);
                        return (
                          <div key={servico.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getSetorColor(setor)}>
                                {getSetorName(setor)}
                              </Badge>
                              <span className="font-medium capitalize">{servico.tipoServico}</span>
                              <span className="text-sm text-gray-600">- {servico.funcionario?.nome || 'Não atribuído'}</span>
                            </div>
                            <span className="font-medium text-green-600">R$ {servico.valor}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {agendamento.observacoes && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Observações:</p>
                      <p className="text-sm">{agendamento.observacoes}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Finalizado
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline">
                      Relatório
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {servicosFiltrados.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum serviço finalizado encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicosFinalizados;
