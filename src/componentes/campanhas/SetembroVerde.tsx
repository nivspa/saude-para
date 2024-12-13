import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SetembroVerde: React.FC = () => {
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
                src="/mnt/data/An_illustration_for_an_organ_donation_awareness_ca.png"
                alt="Setembro Verde"
                className="h-full w-full object-contain p-2"
              />
            </div>
            <h1 className="text-xl font-bold mb-4 text-blue-600 text-center">
              Setembro Verde
            </h1>
            <p className="text-sm text-gray-700 text-justify">
              A campanha Setembro Verde promove a conscientização sobre a importância da doação de órgãos. Doe vida!
              Saiba mais sobre como se tornar um doador e transformar vidas.
            </p>
            <p className="text-sm text-gray-700 text-justify mt-4">
              Converse com sua família sobre o tema e ajude a ampliar a esperança para quem precisa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetembroVerde;
