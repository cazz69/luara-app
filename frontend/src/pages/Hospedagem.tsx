
import { useState } from "react";
import { Plus, Hotel, Calendar, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockHospedagem, mockPets, mockTutores, mockFuncionarios } from "@/data/mockData";
import { StatusAgendamento } from "@/types";

const Hospedagem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroData, setFiltroData] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<StatusAgendamento | 'todos'>('todos');

  const getStatusColor = (status: StatusAgendamento) => {
    const colors = {
      'confirmado': 'bg-green-100 text-green-800',
      'pendente': 'bg-yellow-100 text-yellow-800',
      'cancelado': 'bg-red-100 text-red-800',
      'finalizado': 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const hospedagemFiltrada = mockHospedagem
    .filter(item => {
      const pet = mockPets.find(p => p.id === item.petId);
      const tutor = pet ? mockTutores.find(t => t.id === pet.tutorId) : null;
      
      const searchMatch = searchTerm === "" || 
        pet?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor?.nome.toLowerCase().includes(searchTerm.toLowerCase());

      const today = new Date().toISOString().split('T')[0];
      let dataMatch = true;
      
      if (filtroData === 'hoje') {
        dataMatch = item.dataCheckin === today || item.dataCheckout === today;
      } else if (filtroData === 'semana') {
        const weekFromNow = new Date();
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        dataMatch = new Date(item.dataCheckin) <= weekFromNow && new Date(item.dataCheckout) >= new Date();
      }

      const statusMatch = filtroStatus === 'todos' || item.status === filtroStatus;
      
      return searchMatch && dataMatch && statusMatch;
    })
    .map(item => {
      const pet = mockPets.find(p => p.id === item.petId);
      const tutor = pet ? mockTutores.find(t => t.id === pet.tutorId) : null;
      const funcionario = item.funcionarioResponsavelId ? 
        mockFuncionarios.find(f => f.id === item.funcionarioResponsavelId) : null;
      return { ...item, pet, tutor, funcionario };
    });

  const limparFiltros = () => {
    setSearchTerm("");
    setFiltroData('todos');
    setFiltroStatus('todos');
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Hospedagem</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Controle de hospedagem e hotel para pets
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Reserva
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pets Hospedados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHospedagem.filter(h => h.status === 'confirmado').length}</div>
            <p className="text-xs text-muted-foreground">Capacidade: 15</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Check-ins Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockHospedagem.filter(h => h.dataCheckin === new Date().toISOString().split('T')[0]).length}
            </div>
            <p className="text-xs text-muted-foreground">Programados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Check-outs Amanhã</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockHospedagem.filter(h => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return h.dataCheckout === tomorrow.toISOString().split('T')[0];
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">Programados</p>
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
            <Select value={filtroData} onValueChange={setFiltroData}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as datas</SelectItem>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="semana">Esta semana</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={(value) => setFiltroStatus(value as StatusAgendamento | 'todos')}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="confirmado">Hospedado</SelectItem>
                <SelectItem value="pendente">Reservado</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={limparFiltros} className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Hospedagem */}
      <div className="space-y-4">
        {hospedagemFiltrada.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">{item.pet?.fotoUrl}</span>
                  <div>
                    <p className="text-lg font-semibold">{item.pet?.nome}</p>
                    <p className="text-sm text-gray-600">{item.tutor?.nome}</p>
                  </div>
                </CardTitle>
                <Badge className={getStatusColor(item.status)}>
                  {item.status === 'confirmado' ? 'Hospedado' : 
                   item.status === 'pendente' ? 'Reservado' : item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p className="font-medium flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(item.dataCheckin).toLocaleDateString('pt-BR')}
                    {item.horaCheckin && <span className="ml-1">{item.horaCheckin}</span>}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p className="font-medium flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(item.dataCheckout).toLocaleDateString('pt-BR')}
                    {item.horaCheckout && <span className="ml-1">{item.horaCheckout}</span>}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Responsável</p>
                  <p className="font-medium text-sm">{item.funcionario?.nome || 'Não atribuído'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="font-medium text-green-600 text-sm">R$ {item.valorTotal}</p>
                </div>
              </div>

              {item.itensTrazidos.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Itens trazidos:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.itensTrazidos.map((item_trazido, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item_trazido}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {item.observacoes && (
                <div>
                  <p className="text-sm text-muted-foreground">Observações:</p>
                  <p className="text-sm">{item.observacoes}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                  Ver Detalhes
                </Button>
                <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                  Alimentação
                </Button>
                <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                  Medicação
                </Button>
                {item.status === 'pendente' && (
                  <Button size="sm" className="w-full md:w-auto">
                    Fazer Check-in
                  </Button>
                )}
                {item.status === 'confirmado' && (
                  <Button size="sm" className="w-full md:w-auto">
                    Fazer Check-out
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hospedagemFiltrada.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Hotel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma hospedagem encontrada</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Hospedagem;
