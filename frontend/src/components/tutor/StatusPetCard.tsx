
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Pill, Camera, Clock } from "lucide-react";

interface StatusPetCardProps {
  pet: {
    nome: string;
    statusDiario: {
      alimentacao: { realizada: boolean; horario: string | null; proxima: string };
      medicacao: { realizada: boolean; horario: string | null; proxima: string };
      fotos: Array<{ id: number; url: string; horario: string; descricao: string }>;
    };
  };
}

const StatusPetCard = ({ pet }: StatusPetCardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Status de Alimentação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Utensils className="h-5 w-5 mr-2 text-orange-600" />
            Alimentação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge className={pet.statusDiario.alimentacao.realizada ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {pet.statusDiario.alimentacao.realizada ? "Realizada" : "Pendente"}
              </Badge>
            </div>
            {pet.statusDiario.alimentacao.realizada && pet.statusDiario.alimentacao.horario && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Última refeição:</span>
                <span className="text-sm text-gray-600">{pet.statusDiario.alimentacao.horario}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Próxima refeição:</span>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-3 w-3 mr-1" />
                {pet.statusDiario.alimentacao.proxima}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status de Medicação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Pill className="h-5 w-5 mr-2 text-blue-600" />
            Medicação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge className={pet.statusDiario.medicacao.realizada ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {pet.statusDiario.medicacao.realizada ? "Realizada" : "Pendente"}
              </Badge>
            </div>
            {pet.statusDiario.medicacao.realizada && pet.statusDiario.medicacao.horario && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Última dose:</span>
                <span className="text-sm text-gray-600">{pet.statusDiario.medicacao.horario}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Próxima dose:</span>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-3 w-3 mr-1" />
                {pet.statusDiario.medicacao.proxima}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fotos Diárias */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Camera className="h-5 w-5 mr-2 text-purple-600" />
            Fotos do Dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pet.statusDiario.fotos.map((foto) => (
              <div key={foto.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <span className="text-2xl">{foto.url}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{foto.descricao}</p>
                  <p className="text-xs text-gray-500">{foto.horario}</p>
                </div>
              </div>
            ))}
            {pet.statusDiario.fotos.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma foto disponível hoje
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusPetCard;
