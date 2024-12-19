import {
  ShieldAlert,
  Siren,
  Stethoscope,
  Brain,
  Bug,
  Bird,
  Pill,
  Heart,
  Activity,
} from "lucide-react";
import { useTranslation } from "../../i18n/useTranslations";
import { useLanguage } from '../../contexts/LanguageContext';
import { TranslationRecord } from "../../i18n/types";

const PaginaDepartamento = () => {
  const { selectedLanguage } = useLanguage();
  const { t } = useTranslation(selectedLanguage);

  const departments: Array<{
    icon: JSX.Element;
    name: keyof Pick<TranslationRecord, 
      | "department.health-surveillance"
      | "department.accidents"
      | "department.chronic"
      | "department.mental-health"
      | "department.infectious"
      | "department.zoonoses"
      | "department.medications"
      | "department.maternal"
      | "department.epidemiology">;
    link: string;
  }> = [
    {
      icon: <ShieldAlert className="h-6 w-6 text-white" />,
      name: "department.health-surveillance",
      link: "/vigilancia-sanitaria",
    },
    {
      icon: <Siren className="h-6 w-6 text-white" />,
      name: "department.accidents",
      link: "/acidentes",
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-white" />,
      name: "department.chronic",
      link: "/doencas-cronicas",
    },
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      name: "department.mental-health",
      link: "/saude-mental",
    },
    {
      icon: <Bug className="h-6 w-6 text-white" />,
      name: "department.infectious",
      link: "/doencas-infecciosas",
    },
    {
      icon: <Bird className="h-6 w-6 text-white" />,
      name: "department.zoonoses",
      link: "/zoonoses",
    },
    {
      icon: <Pill className="h-6 w-6 text-white" />,
      name: "department.medications",
      link: "/medicamentos",
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      name: "department.maternal",
      link: "/materno-infantil",
    },
    {
      icon: <Activity className="h-6 w-6 text-white" />,
      name: "department.epidemiology",
      link: "/epidemiologia",
    },
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="border-8 border-gray-800 rounded-[2.5rem] overflow-hidden h-[720px] relative bg-gray-50">
        <div className="bg-gray-800 h-6 w-40 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
        
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <header className="bg-blue-600 p-4 sticky top-0 z-10">
            <div className="flex items-center gap-3 text-white">
              <button
                onClick={() => window.history.back()}
                className="p-1.5 hover:bg-blue-700 rounded-lg"
              >
                ←
              </button>
              <h1 className="text-lg font-semibold">{t("department.title")}</h1>
            </div>
          </header>

          {/* Grid de Departamentos */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  onClick={() => (window.location.href = dept.link)}
                  className="bg-blue-600 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors active:scale-95"
                >
                  {dept.icon}
                  <span className="text-white text-center text-xs font-medium">
                    {t(dept.name)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaDepartamento;