
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Calendar, Hotel, Syringe, Scissors, LogOut, Weight, AlertTriangle, FileText, Camera, Utensils, Pill, MessageCircle } from "lucide-react";
import AgendamentoModal from "@/components/tutor/AgendamentoModal";
import StatusPetCard from "@/components/tutor/StatusPetCard";

// Dados mockados expandidos
const mockDadosTutor = {
  nome: "João Silva",
  email: "joao@email.com",
  telefone: "(11) 99999-1111",
  whatsapp: "5511999991111",
  pets: [
    {
      id: 1,
      nome: "Rex",
      raca: "Golden Retriever",
      idade: "3 anos",
      peso: "28kg",
      alergias: ["Frango", "Pólen"],
      observacoes: "Pet muito dócil, gosta de brincar com outros cães. Tem medo de fogos de artifício.",
      foto: "🐕",
      fotoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=faces",
      statusDiario: {
        alimentacao: { realizada: true, horario: "08:00", proxima: "18:00" },
        medicacao: { realizada: false, horario: null, proxima: "14:00" },
        fotos: [
          { id: 1, url: "📸", horario: "09:30", descricao: "Brincando no pátio" },
          { id: 2, url: "📷", horario: "14:15", descricao: "Descansando após o banho" }
        ]
      },
      vacinas: [
        { nome: "V10", data: "2024-01-15", proximaData: "2025-01-15", status: "em dia" },
        { nome: "Antirrábica", data: "2024-02-10", proximaData: "2025-02-10", status: "em dia" }
      ],
      agendamentos: [
        { tipo: "Banho", data: "2024-01-25", hora: "14:00", status: "confirmado" },
        { tipo: "Consulta", data: "2024-02-05", hora: "10:30", status: "pendente" }
      ],
      hospedagem: [
        { checkin: "2024-01-20", checkout: "2024-01-25", status: "finalizada" }
      ],
      historico: [
        { data: "2024-01-10", servico: "Banho e Tosa", valor: 80 },
        { data: "2023-12-15", servico: "Consulta", valor: 120 }
      ]
    },
    {
      id: 2,
      nome: "Luna",
      raca: "Golden Retriever",
      idade: "1 ano",
      peso: "20kg",
      alergias: [],
      observacoes: "Filhote muito energética, irmã do Rex. Gosta de brincar com bola.",
      foto: "🐕",
      fotoUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=faces",
      statusDiario: {
        alimentacao: { realizada: true, horario: "07:30", proxima: "17:30" },
        medicacao: { realizada: true, horario: "08:00", proxima: null },
        fotos: [
          { id: 1, url: "📸", horario: "10:00", descricao: "Correndo no quintal" }
        ]
      },
      vacinas: [
        { nome: "V8", data: "2024-01-20", proximaData: "2024-04-20", status: "próxima" }
      ],
      agendamentos: [
        { tipo: "Tosa", data: "2024-02-08", hora: "16:00", status: "confirmado" }
      ],
      hospedagem: [],
      historico: [
        { data: "2024-01-05", servico: "Primeira Consulta", valor: 150 }
      ]
    }
  ]
};

const TutorDashboard = () => {
  const navigate = useNavigate();
  const [dadosTutor, setDadosTutor] = useState(mockDadosTutor);
  const [showAgendamento, setShowAgendamento] = useState(false);

  useEffect(() => {
    const tutorLogado = localStorage.getItem("tutorLogado");
    if (!tutorLogado) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("tutorLogado");
    localStorage.removeItem("tutorEmail");
    navigate("/login");
  };

  const abrirWhatsApp = () => {
    const mensagem = encodeURIComponent(`Olá! Sou ${dadosTutor.nome}, tutor dos pets ${dadosTutor.pets.map(p => p.nome).join(' e ')}. Gostaria de mais informações.`);
    window.open(`https://wa.me/${dadosTutor.whatsapp}?text=${mensagem}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
      case "em dia":
        return "bg-green-100 text-green-800";
      case "pendente":
      case "próxima":
        return "bg-yellow-100 text-yellow-800";
      case "atrasada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portal do Tutor</h1>
              <p className="text-gray-600">Bem-vindo, {dadosTutor.nome}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline"
              onClick={abrirWhatsApp}
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Informações do Tutor */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{dadosTutor.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-medium">{dadosTutor.telefone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-medium">+{dadosTutor.whatsapp}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {dadosTutor.pets.map((pet) => (
          <div key={pet.id} className="space-y-6 mb-8">
            {/* Informações Básicas do Pet */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {pet.fotoUrl ? (
                      <img 
                        src={pet.fotoUrl} 
                        alt={pet.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">{pet.foto}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{pet.nome}</h2>
                    <p className="text-gray-600">{pet.raca} • {pet.idade}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Weight className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{pet.peso}</span>
                      </div>
                      {pet.alergias.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Alergias: {pet.alergias.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button onClick={() => setShowAgendamento(true)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Serviço
                  </Button>
                </CardTitle>
              </CardHeader>
              {pet.observacoes && (
                <CardContent>
                  <div className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Observações:</p>
                      <p className="text-sm text-gray-600">{pet.observacoes}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Tabs para organizar o conteúdo */}
            <Tabs defaultValue="status" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="status">Status Diário</TabsTrigger>
                <TabsTrigger value="saude">Saúde</TabsTrigger>
                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                <TabsTrigger value="hospedagem">Hospedagem</TabsTrigger>
              </TabsList>

              <TabsContent value="status" className="space-y-4">
                <StatusPetCard pet={pet} />
              </TabsContent>

              <TabsContent value="saude" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Syringe className="h-5 w-5 mr-2 text-green-600" />
                      Vacinas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pet.vacinas.map((vacina, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{vacina.nome}</p>
                            <p className="text-sm text-gray-600">
                              Próxima: {vacina.proximaData}
                            </p>
                          </div>
                          <Badge className={getStatusColor(vacina.status)}>
                            {vacina.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="servicos" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                        Próximos Agendamentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {pet.agendamentos.map((agendamento, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="font-medium">{agendamento.tipo}</p>
                              <Badge className={getStatusColor(agendamento.status)}>
                                {agendamento.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {agendamento.data} às {agendamento.hora}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Scissors className="h-5 w-5 mr-2 text-orange-600" />
                        Histórico de Serviços
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {pet.historico.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <div>
                              <p className="font-medium">{item.servico}</p>
                              <p className="text-sm text-gray-600">{item.data}</p>
                            </div>
                            <p className="font-medium text-green-600">
                              R$ {item.valor}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="hospedagem" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Hotel className="h-5 w-5 mr-2 text-purple-600" />
                      Hospedagem
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pet.hospedagem.length > 0 ? (
                        pet.hospedagem.map((estadia, index) => (
                          <div key={index} className="space-y-2">
                            <p className="font-medium">Última Estadia</p>
                            <p className="text-sm text-gray-600">
                              {estadia.checkin} até {estadia.checkout}
                            </p>
                            <Badge className={getStatusColor(estadia.status)}>
                              {estadia.status}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">
                          Nenhuma hospedagem registrada
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ))}
      </div>

      {showAgendamento && (
        <AgendamentoModal
          isOpen={showAgendamento}
          onClose={() => setShowAgendamento(false)}
          petNome={dadosTutor.pets[0]?.nome}
        />
      )}
    </div>
  );
};

export default TutorDashboard;
