import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  FileText,
  Home,
  Map,
  User,
} from "lucide-react";


const CampanhasDeSaude: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("inicio");

  const campanhas = [
    {
      id: 1,
      titulo: "Campanha Dezembro Vermelho 2024",
      descricao: "Conscientização e combate ao HIV/AIDS em todo o Pará",
      imagem: "/mnt/data/Dezembro Vermelho.png",
      link: "/campanha-dezembro-vermelho"
    },
    {
        id: 2,
        titulo: "Campanha Novembro Azul 2024",
        descricao: "Conscientização sobre a saúde do homem e prevenção ao câncer de próstata",
        imagem: "/mnt/data/Novembro Azul.png",
        link: "/campanha-novembro-azul"
      },
    {
      id: 3,
      titulo: "Setembro Verde",
      descricao: "Conscientização sobre a doação de órgãos no Pará",
      imagem: "/mnt/data/An_illustration_for_an_organ_donation_awareness_ca.png",
      link: "/setembro-verde"
    },
    {
      id: 4,
      titulo: "Malária Zero",
      descricao: "Campanha de prevenção à malária na região amazônica",
      imagem: "/mnt/data/An_illustration_for_a_malaria_prevention_campaign,.png",
      link: "/malaria-zero"
    },
    {
      id: 5,
      titulo: "Amamentação",
      descricao: "Incentivo ao aleitamento materno nas comunidades paraenses",
      imagem: "/mnt/data/An_illustration_for_a_breastfeeding_awareness_camp.png",
      link: "/amamentacao"
    }
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="border-8 border-gray-800 rounded-[2.5rem] overflow-hidden h-[720px] relative bg-gray-50">
        <div className="bg-gray-800 h-6 w-40 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>

        <div className="h-full flex flex-col">
          {/* Header */}
          <header className="bg-blue-600 p-4">
            <div className="flex items-center mb-4">
              <ArrowLeft 
                className="h-6 w-6 text-white cursor-pointer" 
                onClick={() => navigate(-1)}
              />
              <h1 className="text-white text-xl ml-4">Campanhas de Saúde</h1>
            </div>
          </header>

          {/* Lista de Campanhas */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {campanhas.map((campanha) => (
                <div
                  key={campanha.id}
                  className="flex bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md cursor-pointer"
                  onClick={() => navigate(campanha.link)}
                >
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={campanha.imagem}
                      alt={campanha.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/80/80";
                      }}
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{campanha.titulo}</h3>
                    <p className="text-xs text-gray-600 mt-1">{campanha.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navegação Inferior */}
          <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
            <div className="flex items-center h-16 relative px-2">
              {" "}
              {/* Reduzido padding horizontal */}
              <div className="flex-1 flex justify-around items-center">
                {" "}
                {/* Container para os dois botões da esquerda */}
                <button
                  className="flex flex-col items-center"
                  onClick={() => {
                    setCurrentTab("inicio");
                    navigate("/");
                  }}
                >
                  <Home
                    className={`w-6 h-6 ${currentTab === "inicio" ? "text-blue-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-xs ${currentTab === "inicio" ? "text-blue-600" : "text-gray-400"}`}
                  >
                    Início
                  </span>
                </button>
                <button
                  className="flex flex-col items-center"
                  onClick={() => {
                    setCurrentTab("mapa");
                    navigate("/mapa");
                  }}
                >
                  <Map
                    className={`w-6 h-6 ${currentTab === "mapa" ? "text-blue-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-xs ${currentTab === "mapa" ? "text-blue-600" : "text-gray-400"}`}
                  >
                    Mapa
                  </span>
                </button>
              </div>
              {/* Espaço central reduzido */}
              <div className="w-12"></div>
              <div className="flex-1 flex justify-around items-center">
                {" "}
                {/* Container para os dois botões da direita */}
                <button
                  className="flex flex-col items-center"
                  onClick={() => {
                    setCurrentTab("campanhas");
                    navigate("/campanhas");
                  }}
                >
                  <Heart
                    className={`w-6 h-6 ${currentTab === "campanhas" ? "text-blue-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-xs ${currentTab === "campanhas" ? "text-blue-600" : "text-gray-400"}`}
                  >
                    Campanhas
                  </span>
                </button>
                <button
                  className="flex flex-col items-center"
                  onClick={() => {
                    setCurrentTab("perfil");
                    navigate("/perfil");
                  }}
                >
                  <User
                    className={`w-6 h-6 ${currentTab === "perfil" ? "text-blue-600" : "text-gray-400"}`}
                  />
                  <span
                    className={`text-xs ${currentTab === "perfil" ? "text-blue-600" : "text-gray-400"}`}
                  >
                    Perfil
                  </span>
                </button>
              </div>
            </div>

            {/* Botão FAB */}
            <button
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
              onClick={() => navigate("/materiais")}
            >
              <FileText className="w-6 h-6 text-white" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CampanhasDeSaude;



