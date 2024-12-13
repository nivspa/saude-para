import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Definindo tipos para as props do FormField
interface FormFieldProps {
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  [key: string]: any; // Para permitir outras props adicionais
}

// Componente base do formulário que será reutilizado
const FormField: React.FC<FormFieldProps> = ({ label, type = "text", required = false, options = [], ...props }) => {
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
          <input type="checkbox" {...props} />
          {label}
        </label>
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

// Definindo tipos para as props do DepartmentForm
interface DepartmentFormProps {
  department: string;
}

// Formulários específicos para cada departamento
const VigilanciaSanitariaForm: React.FC = () => (
  <div>
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

const EpidemiologiaForm: React.FC = () => (
  <div>
    <FormField label="Agravo Notificado" type="select" required options={[
      "Surto",
      "Epidemia",
      "Caso Isolado"
    ]} />
    <FormField label="Doença/Condição" required />
    <FormField label="Data da Notificação" type="date" required />
    <FormField label="Número de Casos" type="number" required />
    <FormField label="Área Afetada" required />
    <FormField label="Medidas de Controle" type="checkbox" />
  </div>
);

// Componente principal que renderiza o formulário apropriado
const DepartmentForm: React.FC<DepartmentFormProps> = ({ department }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // Aqui você implementaria a lógica de envio do formulário
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
                <FormField 
                  label="Data da Ocorrência" 
                  type="date" 
                  required 
                />
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