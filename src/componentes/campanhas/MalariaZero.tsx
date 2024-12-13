import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MalariaZero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <div className="border-8 border-gray-800 rounded-[2.5rem] overflow-hidden h-[720px] relative bg-gray-50">
        <div className="bg-gray-800 h-6 w-40 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>

        <div className="h-full flex flex-col">
          <header className="bg-blue-600 p-4">
            <div className="flex items-center">
              <ArrowLeft
                className="h-6 w-6 text-white cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-white text-xl ml-4">Campanhas de Saúde</h1>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="w-full h-48 flex items-center justify-center mb-4 bg-blue-100 rounded-lg">
              <img
                src="/mnt/data/An_illustration_for_a_malaria_prevention_campaign,.png"
                alt="Malária Zero"
                className="h-full w-full object-contain p-2"
              />
            </div>
            <h1 className="text-xl font-bold mb-4 text-blue-600 text-center">
              Malária Zero
            </h1>
            <p className="text-sm text-gray-700 text-justify">
              A campanha Malária Zero busca erradicar a malária na região amazônica. Use mosquiteiros tratados, aplique
              repelente e procure atendimento médico ao sentir sintomas como febre e calafrios.
            </p>
            <p className="text-sm text-gray-700 text-justify mt-4">
              Prevenção é o melhor caminho para proteger você e sua família dessa doença.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalariaZero;