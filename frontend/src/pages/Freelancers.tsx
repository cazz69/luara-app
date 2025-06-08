
import { useState } from "react";
import { Search, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockFuncionarios, mockTarefasFuncionario, mockAgendamentos } from "@/data/mockData";

const Freelancers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState<'todos' | 'disponivel' | 'ocupado'>('todos');

  const freelancers = mockFuncionarios.filter(funcionario => funcionario.cargo === 'freelancer');

  const freelancersFiltrados = freelancers.filter(freelancer => {
    const searchMatch = searchTerm === "" || 
      freelancer.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return searchMatch;
  });

  const getTarefasHoje = (funcionarioId: string) => {
    const hoje = new Date().toISOString().split('T')[0];
    return mockTarefasFuncionario.filter(tarefa => 
      tarefa.funcionarioId === funcionarioId && 
      tarefa.dataTarefa === hoje
    );
  };

  const getAgendamentosHoje = (funcionarioId: string) => {
    const hoje = new Date().toISOString().split('T')[0];
    return mockAgendamentos.filter(agendamento => 
      agendamento.servicos.some(servico => servico.funcionarioId === funcionarioId) &&
      agendamento.dataAgendamento === hoje
    );
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Freelancers</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Gerencie freelancers e suas agendas
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Freelancer
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Freelancers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{freelancers.length}</div>
            <p className="text-xs text-muted-foreground">Cadastrados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {freelancers.filter(f => f.ativo).length}
            </div>
            <p className="text-xs text-muted-foreground">Para trabalho</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trabalhando Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {freelancers.filter(f => 
                getTarefasHoje(f.id).length > 0 || getAgendamentosHoje(f.id).length > 0
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">Com agenda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Serviços Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {freelancers.reduce((total, f) => 
                total + getTarefasHoje(f.id).length + getAgendamentosHoje(f.id).length, 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">Agendados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar freelancer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filtroDisponibilidade} onValueChange={(value) => setFiltroDisponibilidade(value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Disponibilidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="disponivel">Disponível</SelectItem>
            <SelectItem value="ocupado">Ocupado</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => {
          setSearchTerm("");
          setFiltroDisponibilidade('todos');
        }}>
          Limpar Filtros
        </Button>
      </div>

      {/* Lista de Freelancers */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {freelancersFiltrados.map((freelancer) => {
          const tarefasHoje = getTarefasHoje(freelancer.id);
          const agendamentosHoje = getAgendamentosHoje(freelancer.id);
          const totalServicosHoje = tarefasHoje.length + agendamentosHoje.length;
          
          return (
            <Card key={freelancer.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={freelancer.foto} />
                    <AvatarFallback>
                      {freelancer.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{freelancer.nome}</h3>
                    <Badge className="bg-pink-100 text-pink-800">
                      Freelancer
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Contato:</p>
                    <p className="font-medium">{freelancer.email}</p>
                    {freelancer.telefone && (
                      <p className="font-medium">{freelancer.telefone}</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-gray-500">Agenda de Hoje:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <p className="font-semibold">{tarefasHoje.length}</p>
                        <p className="text-gray-500">Tarefas</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <p className="font-semibold">{agendamentosHoje.length}</p>
                        <p className="text-gray-500">Serviços</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant={totalServicosHoje > 0 ? "default" : "secondary"}>
                        {totalServicosHoje > 0 ? "Ocupado" : "Disponível"}
                      </Badge>
                      <Badge variant="outline">
                        {freelancer.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        WhatsApp
                      </Button>
                      <Button size="sm" className="flex-1">
                        Ver Agenda
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {freelancersFiltrados.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum freelancer encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Freelancers;
