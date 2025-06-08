
import { Calendar, Users, Heart, DollarSign, Hotel, Bell } from "lucide-react";
import StatsCard from "@/components/Dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do seu negócio de cuidados com pets
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Agendamentos Hoje"
          value={12}
          description="4 consultas, 6 banhos, 2 tosas"
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Clientes Ativos"
          value={248}
          description="15 novos este mês"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Pets Cadastrados"
          value={412}
          description="23 novos este mês"
          icon={Heart}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Faturamento Mensal"
          value="R$ 18.500"
          description="Meta: R$ 20.000"
          icon={DollarSign}
          trend={{ value: 20, isPositive: true }}
        />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Hotel className="h-5 w-5 mr-2" />
              Hospedagem Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 pets</div>
            <p className="text-xs text-muted-foreground">
              3 check-ins hoje, 2 check-outs amanhã
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Lembretes Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              10 vacinas, 5 retornos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Rex - Banho</span>
                <span>09:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bella - Consulta</span>
                <span>10:30</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Max - Tosa</span>
                <span>14:00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
