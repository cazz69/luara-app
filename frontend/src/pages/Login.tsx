
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, User, Lock, Users, PawPrint } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailFuncionario, setEmailFuncionario] = useState("");
  const [senhaFuncionario, setSenhaFuncionario] = useState("");
  const [emailTutor, setEmailTutor] = useState("");
  const [senhaTutor, setSenhaTutor] = useState("");
  const navigate = useNavigate();

  const handleLoginFuncionario = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailFuncionario && senhaFuncionario) {
      localStorage.setItem("funcionarioLogado", "true");
      localStorage.setItem("funcionarioEmail", emailFuncionario);
      navigate("/sistema");
    }
  };

  const handleLoginTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailTutor && senhaTutor) {
      localStorage.setItem("tutorLogado", "true");
      localStorage.setItem("tutorEmail", emailTutor);
      navigate("/tutor/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            PetCare Manager
          </CardTitle>
          <p className="text-gray-600">
            Acesse sua conta
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="funcionario" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="funcionario" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Funcionário</span>
              </TabsTrigger>
              <TabsTrigger value="tutor" className="flex items-center space-x-2">
                <PawPrint className="h-4 w-4" />
                <span>Tutor</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="funcionario">
              <form onSubmit={handleLoginFuncionario} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="funcionario@email.com"
                      value={emailFuncionario}
                      onChange={(e) => setEmailFuncionario(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      value={senhaFuncionario}
                      onChange={(e) => setSenhaFuncionario(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Entrar como Funcionário
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="tutor">
              <form onSubmit={handleLoginTutor} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="tutor@email.com"
                      value={emailTutor}
                      onChange={(e) => setEmailTutor(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      value={senhaTutor}
                      onChange={(e) => setSenhaTutor(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Entrar como Tutor
                </Button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Primeira vez? Entre em contato conosco para criar sua conta
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
