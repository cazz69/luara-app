
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Play, User } from "lucide-react";
import { EtapaServico } from "@/types";
import { mockFuncionarios } from "@/data/mockData";

interface EtapasServicoProps {
  etapas: EtapaServico[];
  agendamentoId: string;
}

const EtapasServico = ({ etapas, agendamentoId }: EtapasServicoProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'em_andamento':
        return <Play className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida':
        return 'bg-green-100 text-green-800';
      case 'em_andamento':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concluida':
        return 'Concluída';
      case 'em_andamento':
        return 'Em Andamento';
      default:
        return 'Pendente';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Etapas do Serviço</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {etapas.sort((a, b) => a.ordem - b.ordem).map((etapa, index) => {
            const funcionario = etapa.funcionarioId ? 
              mockFuncionarios.find(f => f.id === etapa.funcionarioId) : null;
            
            return (
              <div key={etapa.id} className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    {getStatusIcon(etapa.status)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {etapa.ordem}. {etapa.nome}
                      </h4>
                      {funcionario && (
                        <p className="text-xs text-gray-600 flex items-center mt-1">
                          <User className="h-3 w-3 mr-1" />
                          {funcionario.nome}
                        </p>
                      )}
                    </div>
                    <Badge className={getStatusColor(etapa.status)}>
                      {getStatusText(etapa.status)}
                    </Badge>
                  </div>
                  
                  {(etapa.horaInicio || etapa.horaFim) && (
                    <p className="text-xs text-gray-500 mt-1">
                      {etapa.horaInicio && `Início: ${etapa.horaInicio}`}
                      {etapa.horaFim && ` - Fim: ${etapa.horaFim}`}
                    </p>
                  )}
                  
                  {etapa.observacoes && (
                    <p className="text-xs text-gray-600 mt-2 italic">
                      {etapa.observacoes}
                    </p>
                  )}
                  
                  {etapa.status === 'pendente' && (
                    <div className="mt-2 flex space-x-2">
                      <Button size="sm" variant="outline">
                        Iniciar Etapa
                      </Button>
                      <Button size="sm" variant="outline">
                        Atribuir Funcionário
                      </Button>
                    </div>
                  )}
                  
                  {etapa.status === 'em_andamento' && (
                    <Button size="sm" className="mt-2">
                      Finalizar Etapa
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default EtapasServico;
