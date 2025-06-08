
import { useState } from "react";
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock para demonstrar diferentes tipos de perfil
const mockPerfil = {
  id: '1',
  nome: 'João Silva',
  email: 'joao@email.com',
  telefone: '(11) 99999-1111',
  endereco: 'Rua das Flores, 123 - São Paulo, SP',
  dataCadastro: '2023-01-15',
  tipo: 'cliente', // cliente, funcionario, gerente, admin
  foto: '',
  // Campos específicos do cliente
  whatsapp: '5511999991111',
  pets: ['Rex', 'Luna'],
  // Campos específicos do funcionário
  cargo: '',
  dataAdmissao: '',
  salario: '',
  observacoes: 'Cliente há mais de 1 ano, sempre pontual nos agendamentos.'
};

const Perfil = () => {
  const [perfil, setPerfil] = useState(mockPerfil);
  const [editando, setEditando] = useState(false);
  const [perfilEditado, setPerfilEditado] = useState(mockPerfil);

  const handleSalvar = () => {
    setPerfil(perfilEditado);
    setEditando(false);
  };

  const handleCancelar = () => {
    setPerfilEditado(perfil);
    setEditando(false);
  };

  const getTipoBadge = (tipo: string) => {
    const cores = {
      'admin': 'bg-red-100 text-red-800',
      'gerente': 'bg-purple-100 text-purple-800',
      'funcionario': 'bg-blue-100 text-blue-800',
      'cliente': 'bg-green-100 text-green-800'
    };
    return cores[tipo as keyof typeof cores] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perfil</h2>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais
          </p>
        </div>
        
        {!editando ? (
          <Button onClick={() => setEditando(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSalvar}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button variant="outline" onClick={handleCancelar}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card Principal */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={perfil.foto} />
                <AvatarFallback className="text-lg">
                  {perfil.nome.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{perfil.nome}</h3>
                <Badge className={getTipoBadge(perfil.tipo)}>
                  {perfil.tipo === 'cliente' ? 'Cliente' : 
                   perfil.tipo === 'funcionario' ? 'Funcionário' :
                   perfil.tipo === 'gerente' ? 'Gerente' : 'Administrador'}
                </Badge>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Nome Completo</label>
                {editando ? (
                  <Input
                    value={perfilEditado.nome}
                    onChange={(e) => setPerfilEditado({...perfilEditado, nome: e.target.value})}
                  />
                ) : (
                  <p className="mt-1">{perfil.nome}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                {editando ? (
                  <Input
                    type="email"
                    value={perfilEditado.email}
                    onChange={(e) => setPerfilEditado({...perfilEditado, email: e.target.value})}
                  />
                ) : (
                  <p className="mt-1">{perfil.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Telefone</label>
                {editando ? (
                  <Input
                    value={perfilEditado.telefone}
                    onChange={(e) => setPerfilEditado({...perfilEditado, telefone: e.target.value})}
                  />
                ) : (
                  <p className="mt-1">{perfil.telefone}</p>
                )}
              </div>

              {perfil.tipo === 'cliente' && (
                <div>
                  <label className="text-sm font-medium">WhatsApp</label>
                  {editando ? (
                    <Input
                      value={perfilEditado.whatsapp}
                      onChange={(e) => setPerfilEditado({...perfilEditado, whatsapp: e.target.value})}
                    />
                  ) : (
                    <p className="mt-1">{perfil.whatsapp}</p>
                  )}
                </div>
              )}

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Endereço</label>
                {editando ? (
                  <Input
                    value={perfilEditado.endereco}
                    onChange={(e) => setPerfilEditado({...perfilEditado, endereco: e.target.value})}
                  />
                ) : (
                  <p className="mt-1">{perfil.endereco}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Observações</label>
                {editando ? (
                  <Textarea
                    value={perfilEditado.observacoes}
                    onChange={(e) => setPerfilEditado({...perfilEditado, observacoes: e.target.value})}
                    placeholder="Adicione observações relevantes..."
                  />
                ) : (
                  <p className="mt-1">{perfil.observacoes}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar com informações adicionais */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Informações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Data de Cadastro</label>
                <p>{new Date(perfil.dataCadastro).toLocaleDateString('pt-BR')}</p>
              </div>
              
              {perfil.tipo !== 'cliente' && perfil.dataAdmissao && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Data de Admissão</label>
                  <p>{new Date(perfil.dataAdmissao).toLocaleDateString('pt-BR')}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Tipo de Usuário</label>
                {editando ? (
                  <Select 
                    value={perfilEditado.tipo} 
                    onValueChange={(value) => setPerfilEditado({...perfilEditado, tipo: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cliente">Cliente</SelectItem>
                      <SelectItem value="funcionario">Funcionário</SelectItem>
                      <SelectItem value="gerente">Gerente</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="capitalize">{perfil.tipo}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {perfil.tipo === 'cliente' && perfil.pets.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Pets Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {perfil.pets.map((pet, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-2xl">🐕</span>
                      <span>{pet}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email
              </Button>
              
              {perfil.tipo === 'cliente' && (
                <>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Chamar no WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Histórico de Agendamentos
                  </Button>
                </>
              )}
              
              <Button variant="destructive" className="w-full">
                Desativar Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
