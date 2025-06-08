
import { Heart, Calendar, Users, Shield, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Calendar,
      title: "Gestão Completa de Agendamentos",
      description: "Organize consultas, banhos, tosas e hospedagem em um só lugar. Nunca mais perca um compromisso!"
    },
    {
      icon: Users,
      title: "Controle de Clientes e Pets",
      description: "Mantenha todas as informações dos tutores e seus pets organizadas com histórico completo."
    },
    {
      icon: Shield,
      title: "Acompanhamento em Tempo Real",
      description: "Tutores podem acompanhar seus pets durante a hospedagem com fotos e atualizações diárias."
    },
    {
      icon: Star,
      title: "Gestão Financeira Integrada",
      description: "Controle total sobre receitas, despesas e relatórios financeiros do seu negócio."
    }
  ];

  const features = [
    "Dashboard com métricas em tempo real",
    "Sistema completo de agendamentos",
    "Cadastro de clientes e pets",
    "Controle de hospedagem",
    "Gestão financeira avançada",
    "Notificações automáticas",
    "Portal exclusivo para tutores",
    "Relatórios detalhados"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Heart className="h-10 w-10 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">PetCare Manager</h1>
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Gerencie seu Pet Shop com
            <span className="text-blue-600"> Facilidade</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            O sistema completo para gestão de pet shops, clínicas veterinárias e hotéis para pets. 
            Simplifique sua rotina e ofereça uma experiência excepcional aos seus clientes.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate("/login")} className="bg-blue-600 hover:bg-blue-700">
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o PetCare Manager?
            </h3>
            <p className="text-lg text-gray-600">
              Tudo que você precisa para modernizar e otimizar seu negócio
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Funcionalidades Completas
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Nossa plataforma oferece todas as ferramentas necessárias para gerenciar 
                seu negócio de forma eficiente e profissional.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 border">
                <Heart className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Pronto para começar?
                </h4>
                <p className="text-gray-600 mb-6">
                  Junte-se a centenas de profissionais que já transformaram 
                  seus negócios com nossa plataforma.
                </p>
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/login")}
                >
                  Acessar Sistema
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">PetCare Manager</span>
          </div>
          <p className="text-gray-400">
            © 2024 PetCare Manager. Cuidando do seu negócio e dos pets com amor.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
