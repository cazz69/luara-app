
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockFuncionarios, mockTarefasFuncionario, mockAgendamentos, mockHospedagem } from "@/data/mockData";
import { CargoFuncionario } from "@/types";

const Equipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'ativo' | 'inativo'>('todos');
  const [filtroCargo, setFiltroCargo] = useState<CargoFuncionario | 'todos'>('todos');

  const funcionariosFiltrados = mockFuncionarios.filter(funcionario => {
    const searchMatch = searchTerm === "" || 
      funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = filtroStatus === 'todos' || 
      (filtroStatus === 'ativo' && funcionario.ativo) ||
      (filtroStatus === 'inativo' && !funcionario.ativo);
    
    const cargoMatch = filtroCargo === 'todos' || funcionario.cargo === filtroCargo;
    
    return searchMatch && statusMatch && cargoMatch;
  });

  const getCargoColor = (cargo: CargoFuncionario) => {
    const colors = {
      'administrador': 'bg-purple-100 text-purple-800',
      'veterinario': 'bg-green-100 text-green-800',
      'tosador': 'bg-blue-100 text-blue-800',
      'atendente': 'bg-yellow-100 text-yellow-800',
      'cuidador': 'bg-orange-100 text-orange-800',
      'freelancer': 'bg-pink-100 text-pink-800',
      'recreacionista': 'bg-cyan-100 text-cyan-800',
      'plantonista': 'bg-indigo-100 text-indigo-800'
    };
    return colors[cargo];
  };

  const getTarefasPorFuncionario = (funcionarioId: string) => {
    return mockTarefasFuncionario.filter(tarefa => tarefa.funcionarioId === funcionarioId);
  };

  const getAgendamentosPorFuncionario = (funcionarioId: string) => {
    return mockAgendamentos.filter(agendamento => 
      agendamento.servicos.some(servico => servico.funcionarioId === funcionarioId)
    );
  };

  const getHospedagensPorFuncionario = (funcionarioId: string) => {
    return mockHospedagem.filter(hospedagem => hospedagem.funcionarioResponsavelId === funcionarioId);
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Equipe</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Gerencie funcionários e suas informações
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Funcionário
        </Button>
      </div>

      {/* Estatísticas da Equipe */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockFuncionarios.length}</div>
            <p className="text-xs text-muted-foreground">Cadastrados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockFuncionarios.filter(f => f.ativo).length}
            </div>
            <p className="text-xs text-muted-foreground">Trabalhando</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Freelancers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">
              {mockFuncionarios.filter(f => f.cargo === 'freelancer').length}
            </div>
            <p className="text-xs text-muted-foreground">Cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cargos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(mockFuncionarios.map(f => f.cargo)).size}
            </div>
            <p className="text-xs text-muted-foreground">Diferentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar funcionário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filtroCargo} onValueChange={(value) => setFiltroCargo(value as CargoFuncionario | 'todos')}>
          <SelectTrigger>
            <SelectValue placeholder="Cargo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Cargos</SelectItem>
            <SelectItem value="administrador">Administrador</SelectItem>
            <SelectItem value="veterinario">Veterinário</SelectItem>
            <SelectItem value="tosador">Tosador</SelectItem>
            <SelectItem value="atendente">Atendente</SelectItem>
            <SelectItem value="cuidador">Cuidador</SelectItem>
            <SelectItem value="freelancer">Freelancer</SelectItem>
            <SelectItem value="recreacionista">Recreacionista</SelectItem>
            <SelectItem value="plantonista">Plantonista</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroStatus} onValueChange={(value) => setFiltroStatus(value as 'todos' | 'ativo' | 'inativo')}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => {
          setSearchTerm("");
          setFiltroCargo('todos');
          setFiltroStatus('todos');
        }}>
          Limpar Filtros
        </Button>
      </div>

      {/* Lista de Funcionários */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {funcionariosFiltrados.map((funcionario) => {
          const tarefas = getTarefasPorFuncionario(funcionario.id);
          const agendamentos = getAgendamentosPorFuncionario(funcionario.id);
          const hospedagens = getHospedagensPorFuncionario(funcionario.id);
          
          return (
            <Card key={funcionario.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={funcionario.foto} />
                    <AvatarFallback>
                      {funcionario.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{funcionario.nome}</h3>
                    <Badge className={getCargoColor(funcionario.cargo)}>
                      {funcionario.cargo}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> {funcionario.email}</p>
                  {funcionario.telefone && (
                    <p><strong>Telefone:</strong> {funcionario.telefone}</p>
                  )}
                  <p><strong>Admissão:</strong> {new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR')}</p>
                  
                  <div className="pt-2">
                    <p className="text-xs text-gray-500 mb-1">Atividades:</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="font-semibold">{tarefas.length}</p>
                        <p className="text-gray-500">Tarefas</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{agendamentos.length}</p>
                        <p className="text-gray-500">Agendamentos</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{hospedagens.length}</p>
                        <p className="text-gray-500">Hospedagens</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center">
                      <Badge variant={funcionario.ativo ? "default" : "secondary"}>
                        {funcionario.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm">
                          Ver Perfil
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {funcionariosFiltrados.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum funcionário encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Equipe;
