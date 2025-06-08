
import { useState } from "react";
import { Plus, Search, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPets, mockTutores } from "@/data/mockData";

const Pets = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const petsComTutores = mockPets
    .filter(pet => 
      pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mockTutores.find(t => t.id === pet.tutorId)?.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(pet => ({
      ...pet,
      tutor: mockTutores.find(t => t.id === pet.tutorId)
    }));

  // Agrupar pets por tutor
  const petsPorTutor = petsComTutores.reduce((acc, pet) => {
    const tutorId = pet.tutorId;
    if (!acc[tutorId]) {
      acc[tutorId] = {
        tutor: pet.tutor!,
        pets: []
      };
    }
    acc[tutorId].pets.push(pet);
    return acc;
  }, {} as Record<string, { tutor: any, pets: any[] }>);

  const abrirWhatsApp = (whatsapp: string, nomePet: string) => {
    const mensagem = encodeURIComponent(`Olá! Gostaria de falar sobre o ${nomePet}.`);
    window.open(`https://wa.me/${whatsapp}?text=${mensagem}`, '_blank');
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Pets</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Fichas completas dos pets cadastrados organizadas por tutor
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar Pet
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar pets ou tutores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-6">
        {Object.values(petsPorTutor).map(({ tutor, pets }) => (
          <Card key={tutor.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    {tutor.nome}
                  </CardTitle>
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <p>📧 {tutor.email}</p>
                    <p>📱 {tutor.telefone}</p>
                    <p>📍 {tutor.endereco}</p>
                  </div>
                </div>
                {tutor.whatsapp && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => abrirWhatsApp(tutor.whatsapp, pets[0]?.nome)}
                    className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 w-full md:w-auto"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">WhatsApp</span>
                    <span className="md:hidden">💬</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {pets.map((pet) => (
                  <div key={pet.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">{pet.fotoUrl}</span>
                      <div>
                        <h4 className="font-semibold text-lg">{pet.nome}</h4>
                        <p className="text-sm text-gray-600">{pet.raca}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Idade</p>
                          <p className="font-medium">{pet.idade}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Peso</p>
                          <p className="font-medium">{pet.peso}</p>
                        </div>
                      </div>
                      
                      {pet.alergias.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground">Alergias</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pet.alergias.map((alergia, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {alergia}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {pet.observacoes && (
                        <div>
                          <p className="text-sm text-muted-foreground">Observações</p>
                          <p className="text-sm">{pet.observacoes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex flex-col md:flex-row gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Ver Ficha
                      </Button>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(petsPorTutor).length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum pet encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Pets;
