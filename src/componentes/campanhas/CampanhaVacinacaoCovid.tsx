import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CampanhaVacinacaoCovid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <div className="border-8 border-gray-800 rounded-[2.5rem] overflow-hidden h-[720px] relative bg-gray-50">
        <div className="bg-gray-800 h-6 w-40 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>

        <div className="h-full flex flex-col">
          {/* Header */}
          <header className="bg-blue-600 p-4">
            <div className="flex items-center">
              <ArrowLeft
                className="h-6 w-6 text-white cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-white text-xl ml-4">Campanhas de Saúde</h1>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="w-full h-48 flex items-center justify-center mb-4 bg-blue-100 rounded-lg">
              <img
                src="/mnt/data/new_covid_campaign_image.png"
                alt="Campanha de Vacinação Covid-19"
                className="h-full w-full object-contain p-2"
              />
            </div>
            <h1 className="text-xl font-bold mb-4 text-blue-600 text-center">
              Campanha de Vacinação Covid-19
            </h1>
            <p className="text-sm text-gray-700 text-justify">
              A Campanha de Vacinação Covid-19 é destinada a imunizar a população contra o vírus SARS-CoV-2 e suas variantes.
              As vacinas são seguras e eficazes, reduzindo internações e óbitos. Confira os postos de vacinação disponíveis e
              leve os documentos necessários, como RG e cartão do SUS.
            </p>
            <p className="text-sm text-gray-700 text-justify mt-4">
              Fique atento às datas e locais de vacinação na sua região. Juntos, podemos superar a pandemia!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampanhaVacinacaoCovid;

