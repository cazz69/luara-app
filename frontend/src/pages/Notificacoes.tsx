
import { Bell, Calendar, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockNotificacoes = [
  {
    id: 1,
    tipo: "vacina",
    titulo: "Vacina Vencida - Bella",
    descricao: "A vacina antirrábica da Bella está vencida desde 20/01/2024",
    data: "2024-01-15",
    urgencia: "alta",
    cliente: "Maria Santos"
  },
  {
    id: 2,
    tipo: "agendamento",
    titulo: "Lembrete de Agendamento",
    descricao: "Rex tem banho agendado para amanhã às 09:00",
    data: "2024-01-16",
    urgencia: "media",
    cliente: "João Silva"
  },
  {
    id: 3,
    tipo: "retorno",
    titulo: "Retorno de Consulta",
    descricao: "Max precisa retornar em 7 dias para reavaliação",
    data: "2024-01-22",
    urgencia: "baixa",
    cliente: "Pedro Costa"
  }
];

const Notificacoes = () => {
  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "media":
        return "bg-yellow-100 text-yellow-800";
      case "baixa":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "vacina":
        return Heart;
      case "agendamento":
        return Calendar;
      default:
        return Bell;
    }
  };

  return (
    <div className="space-y-4 p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Notificações</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Lembretes automáticos e alertas importantes
          </p>
        </div>
        <Button variant="outline" size="sm" className="w-full md:w-auto">
          <Bell className="h-4 w-4 mr-2" />
          Marcar Todas como Lidas
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Precisam de atenção</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">5</div>
            <p className="text-xs text-muted-foreground">Lembretes enviados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vacinas Atrasadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">Precisam vacinar</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockNotificacoes.map((notificacao) => {
          const IconComponent = getTipoIcon(notificacao.tipo);
          
          return (
            <Card key={notificacao.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <IconComponent className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    {notificacao.titulo}
                  </CardTitle>
                  <Badge className={getUrgenciaColor(notificacao.urgencia)}>
                    {notificacao.urgencia}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  {notificacao.descricao}
                </p>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div className="text-sm text-muted-foreground">
                    {notificacao.cliente} • {notificacao.data}
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button size="sm" variant="outline" className="w-full md:w-auto text-xs">
                      WhatsApp
                    </Button>
                    <Button size="sm" variant="outline" className="w-full md:w-auto text-xs">
                      Email
                    </Button>
                    <Button size="sm" className="w-full md:w-auto text-xs">
                      Resolvido
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Notificacoes;
