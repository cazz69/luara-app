
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Sistema de Gestão MeuPetPro
        </h1>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/sistema/notificacoes")}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/sistema/perfil")}
          >
            <User className="h-4 w-4 mr-2" />
            Perfil
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
