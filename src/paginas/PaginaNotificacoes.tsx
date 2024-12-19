import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslations";
import { Language } from "../i18n/types";
import { campaignTranslations } from "../i18n/campaigns";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Building2,
  Heart,
  FileText,
  MessageSquare,
  AlertTriangle,
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
  Syringe,
  Utensils,
  Trees,
  Building,
  BriefcaseMedical,
  Hospital,
  Globe,
  ChevronDown,
} from "lucide-react";

interface Material {
  id: string;
  title: string;
  desc: string;
  image: string;
  link: string;
}

const PaginaNotificacoes: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState("inicio");
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const { t } = useTranslation(selectedLanguage);

  const materiais: Material[] = [
    {
      id: "dezembro-vermelho",
      title: "", // será preenchido dinamicamente
      desc: "", // será preenchido dinamicamente
      image: "/mnt/data/Dezembro Vermelho.png",
      link: "/campanha-dezembro-vermelho",
    },
    {
      id: "novembro-azul",
      title: "", // será preenchido dinamicamente
      desc: "", // será preenchido dinamicamente
      image: "/mnt/data/Novembro Azul.png",
      link: "/campanha-novembro-azul",
    },
    {
      id: "setembro-verde",
      title: "", // será preenchido dinamicamente
      desc: "", // será preenchido dinamicamente
      image: "/mnt/data/An_illustration_for_an_organ_donation_awareness_ca.png",
      link: "/setembro-verde",
    },
    {
      id: "malaria-zero",
      title: "", // será preenchido dinamicamente
      desc: "", // será preenchido dinamicamente
      image: "/mnt/data/An_illustration_for_a_malaria_prevention_campaign,.png",
      link: "/malaria-zero",
    },
    {
      id: "amamentacao",
      title: "", // será preenchido dinamicamente
      desc: "", // será preenchido dinamicamente
      image: "/mnt/data/An_illustration_for_a_breastfeeding_awareness_camp.png",
      link: "/amamentacao",
    },
  ];

  const getLocalizedMaterials = useCallback(() => {
    return materiais.map((material) => ({
      ...material,
      title:
        campaignTranslations?.[selectedLanguage]?.[material.id]?.title ??
        material.title,
      desc:
        campaignTranslations?.[selectedLanguage]?.[material.id]?.desc ??
        material.desc,
    }));
  }, [selectedLanguage]);

  const localizedMaterials = getLocalizedMaterials();

  const languages = [
    {
      code: "pt-BR" as Language,
      name: "Português",
      flag: "https://flagcdn.com/br.svg",
      fullName: "Português (Brasil)",
    },
    {
      code: "en" as Language,
      name: "English",
      flag: "https://flagcdn.com/us.svg",
      fullName: "English (US)",
    },
    {
      code: "es" as Language,
      name: "Español",
      flag: "https://flagcdn.com/es.svg",
      fullName: "Español",
    },
    {
      code: "zh" as Language,
      name: "中文",
      flag: "https://flagcdn.com/cn.svg",
      fullName: "中文 (简体)",
    },
    {
      code: "fr" as Language,
      name: "Français",
      flag: "https://flagcdn.com/fr.svg",
      fullName: "Français",
    },
  ] as const;

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

  const pontosPrincipais = [
    {
      nome: "vaccination", // chave para tradução
      icone: <Syringe className="h-8 w-8 text-white" />,
      link: "/mapa?tipo=vacinacao",
    },
    {
      nome: "food",
      icone: <Utensils className="h-8 w-8 text-white" />,
      link: "/mapa?tipo=alimentacao",
    },
    {
      nome: "parks",
      icone: <Trees className="h-8 w-8 text-white" />,
      link: "/mapa?tipo=lazer",
    },
    {
      nome: "cultural",
      icone: <Building className="h-8 w-8 text-white" />,
      link: "/mapa?tipo=cultura",
    },
    {
      nome: "health",
      icone: <BriefcaseMedical className="h-8 w-8 text-white" />,
      link: "/mapa?tipo=saude",
    },
    {
      nome: "hospitals",
      icone: <Hospital className="h-8 w-8 text-white" />,
      link: "/mapa?tipo=hospitais",
    },
  ] as const;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === materiais.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [materiais.length]);

  // Fecha o dropdown de idiomas quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-dropdown")) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

              {/* Logos */}
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
                  placeholder={t("search.placeholder")}
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
                    {localizedMaterials.map((material, index) => (
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
                <span className="text-sm text-center">
                  {t("menu.locations")}
                </span>
              </div>
              <div
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer"
                onClick={() => navigate("/campanhas")}
              >
                <Heart className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-center">
                  {t("menu.campaigns")}
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer">
                <FileText className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-center">
                  {t("menu.materials")}
                </span>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer">
                <MessageSquare className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-center">
                  {t("menu.whatsapp")}
                </span>
              </div>
            </div>

            {/* Seção de Pontos de Interesse */}
            <div className="px-4 mb-6">
              <h2 className="text-lg font-semibold mb-4 text-center">
                {t("section.locate")}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {pontosPrincipais.map((ponto, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => navigate(ponto.link)}
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-2 hover:bg-blue-700 transition-colors">
                      {ponto.icone}
                    </div>
                    <span className="text-xs text-center font-medium">
                      {t(`points.${ponto.nome}`)}
                    </span>
                    <p className="text-xs text-center text-gray-500 mt-1">
                      {t(`points.${ponto.nome}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Navegação Inferior */}
          Ah sim! Precisamos traduzir também os botões da navegação inferior.
          Como as traduções já existem no arquivo translations.ts, basta
          substituir os textos fixos por chamadas à função de tradução t():
          typescriptCopy{/* Navegação Inferior */}
          <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
            <div className="flex items-center h-16 relative px-2">
              <div className="flex-1 flex justify-around items-center">
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
                    {t("nav.home")}
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
                    {t("nav.map")}
                  </span>
                </button>
              </div>
              <div className="w-12"></div>
              <div className="flex-1 flex justify-around items-center">
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
                    {t("nav.campaigns")}
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
                    {t("nav.profile")}
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
            <div className="p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <img
                  src="/mnt/data/lateral completo.png"
                  alt="Logo Saúde Pará"
                  className="bg-white rounded p-1"
                />
              </div>

              {/* Itens do Menu */}
              <div className="flex-grow">
                {[
                  {
                    icon: <FileText />,
                    label: t("menu.notification"),
                    onClick: () => navigate("/pagina-departamento"),
                  },
                  {
                    icon: <ChartSpline />,
                    label: t("menu.dashboard"),
                    onClick: () => navigate("/dashboard"),
                  },
                  {
                    icon: <BookType />,
                    label: t("menu.educational"),
                  },
                  {
                    icon: <Building2 />,
                    label: t("menu.apps"),
                  },
                  {
                    icon: <Lock />,
                    label: t("menu.security"),
                  },
                  {
                    icon: <Network />,
                    label: t("menu.version"),
                  },
                  {
                    icon: <AlertTriangle />,
                    label: t("menu.bug"),
                  },
                  {
                    icon: <LogOut className="rotate-180" />,
                    label: t("menu.logout"),
                  },
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

              {/* Seletor de Idiomas */}
              <div className="mt-auto border-t border-blue-800 pt-4">
                <div className="relative language-dropdown">
                  <div className="flex items-center gap-2 text-white/90 mb-2 px-2">
                    <Globe className="h-5 w-5" />
                    <span className="text-sm">Selecionar idioma</span>
                  </div>

                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="w-full flex items-center justify-between bg-blue-800/50 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          languages.find(
                            (lang) => lang.code === selectedLanguage
                          )?.flag
                        }
                        alt="Bandeira"
                        className="w-5 h-4 object-cover rounded-sm"
                      />
                      <span className="text-sm">
                        {
                          languages.find(
                            (lang) => lang.code === selectedLanguage
                          )?.fullName
                        }
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isLanguageOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Lista suspensa de idiomas */}
                  {isLanguageOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-blue-900 rounded-lg overflow-hidden shadow-lg border border-blue-800">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code as Language);
                            setIsLanguageOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                            selectedLanguage === lang.code
                              ? "bg-blue-600 text-white"
                              : "text-white/90 hover:bg-blue-800"
                          }`}
                        >
                          <img
                            src={lang.flag}
                            alt={`Bandeira ${lang.name}`}
                            className="w-5 h-4 object-cover rounded-sm"
                          />
                          <span>{lang.fullName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
