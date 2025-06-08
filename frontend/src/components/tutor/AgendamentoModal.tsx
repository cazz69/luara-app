
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, X } from "lucide-react";

interface AgendamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  petNome: string;
}

const horariosDisponiveis = {
  "2024-01-30": ["09:00", "11:00", "14:00", "16:00"],
  "2024-01-31": ["10:00", "14:30", "15:30"],
  "2024-02-01": ["08:30", "13:00", "17:00"],
  "2024-02-02": ["09:30", "11:30", "15:00", "16:30"]
};

const servicos = [
  { nome: "Banho", duracao: "1h", preco: "R$ 50" },
  { nome: "Tosa", duracao: "1h30", preco: "R$ 80" },
  { nome: "Banho e Tosa", duracao: "2h", preco: "R$ 120" },
  { nome: "Consulta Veterinária", duracao: "30min", preco: "R$ 150" }
];

const AgendamentoModal = ({ isOpen, onClose, petNome }: AgendamentoModalProps) => {
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  if (!isOpen) return null;

  const handleSolicitarAgendamento = () => {
    if (servicoSelecionado && dataSelecionada && horarioSelecionado) {
      alert(`Solicitação enviada!\nPet: ${petNome}\nServiço: ${servicoSelecionado}\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Agendar Serviço para {petNome}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="servico" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="servico">1. Serviço</TabsTrigger>
              <TabsTrigger value="data">2. Data</TabsTrigger>
              <TabsTrigger value="horario">3. Horário</TabsTrigger>
            </TabsList>

            <TabsContent value="servico" className="space-y-4">
              <h3 className="text-lg font-semibold">Escolha o serviço</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {servicos.map((servico, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-colors ${
                      servicoSelecionado === servico.nome 
                        ? "border-blue-500 bg-blue-50" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setServicoSelecionado(servico.nome)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{servico.nome}</h4>
                          <p className="text-sm text-gray-600">Duração: {servico.duracao}</p>
                        </div>
                        <span className="font-semibold text-green-600">{servico.preco}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <h3 className="text-lg font-semibold">Escolha a data</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {Object.keys(horariosDisponiveis).map((data) => (
                  <Card 
                    key={data}
                    className={`cursor-pointer transition-colors ${
                      dataSelecionada === data 
                        ? "border-blue-500 bg-blue-50" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setDataSelecionada(data)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data}</span>
                        <Badge variant="secondary">
                          {horariosDisponiveis[data as keyof typeof horariosDisponiveis].length} horários
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="horario" className="space-y-4">
              <h3 className="text-lg font-semibold">Escolha o horário</h3>
              {dataSelecionada ? (
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                  {horariosDisponiveis[dataSelecionada as keyof typeof horariosDisponiveis].map((horario) => (
                    <Button
                      key={horario}
                      variant={horarioSelecionado === horario ? "default" : "outline"}
                      className="flex items-center justify-center"
                      onClick={() => setHorarioSelecionado(horario)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {horario}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Selecione uma data primeiro</p>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Resumo da Solicitação:</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Pet:</strong> {petNome}</p>
              <p><strong>Serviço:</strong> {servicoSelecionado || "Não selecionado"}</p>
              <p><strong>Data:</strong> {dataSelecionada || "Não selecionada"}</p>
              <p><strong>Horário:</strong> {horarioSelecionado || "Não selecionado"}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSolicitarAgendamento}
              disabled={!servicoSelecionado || !dataSelecionada || !horarioSelecionado}
            >
              Solicitar Agendamento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgendamentoModal;
