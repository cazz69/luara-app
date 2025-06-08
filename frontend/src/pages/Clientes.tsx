
import { useState } from "react";
import { Plus, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockClientes = [
  {
    id: 1,
    nome: "João Silva",
    telefone: "(11) 99999-9999",
    email: "joao@email.com",
    endereco: "Rua das Flores, 123",
    pets: 2,
    ultimaVisita: "2024-01-10"
  },
  {
    id: 2,
    nome: "Maria Santos",
    telefone: "(11) 88888-8888",
    email: "maria@email.com",
    endereco: "Av. Principal, 456",
    pets: 1,
    ultimaVisita: "2024-01-12"
  },
  {
    id: 3,
    nome: "Pedro Costa",
    telefone: "(11) 77777-7777",
    email: "pedro@email.com",
    endereco: "Rua Central, 789",
    pets: 3,
    ultimaVisita: "2024-01-08"
  }
];

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">
            Gerencie o cadastro de clientes e tutores
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockClientes.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {cliente.nome}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{cliente.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{cliente.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Endereço</p>
                  <p className="font-medium">{cliente.endereco}</p>
                </div>
                <div className="flex justify-between pt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Pets</p>
                    <p className="font-medium">{cliente.pets}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Última Visita</p>
                    <p className="font-medium">{cliente.ultimaVisita}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button size="sm" variant="outline">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clientes;
