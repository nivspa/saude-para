import React from "react";
import { Chart } from "react-google-charts";

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gráfico de Pizza */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium mb-4">Atendimento de Clínicas</h2>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={[
              ["Clínica", "Atendimentos"],
              ["UBS - Pedreira", 300],
              ["Hospital Geral - Guamá", 400],
              ["UPA - Sacramenta", 200],
            ]}
            options={{
              title: "Distribuição de Atendimentos por Clínica",
              pieHole: 0.4,
              colors: ["#3490dc", "#6574cd", "#ffed4a"],
            }}
          />
        </div>

        {/* Gráfico de Linha */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium mb-4">Evolução de Atendimentos</h2>
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={[
              ["Mês", "Atendimentos"],
              ["Jan", 200],
              ["Fev", 250],
              ["Mar", 300],
              ["Abr", 350],
              ["Mai", 400],
              ["Jun", 450],
              ["Jul", 500],
              ["Ago", 550],
              ["Set", 600],
              ["Out", 650],
              ["Nov", 700],
              ["Dez", 750],
            ]}
            options={{
              title: "Atendimentos Mensais",
              colors: ["#3490dc"],
              hAxis: { title: "Mês" },
              vAxis: { title: "Atendimentos" },
            }}
          />
        </div>

        {/* Gráfico de Barras */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium mb-4">Atendimentos por Serviço</h2>
          <Chart
            chartType="BarChart"
            width="100%"
            height="300px"
            data={[
              ["Serviço", "Atendimentos"],
              ["Cardiologia", 300],
              ["Pediatria", 400],
              ["Gastroenterologia", 200],
              ["Oftalmologia", 500],
              ["Dermatologia", 600],
            ]}
            options={{
              title: "Atendimentos por Serviço",
              colors: ["#ffed4a"],
              hAxis: { title: "Atendimentos" },
              vAxis: { title: "Serviço" },
            }}
          />
        </div>

        {/* Gráfico de Área */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium mb-4">Evolução de Casos de Malária</h2>
          <Chart
            chartType="AreaChart"
            width="100%"
            height="300px"
            data={[
              ["Mês", "Casos"],
              ["Jan", 100],
              ["Fev", 120],
              ["Mar", 150],
              ["Abr", 180],
              ["Mai", 200],
              ["Jun", 220],
              ["Jul", 250],
              ["Ago", 280],
              ["Set", 300],
              ["Out", 320],
              ["Nov", 350],
              ["Dez", 400],
            ]}
            options={{
              title: "Casos de Malária Mensais",
              colors: ["#ff789a"],
              hAxis: { title: "Mês" },
              vAxis: { title: "Casos" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;