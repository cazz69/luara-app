
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  PawPrint,
  Building,
  UserCheck,
  DollarSign,
  Bell,
  MessageSquare,
  UserPlus,
  History,
  CheckCircle
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/sistema", icon: Home },
  { name: "Agendamentos", href: "/sistema/agendamentos", icon: Calendar },
  { name: "Clientes", href: "/sistema/clientes", icon: Users },
  { name: "Pets", href: "/sistema/pets", icon: PawPrint },
  { name: "Hospedagem", href: "/sistema/hospedagem", icon: Building },
  { name: "Equipe", href: "/sistema/equipe", icon: UserCheck },
  { name: "Freelancers", href: "/sistema/freelancers", icon: UserPlus },
  { name: "Histórico", href: "/sistema/historico", icon: History },
  { name: "Serviços Finalizados", href: "/sistema/servicos-finalizados", icon: CheckCircle },
  { name: "Financeiro", href: "/sistema/financeiro", icon: DollarSign },
  { name: "Notificações", href: "/sistema/notificacoes", icon: Bell },
  { name: "Sugestões", href: "/sistema/sugestoes", icon: MessageSquare },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-white w-64 min-h-screen border-r border-gray-200 hidden md:block">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">MeuPetPro</h1>
        <p className="text-sm text-gray-600">Sistema de Gestão</p>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
