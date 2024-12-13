import React from "react";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DezembroVermelho: React.FC = () => {
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
              <h1 className="text-white text-xl ml-4">Dezembro Vermelho</h1>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="w-full h-48 flex items-center justify-center mb-4 bg-blue-100 rounded-lg">
              <img
                src="/mnt/data/MANDALA.jpg"
                alt="Campanha Dezembro Vermelho 2024"
                className="h-full w-full object-contain p-2"
              />
            </div>

            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Campanha Dezembro Vermelho 2024
            </h2>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-700 text-justify">
                O Dezembro Vermelho é uma campanha nacional de conscientização sobre a prevenção ao HIV/AIDS e outras
                ISTs. Com foco na redução do preconceito e no estímulo ao diagnóstico precoce, a campanha deste ano
                apresenta estratégias educativas e ações preventivas, como a distribuição de preservativos e incentivo à testagem regular.
              </p>
              
              <p className="text-sm text-gray-700 text-justify">
                As ações incluem oficinas comunitárias, campanhas informativas em escolas e unidades de saúde, além de
                parcerias com ONGs locais para promover o acesso ao tratamento gratuito e contínuo para pessoas
                diagnosticadas com HIV.
              </p>
              
              <p className="text-sm text-gray-700 text-justify">
                Participe das atividades e ajude a disseminar informações corretas sobre prevenção e cuidado. A luta contra
                o preconceito começa com a conscientização!
              </p>
            </div>

            {/* Botão de Download */}
            <button 
              className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors mb-3"
              onClick={() => window.open('/mnt/data/Folder - Estratégias de Prevenção - Dezembro Vermelho.pdf', 'https://drive.google.com/file/d/1w7ewJX5WFkAS2pgXxdwcxdXZak-I4ix1/view?usp=drive_link')}
            >
              <Download className="w-5 h-5" />
              <span>Faça o download do Folder</span>
            </button>
          </div>

          {/* Bottom Navigation */}
          <nav className="bg-white border-t border-gray-100 py-2 px-6">
            <div className="flex justify-around items-center">
              <button className="flex flex-col items-center" onClick={() => navigate('/')}>
                <div className="h-1 w-1 bg-transparent mb-1"></div>
                <span className="text-xs text-gray-400">Início</span>
              </button>
              <button className="flex flex-col items-center" onClick={() => navigate('/mapa')}>
                <div className="h-1 w-1 bg-transparent mb-1"></div>
                <span className="text-xs text-gray-400">Mapa</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="h-1 w-1 bg-blue-600 rounded-full mb-1"></div>
                <span className="text-xs text-blue-600">Campanhas</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="h-1 w-1 bg-transparent mb-1"></div>
                <span className="text-xs text-gray-400">Perfil</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DezembroVermelho;