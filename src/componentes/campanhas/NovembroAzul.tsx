import React from "react";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NovembroAzul: React.FC = () => {
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
              <h1 className="text-white text-xl ml-4">Novembro Azul</h1>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="w-full h-48 flex items-center justify-center mb-4 bg-blue-100 rounded-lg">
              <img
                src="/mnt/data/Novembro Azul.png"
                alt="Campanha Novembro Azul 2024"
                className="h-full w-full object-contain p-2"
              />
            </div>

            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Te cuida, maninho! - Campanha Novembro Azul 2024
            </h2>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-700 text-justify">
                A Campanha Novembro Azul é uma iniciativa da Coordenação Estadual de Saúde do Homem 
                que tem como objetivo conscientizar os homens sobre a importância do autocuidado e da 
                prevenção de problemas de saúde, com especial atenção à saúde sexual e reprodutiva.
              </p>
              
              <p className="text-sm text-gray-700 text-justify">
                Diversos fatores podem afetar a saúde sexual masculina, incluindo doenças crônicas 
                (como hipertensão, diabetes e insuficiência renal), sedentarismo, má alimentação, 
                ansiedade, depressão e uso de álcool e cigarro. Por isso, é fundamental manter 
                hábitos saudáveis para uma vida sexual plena.
              </p>
              
              <p className="text-sm text-gray-700 text-justify">
                A campanha também destaca a importância do planejamento familiar e da prática do 
                sexo seguro. Os homens têm acesso gratuito a preservativos nas unidades de saúde 
                e podem buscar informações sobre métodos contraceptivos, incluindo a vasectomia, 
                um procedimento cirúrgico simples e eficaz.
              </p>

              <p className="text-sm text-gray-700 text-justify">
                Cuide da sua saúde! Procure uma unidade do SUS para realizar exames preventivos, 
                receber orientações e ter acesso a tratamentos quando necessário. Lembre-se: 
                cuidar da saúde é sinal de amor à vida!
              </p>
            </div>

            {/* Botão de Download */}
            <div className="space-y-3 mb-3">
              <button 
                className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                onClick={() => window.open('/mnt/data/Novembro Azul - Folder 1.pdf', 'https://drive.google.com/file/d/1qYfjWju9VDAsWmGFRtiuIdEJXaUrNYDr/view?usp=drive_link')}
              >
                <Download className="w-5 h-5" />
                <span>Baixar Folder 1 - Novembro Azul</span>
              </button>

              <button 
                className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                onClick={() => window.open('/mnt/data/Novembro Azul - Folder 2.pdf', 'https://drive.google.com/file/d/1rU_b50gY1NphYk4cwAN1HFfjoVstC_-L/view?usp=drive_link')}
              >
                <Download className="w-5 h-5" />
                <span>Baixar Folder 2 - Novembro Azul</span>
              </button>
            </div>
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

export default NovembroAzul;