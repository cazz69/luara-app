
import { useState } from "react";
import { MessageSquare, Send, Star, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Sugestao {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'funcionalidade' | 'melhoria' | 'bug' | 'interface';
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'pendente' | 'em_analise' | 'aprovada' | 'implementada' | 'rejeitada';
  autor: string;
  data: string;
  votos: number;
}

const mockSugestoes: Sugestao[] = [
  {
    id: '1',
    titulo: 'Notificações por SMS',
    descricao: 'Adicionar opção de enviar notificações de agendamento por SMS além do WhatsApp',
    categoria: 'funcionalidade',
    prioridade: 'media',
    status: 'em_analise',
    autor: 'João Silva',
    data: '2024-02-01',
    votos: 12
  },
  {
    id: '2',
    titulo: 'Melhorar design da agenda',
    descricao: 'Tornar a visualização da agenda mais intuitiva com cores por tipo de serviço',
    categoria: 'interface',
    prioridade: 'baixa',
    status: 'aprovada',
    autor: 'Maria Santos',
    data: '2024-01-28',
    votos: 8
  }
];

const Sugestoes = () => {
  const [novaSugestao, setNovaSugestao] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    prioridade: ''
  });
  
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'funcionalidade':
        return 'bg-blue-100 text-blue-800';
      case 'melhoria':
        return 'bg-green-100 text-green-800';
      case 'bug':
        return 'bg-red-100 text-red-800';
      case 'interface':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baixa':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-gray-100 text-gray-600';
      case 'em_analise':
        return 'bg-blue-100 text-blue-800';
      case 'aprovada':
        return 'bg-green-100 text-green-800';
      case 'implementada':
        return 'bg-emerald-100 text-emerald-800';
      case 'rejeitada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'em_analise':
        return 'Em Análise';
      case 'aprovada':
        return 'Aprovada';
      case 'implementada':
        return 'Implementada';
      case 'rejeitada':
        return 'Rejeitada';
      default:
        return status;
    }
  };

  const sugestoesFiltradas = mockSugestoes.filter(sugestao => {
    const categoriaMatch = filtroCategoria === 'todas' || sugestao.categoria === filtroCategoria;
    const statusMatch = filtroStatus === 'todos' || sugestao.status === filtroStatus;
    return categoriaMatch && statusMatch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova sugestão:', novaSugestao);
    setNovaSugestao({ titulo: '', descricao: '', categoria: '', prioridade: '' });
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Sugestões</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Compartilhe suas ideias para melhorar o sistema
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-muted-foreground">
            {mockSugestoes.length} sugestões enviadas
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nova Sugestão</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Título</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={novaSugestao.titulo}
                    onChange={(e) => setNovaSugestao({...novaSugestao, titulo: e.target.value})}
                    placeholder="Digite o título da sugestão"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea
                    className="mt-1"
                    value={novaSugestao.descricao}
                    onChange={(e) => setNovaSugestao({...novaSugestao, descricao: e.target.value})}
                    placeholder="Descreva sua sugestão em detalhes..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Categoria</label>
                  <Select value={novaSugestao.categoria} onValueChange={(value) => setNovaSugestao({...novaSugestao, categoria: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="funcionalidade">Nova Funcionalidade</SelectItem>
                      <SelectItem value="melhoria">Melhoria</SelectItem>
                      <SelectItem value="bug">Correção de Bug</SelectItem>
                      <SelectItem value="interface">Interface</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Prioridade</label>
                  <Select value={novaSugestao.prioridade} onValueChange={(value) => setNovaSugestao({...novaSugestao, prioridade: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Sugestão
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sugestões da Comunidade</CardTitle>
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as categorias</SelectItem>
                    <SelectItem value="funcionalidade">Funcionalidade</SelectItem>
                    <SelectItem value="melhoria">Melhoria</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="interface">Interface</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em_analise">Em Análise</SelectItem>
                    <SelectItem value="aprovada">Aprovada</SelectItem>
                    <SelectItem value="implementada">Implementada</SelectItem>
                    <SelectItem value="rejeitada">Rejeitada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sugestoesFiltradas.map((sugestao) => (
                  <div key={sugestao.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-base md:text-lg mb-2">{sugestao.titulo}</h3>
                        <p className="text-gray-600 text-sm mb-3">{sugestao.descricao}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={getCategoriaColor(sugestao.categoria)}>
                            {sugestao.categoria}
                          </Badge>
                          <Badge className={getPrioridadeColor(sugestao.prioridade)}>
                            {sugestao.prioridade}
                          </Badge>
                          <Badge className={getStatusColor(sugestao.status)}>
                            {getStatusText(sugestao.status)}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {sugestao.autor}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {sugestao.data}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            {sugestao.votos} votos
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <Button variant="outline" size="sm" className="w-full md:w-auto">
                          <Star className="h-4 w-4 mr-1" />
                          Votar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sugestoes;
