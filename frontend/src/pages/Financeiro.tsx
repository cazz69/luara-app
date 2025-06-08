
import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockTransacoesPetShop = [
  {
    id: 1,
    tipo: "receita",
    descricao: "Banho - Rex",
    valor: 50,
    data: "2024-01-15",
    cliente: "João Silva"
  },
  {
    id: 2,
    tipo: "receita",
    descricao: "Tosa - Bella",
    valor: 80,
    data: "2024-01-15",
    cliente: "Maria Santos"
  },
  {
    id: 3,
    tipo: "despesa",
    descricao: "Produtos de higiene",
    valor: 150,
    data: "2024-01-14",
    cliente: "Fornecedor A"
  }
];

const mockTransacoesClinica = [
  {
    id: 4,
    tipo: "receita",
    descricao: "Consulta - Max",
    valor: 120,
    data: "2024-01-15",
    cliente: "Pedro Costa"
  },
  {
    id: 5,
    tipo: "receita",
    descricao: "Vacina - Luna",
    valor: 80,
    data: "2024-01-14",
    cliente: "João Silva"
  },
  {
    id: 6,
    tipo: "despesa",
    descricao: "Medicamentos",
    valor: 300,
    data: "2024-01-13",
    cliente: "Distribuidora Vet"
  }
];

const mockTransacoesHotel = [
  {
    id: 7,
    tipo: "receita",
    descricao: "Hospedagem - Rex (5 dias)",
    valor: 300,
    data: "2024-01-12",
    cliente: "João Silva"
  },
  {
    id: 8,
    tipo: "receita",
    descricao: "Day Care - Bella",
    valor: 40,
    data: "2024-01-11",
    cliente: "Maria Santos"
  },
  {
    id: 9,
    tipo: "despesa",
    descricao: "Ração premium",
    valor: 200,
    data: "2024-01-10",
    cliente: "Pet Food Ltda"
  }
];

const Financeiro = () => {
  const calcularResumo = (transacoes: any[]) => {
    const receitas = transacoes
      .filter(t => t.tipo === "receita")
      .reduce((acc, t) => acc + t.valor, 0);
      
    const despesas = transacoes
      .filter(t => t.tipo === "despesa")
      .reduce((acc, t) => acc + t.valor, 0);
      
    return { receitas, despesas, saldo: receitas - despesas };
  };

  const resumoPetShop = calcularResumo(mockTransacoesPetShop);
  const resumoClinica = calcularResumo(mockTransacoesClinica);
  const resumoHotel = calcularResumo(mockTransacoesHotel);

  const totalGeral = {
    receitas: resumoPetShop.receitas + resumoClinica.receitas + resumoHotel.receitas,
    despesas: resumoPetShop.despesas + resumoClinica.despesas + resumoHotel.despesas,
    saldo: resumoPetShop.saldo + resumoClinica.saldo + resumoHotel.saldo
  };

  const renderResumoCards = (resumo: any, setor: string) => (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receitas - {setor}</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            R$ {resumo.receitas.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas - {setor}</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            R$ {resumo.despesas.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo - {setor}</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${resumo.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            R$ {resumo.saldo.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTransacoes = (transacoes: any[]) => (
    <Card>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transacoes.map((transacao) => (
            <div key={transacao.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{transacao.descricao}</p>
                <p className="text-sm text-muted-foreground">
                  {transacao.cliente} • {transacao.data}
                </p>
              </div>
              <div className={`font-bold ${
                transacao.tipo === "receita" ? "text-green-600" : "text-red-600"
              }`}>
                {transacao.tipo === "receita" ? "+" : "-"}R$ {transacao.valor}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
          <p className="text-muted-foreground">
            Controle financeiro e relatórios por setor
          </p>
        </div>
        <Button>
          <DollarSign className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="petshop">Pet Shop</TabsTrigger>
          <TabsTrigger value="clinica">Clínica</TabsTrigger>
          <TabsTrigger value="hotel">Hotel</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <div className="space-y-6">
            {renderResumoCards(totalGeral, "Geral")}
            
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-blue-600" />
                    Pet Shop
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Receitas:</span>
                      <span className="font-medium text-green-600">R$ {resumoPetShop.receitas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Despesas:</span>
                      <span className="font-medium text-red-600">R$ {resumoPetShop.despesas}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Saldo:</span>
                      <span className={`font-bold ${resumoPetShop.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        R$ {resumoPetShop.saldo}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-green-600" />
                    Clínica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Receitas:</span>
                      <span className="font-medium text-green-600">R$ {resumoClinica.receitas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Despesas:</span>
                      <span className="font-medium text-red-600">R$ {resumoClinica.despesas}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Saldo:</span>
                      <span className={`font-bold ${resumoClinica.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        R$ {resumoClinica.saldo}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-purple-600" />
                    Hotel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Receitas:</span>
                      <span className="font-medium text-green-600">R$ {resumoHotel.receitas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Despesas:</span>
                      <span className="font-medium text-red-600">R$ {resumoHotel.despesas}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Saldo:</span>
                      <span className={`font-bold ${resumoHotel.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        R$ {resumoHotel.saldo}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="petshop">
          <div className="space-y-6">
            {renderResumoCards(resumoPetShop, "Pet Shop")}
            {renderTransacoes(mockTransacoesPetShop)}
          </div>
        </TabsContent>

        <TabsContent value="clinica">
          <div className="space-y-6">
            {renderResumoCards(resumoClinica, "Clínica")}
            {renderTransacoes(mockTransacoesClinica)}
          </div>
        </TabsContent>

        <TabsContent value="hotel">
          <div className="space-y-6">
            {renderResumoCards(resumoHotel, "Hotel")}
            {renderTransacoes(mockTransacoesHotel)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financeiro;

