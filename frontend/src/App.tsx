
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Agendamentos from "./pages/Agendamentos";
import Clientes from "./pages/Clientes";
import Pets from "./pages/Pets";
import Hospedagem from "./pages/Hospedagem";
import Equipe from "./pages/Equipe";
import Freelancers from "./pages/Freelancers";
import Historico from "./pages/Historico";
import ServicosFinalizados from "./pages/ServicosFinalizados";
import Financeiro from "./pages/Financeiro";
import Notificacoes from "./pages/Notificacoes";
import Sugestoes from "./pages/Sugestoes";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import TutorDashboard from "./pages/TutorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sistema" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="agendamentos" element={<Agendamentos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="pets" element={<Pets />} />
            <Route path="hospedagem" element={<Hospedagem />} />
            <Route path="equipe" element={<Equipe />} />
            <Route path="freelancers" element={<Freelancers />} />
            <Route path="historico" element={<Historico />} />
            <Route path="servicos-finalizados" element={<ServicosFinalizados />} />
            <Route path="financeiro" element={<Financeiro />} />
            <Route path="notificacoes" element={<Notificacoes />} />
            <Route path="sugestoes" element={<Sugestoes />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/tutor/dashboard" element={<TutorDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
