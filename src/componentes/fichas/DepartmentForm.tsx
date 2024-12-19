import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

// Definindo tipos para as props do FormField
interface FormFieldProps {
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  name?: string;
  [key: string]: any;
}

// Componente base do formulário que será reutilizado
const FormField: React.FC<FormFieldProps> = ({ label, type = "text", required = false, options = [], name, ...props }) => {
  if (type === "select") {
    return (
      <div className="mb-4">
        <label className="block text-sm mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select 
          className="w-full p-2 border rounded-lg text-sm" 
          required={required}
          {...props}
        >
          <option value="">Selecione</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="w-4 h-4" {...props} />
          {label}
        </label>
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div className="mb-4">
        <span className="block text-sm mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        <div className="flex flex-wrap gap-4">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input type="radio" value={opt} name={name} className="w-4 h-4" required={required} {...props} />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label className="block text-sm mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea 
          className="w-full p-2 border rounded-lg text-sm min-h-[100px]"
          required={required}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type={type}
        className="w-full p-2 border rounded-lg text-sm"
        required={required}
        {...props}
      />
    </div>
  );
};

// Formulários específicos para cada departamento
const VigilanciaSanitariaForm: React.FC = () => (
  <div>
    <FormField label="Data da Ocorrência" type="date" required />
    <FormField label="Estabelecimento" required />
    <FormField label="Tipo de Inspeção" type="select" required options={[
      "Rotina",
      "Denúncia",
      "Reinspeção"
    ]} />
    <FormField label="Responsável Técnico" required />
    <FormField label="Irregularidades Encontradas" type="checkbox" />
    <FormField label="Descrição das Irregularidades" type="textarea" />
    <FormField label="Medidas Adotadas" type="select" required options={[
      "Advertência",
      "Multa",
      "Interdição",
      "Apreensão"
    ]} />
  </div>
);

const AcidentesForm: React.FC = () => (
  <div>
    <FormField label="Data da Ocorrência" type="date" required />
    <FormField label="Tipo de Acidente" type="select" required options={[
      "Trabalho",
      "Trânsito",
      "Doméstico"
    ]} />
    <FormField label="Gravidade" type="select" required options={[
      "Leve",
      "Moderado",
      "Grave"
    ]} />
    <FormField label="Local do Acidente" required />
    <FormField label="Data e Hora" type="datetime-local" required />
    <FormField label="Vítimas Fatais" type="number" />
    <FormField label="Necessidade de Resgate" type="checkbox" />
  </div>
);

const DoencasCronicasForm: React.FC = () => (
  <div>
    <FormField label="Data da Ocorrência" type="date" required />
    <FormField label="Doença" type="select" required options={[
      "Diabetes",
      "Hipertensão",
      "Obesidade",
      "Asma"
    ]} />
    <FormField label="Tempo de Diagnóstico" required />
    <FormField label="Medicamentos em Uso" />
    <FormField label="Comorbidades" type="checkbox" />
    <FormField label="Última Consulta" type="date" />
    <FormField label="Exames Realizados" type="checkbox" />
  </div>
);

const SaudeMentalForm: React.FC = () => (
  <div>
    <FormField label="Data da Ocorrência" type="date" required />
    <FormField label="Tipo de Atendimento" type="select" required options={[
      "Primeira Consulta",
      "Retorno",
      "Urgência"
    ]} />
    <FormField label="Condição" type="select" required options={[
      "Depressão",
      "Ansiedade",
      "Transtorno Bipolar",
      "Esquizofrenia"
    ]} />
    <FormField label="Medicação Prescrita" />
    <FormField label="Necessidade de Internação" type="checkbox" />
    <FormField label="Risco de Suicídio" type="checkbox" />
  </div>
);

const DoencasInfecciosasForm: React.FC = () => (
  <div>
    <FormField label="Data da Ocorrência" type="date" required />
    <FormField label="Doença Suspeita" type="select" required options={[
      "COVID-19",
      "Dengue",
      "Tuberculose",
      "Hepatite"
    ]} />
    <FormField label="Data Primeiros Sintomas" type="date" required />
    <FormField label="Contatos Próximos" type="number" />
    <FormField label="Necessidade de Isolamento" type="checkbox" />
    <FormField label="Exames Solicitados" type="checkbox" />
  </div>
);

const ZoonosesForm: React.FC = () => (
  <div>
    <FormField label="Data da Ocorrência" type="date" required />
    <FormField label="Tipo de Ocorrência" type="select" required options={[
      "Mordedura Animal",
      "Caso Suspeito de Raiva",
      "Leishmaniose",
      "Leptospirose"
    ]} />
    <FormField label="Animal Envolvido" type="select" options={[
      "Cão",
      "Gato",
      "Morcego",
      "Outro"
    ]} />
    <FormField label="Local da Ocorrência" required />
    <FormField label="Necessidade de Vacinação" type="checkbox" />
  </div>
);

const MedicamentosForm: React.FC = () => (
  <div>
    <FormField label="Data da Ocorrência" type="date" required />
    <FormField label="Medicamento" required />
    <FormField label="Classificação" type="select" required options={[
      "Controlado",
      "Antibiótico",
      "Comum"
    ]} />
    <FormField label="Quantidade" type="number" required />
    <FormField label="Lote" required />
    <FormField label="Data de Validade" type="date" required />
    <FormField label="Reação Adversa" type="checkbox" />
  </div>
);

const MaternoInfantilForm: React.FC = () => (
  <div>
    <FormField label="Data da Ocorrência" type="date" required />
    <FormField label="Tipo de Atendimento" type="select" required options={[
      "Pré-natal",
      "Parto",
      "Puericultura",
      "Vacinação"
    ]} />
    <FormField label="Idade Gestacional" type="number" />
    <FormField label="Peso" type="number" />
    <FormField label="Altura" type="number" />
    <FormField label="Vacinas em Dia" type="checkbox" />
    <FormField label="Aleitamento Materno" type="checkbox" />
  </div>
);

// Formulário de Epidemiologia modificado com radios
const EpidemiologiaForm: React.FC = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    estabelecimento: false,
    paciente: false,
    clinicas: false,
    manejo: false,
    agravo: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader: React.FC<{title: string, section: string}> = ({ title, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-2 text-left"
    >
      <span className="font-semibold text-sm">{title}</span>
      {openSections[section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  return (
    <div>
      {/* Sistema Regular ou Atuação complementar na COP */}
      <FormField 
        label="Selecione o sistema" 
        type="radio" 
        name="sistema"
        options={[
          "Faz parte do Sistema Regular",
          "Atuação complementar na COP"
        ]}
      />

      {/* ESTABELECIMENTO */}
      <div className="mb-4 border rounded-lg p-2">
        <SectionHeader 
          title="INFORMAÇÕES SOBRE O ESTABELECIMENTO" 
          section="estabelecimento" 
        />
        {openSections.estabelecimento && (
          <div className="p-3 border-t">
            <h3 className="text-sm font-medium mb-2">Identificação/Localização</h3>
            <FormField label="Nome Completo" type="text" />
            <FormField label="Município" type="text" />
            <FormField label="Endereço" type="text" />

            <h3 className="text-sm font-medium mt-4 mb-2">Caracterização</h3>
            {/* Agora usando radios ao invés de vários checkboxes */}
            <FormField 
              label="Selecione a caracterização" 
              type="radio" 
              name="caracterizacao" 
              options={[
                "Média e alta complexidade referencial regional",
                "Média e alta complexidade municipal",
                "Unidade de Pronto Atendimento (UPA)",
                "Unidade de Referência",
                "Unidade de Atenção Primária"
              ]}
            />

            <h3 className="text-sm font-medium mt-4 mb-2">Gestão</h3>
            {/* Mesma mudança para Gestão */}
            <FormField 
              label="Tipo de Gestão" 
              type="radio" 
              name="gestao" 
              options={[
                "Pública",
                "Gerência Municipal",
                "Gerência Estadual",
                "Privada"
              ]}
            />
          </div>
        )}
      </div>

      {/* PACIENTE */}
      <div className="mb-4 border rounded-lg p-2">
        <SectionHeader 
          title="IDENTIFICAÇÃO DO PACIENTE SUSPEITO" 
          section="paciente" 
        />
        {openSections.paciente && (
          <div className="p-3 border-t">
            <FormField label="Nome" type="text" />
            <FormField label="Idade" type="text" />
            {/* Antes era select, agora radio */}
            <FormField 
              label="Sexo" 
              type="radio" 
              name="sexo"
              options={["Masculino", "Feminino"]} 
            />
            <FormField label="Estado" type="text" />
            <FormField label="Endereço" type="text" />
            <FormField 
              label="Procedência de lugar diferente do estado atual" 
              type="radio"
              name="procedencia"
              options={["Sim", "Não"]} 
            />
          </div>
        )}
      </div>

      {/* INFORMAÇÕES CLÍNICAS */}
      <div className="mb-4 border rounded-lg p-2">
        <SectionHeader 
          title="INFORMAÇÕES CLÍNICAS" 
          section="clinicas" 
        />
        {openSections.clinicas && (
          <div className="p-3 border-t">
            <FormField label="Data do atendimento" type="date" />
            <FormField 
              label="Sinais clínicos relatados (Utilizar números relativos às manifestações)" 
              type="textarea" 
            />
            <FormField label="Agravo suspeito" type="text" />
          </div>
        )}
      </div>

      {/* MANEJO CLÍNICO */}
      <div className="mb-4 border rounded-lg p-2">
        <SectionHeader 
          title="MANEJO CLÍNICO E EVOLUÇÃO" 
          section="manejo" 
        />
        {openSections.manejo && (
          <div className="p-3 border-t">
            <FormField 
              label="Terapêutica proposta em nível da Atenção Primária" 
              type="textarea" 
            />
            <FormField 
              label="Terapêutica proposta em nível de Atenção de Média e Alta Complexidade" 
              type="textarea" 
            />
            {/* Antes era um select, agora radio */}
            <FormField 
              label="Quanto à evolução clínica"
              type="radio" 
              name="evolucao_clinica"
              options={["Curado", "Óbito"]} 
            />
            <FormField label="Data" type="date" />
          </div>
        )}
      </div>

      {/* AGRAVO */}
      <div className="mb-4 border rounded-lg p-2">
        <SectionHeader 
          title="EM CASO DE DIAGNÓSTICO SUSPEITO DE AGRAVO TRANSMISSÍVEL (DNC)" 
          section="agravo" 
        />
        {openSections.agravo && (
          <div className="p-3 border-t">
            <FormField 
              label="Notificação à Vigilância Epidemiológica" 
              type="checkbox" 
            />
            <FormField 
              label="Data e hora da informação" 
              type="datetime-local" 
            />
            <FormField 
              label="Níveis de Vigilância Informados (Seleção Múltipla)" 
              type="select" 
              multiple 
              options={[
                "Hospitalar",
                "Municipal",
                "Estadual",
                "Ministério da Saúde"
              ]} 
            />
            <h3 className="text-sm font-medium mt-4 mb-2">Investigação</h3>
            <FormField label="Investigação laboratorial" type="checkbox" />
            <FormField label="Exame específico solicitado" type="text" />
            <FormField label="Material coletado" type="text" />
            <FormField label="Data da coleta" type="date" />
            <FormField 
              label="Unidade laboratorial que foi encaminhada a amostra" 
              type="text" 
            />
            <FormField 
              label="Data da chegada da amostra na Unidade laboratorial" 
              type="date" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Definindo tipos para as props do DepartmentForm
interface DepartmentFormProps {
  department: string;
}

// Componente principal que renderiza o formulário apropriado
const DepartmentForm: React.FC<DepartmentFormProps> = ({ department }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getForm = () => {
    switch (department) {
      case 'vigilancia-sanitaria':
        return <VigilanciaSanitariaForm />;
      case 'acidentes':
        return <AcidentesForm />;
      case 'doencas-cronicas':
        return <DoencasCronicasForm />;
      case 'saude-mental':
        return <SaudeMentalForm />;
      case 'doencas-infecciosas':
        return <DoencasInfecciosasForm />;
      case 'zoonoses':
        return <ZoonosesForm />;
      case 'medicamentos':
        return <MedicamentosForm />;
      case 'materno-infantil':
        return <MaternoInfantilForm />;
      case 'epidemiologia':
        return <EpidemiologiaForm />;
      default:
        return <div>Formulário não encontrado</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="border-8 border-gray-800 rounded-[2.5rem] overflow-hidden h-[720px] relative bg-gray-50">
        <div className="bg-gray-800 h-6 w-40 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
        
        <div className="h-full overflow-y-auto">
          <header className="bg-blue-600 p-4 sticky top-0 z-10">
            <div className="flex items-center gap-3 text-white">
              <button
                onClick={() => window.history.back()}
                className="p-1.5 hover:bg-blue-700 rounded-lg"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-semibold">Nova Notificação</h1>
            </div>
          </header>

          <div className="p-4">
            {submitted ? (
              <div className="bg-green-100 p-4 rounded-lg text-green-700 mb-4">
                Notificação enviada com sucesso!
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {getForm()}
                <div className="flex gap-2 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Salvar Notificação
                  </button>
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;