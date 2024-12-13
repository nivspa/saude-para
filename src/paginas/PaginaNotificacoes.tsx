import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Heart,
  FileText,
  MessageSquare,
  AlertTriangle,
  MapPin,
  Search,
  Menu,
  Bell,
  ChevronRight,
  LogOut,
  Lock,
  Network,
  Home,
  Map,
  User,
  ChartSpline,
  BookType,
} from "lucide-react";

const PaginaNotificacoes: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState("inicio");

  // Função para lidar com o swipe
  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev === materiais.length - 1 ? 0 : prev + 1));
    }

    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev === 0 ? materiais.length - 1 : prev - 1));
    }
  };

  type Material = {
    title: string;
    desc: string;
    image: string;
    link: string;
  };

  const materiais: Material[] = [
    {
      title: "Campanha Dezembro Vermelho 2024",
      desc: "Conscientização e combate ao HIV/AIDS em todo o Pará",
      image: "/mnt/data/Dezembro Vermelho.png",
      link: "/campanha-dezembro-vermelho",
    },
    {
      title: "Campanha Novembro Azul 2024",
      desc: "Conscientização sobre a saúde do homem e prevenção ao câncer de próstata",
      image: "/mnt/data/Novembro Azul.png",
      link: "/campanha-novembro-azul",
    },
    {
      title: "Setembro Verde",
      desc: "Conscientização sobre a doação de órgãos no Pará",
      image: "/mnt/data/An_illustration_for_an_organ_donation_awareness_ca.png",
      link: "/setembro-verde",
    },
    {
      title: "Malária Zero",
      desc: "Campanha de prevenção à malária na região amazônica",
      image: "/mnt/data/An_illustration_for_a_malaria_prevention_campaign,.png",
      link: "/malaria-zero",
    },
    {
      title: "Amamentação",
      desc: "Incentivo ao aleitamento materno nas comunidades paraenses",
      image: "/mnt/data/An_illustration_for_a_breastfeeding_awareness_camp.png",
      link: "/amamentacao",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === materiais.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [materiais.length]);

  return (
    <div className="max-w-md mx-auto">
      <div className="border-8 border-gray-800 rounded-[2.5rem] overflow-hidden h-[720px] relative bg-gray-50">
        <div className="bg-gray-800 h-6 w-40 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>

        <div className="h-full relative">
          <div className="h-full overflow-y-auto pb-20">
            {/* Header */}
            <header className="bg-blue-600 p-4">
              <div className="flex justify-between items-center">
                <Menu
                  className="h-6 w-6 text-white cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
                <Bell className="h-6 w-6 text-white" />
              </div>

              {/* Imagens lado a lado */}
              <div className="flex justify-center items-center mt-4 space-x-0">
                <img
                  src="/mnt/data/Logo Topo Sespa.png"
                  alt="Parte 1"
                  className="h-10 w-auto"
                />
                <img
                  src="/mnt/data/Logo Topo Saude Para.png"
                  alt="Parte 2"
                  className="h-16 w-auto"
                />
                <img
                  src="/mnt/data/Logo Topo Bandeira.png"
                  alt="Parte 3"
                  className="h-8 w-auto"
                />
              </div>
              {/* Barra de busca */}
              <div className="bg-blue-500/40 rounded-full p-3 flex items-center mt-4">
                <Search className="h-5 w-5 text-white mr-2" />
                <input
                  placeholder="Buscar serviços"
                  className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
                />
              </div>
              {/* Carrossel */}
              <div className="mt-3 relative">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                    onTouchMove={(e) => setTouchEnd(e.touches[0].clientX)}
                    onTouchEnd={() => {
                      handleSwipe();
                      setTouchStart(null);
                      setTouchEnd(null);
                    }}
                  >
                    {materiais.map((material, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div
                          className="relative cursor-pointer transition-transform hover:scale-[0.98] active:scale-95"
                          onClick={() => navigate(material.link)}
                        >
                          <div className="relative pt-[45%]">
                            <img
                              src={material.image}
                              alt={material.title}
                              className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="font-medium text-white text-sm">
                                {material.title}
                              </h3>
                              <p className="text-xs text-white/90 mt-1 line-clamp-2">
                                {material.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-1">
                  {materiais.map((_, index) => (
                    <button
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        currentSlide === index ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </header>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 gap-4 p-4">
              <div
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer"
                onClick={() => navigate("/mapa")}
              >
                <Building2 className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-center">Locais</span>
              </div>
              <div
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer"
                onClick={() => navigate("/campanhas")}
              >
                <Heart className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-center">Campanhas de Saúde</span>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer">
                <FileText className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-center">
                  Materiais Educativos
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer">
                <MessageSquare className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-center">Fale Conosco</span>
              </div>
            </div>

            {/* Seção WhatsApp */}
            <div className="px-4">
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-green-600 fill-current"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-green-700 text-sm">Canal WhatsApp</span>
                </div>
                <p className="text-xs text-green-600 mt-2">
                  Receba informativos através do nosso canal SESPA
                </p>
              </div>

              {/* Lista de Locais */}
              <div className="space-y-2">
                {[
                  "UBS - Pedreira",
                  "Hospital Geral - Guamá",
                  "UPA - Sacramenta",
                ].map((unit, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-white rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{unit}</span>
                    </div>
                    <span className="text-xs text-blue-600">Ver no mapa</span>
                  </div>
                ))}
              </div>
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
              onClick={() =>
                (window.location.href =
                  "https://saude-cop30.saude.pa.gov.br/sec_Login/")
              }
            >
              <FileText className="w-6 h-6 text-white" />
            </button>
          </nav>

          {/* Menu Lateral */}
          <div
            className={`absolute inset-y-0 left-0 w-64 bg-blue-900 transform transition-transform duration-300 ease-in-out z-50 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <img
                  src="/mnt/data/lateral completo.png"
                  alt="Logo Saúde Pará"
                  className="bg-white rounded p-1"
                />
              </div>
              {[
                { icon: <FileText />, label: "Módulo Notificação", onClick: () => navigate('/pagina-departamento')},
                { icon: <ChartSpline />, label: "Dashboard", onClick: () => navigate('/dashboard')},
                { icon: <BookType />, label: "Módulo Materiais Informativos" },
                { icon: <Building2 />, label: "Apps Auxiliares" },
                { icon: <Lock />, label: "Segurança" },
                { icon: <Network />, label: "Versão" },
                { icon: <AlertTriangle />, label: "Relate um Bug" },
                { icon: <LogOut className="rotate-180" />, label: "Sair" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-white py-3 px-2 hover:bg-blue-800 rounded-lg cursor-pointer"
                  onClick={item.onClick}
                >
                  <span className="text-white">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-white ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Overlay do Menu */}
          {isMenuOpen && (
            <div
              className="absolute inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaNotificacoes;
