import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapaLocais from './componentes/MapaLocais';
import PaginaNotificacoes from './paginas/PaginaNotificacoes';
import CampanhasDeSaude from './componentes/CampanhasDeSaude';
import PaginaDepartamento from './componentes/departamentos/PaginaDepartamento';
import DepartmentForm from './componentes/fichas/DepartmentForm';
import PaginaPerfil from './componentes/PaginaPerfil';
import Dashboard from './componentes/Dashboard';
import CampanhaVacinacaoCovid from './componentes/campanhas/CampanhaVacinacaoCovid';
import DezembroVermelho from './componentes/campanhas/DezembroVermelho';
import SetembroVerde from './componentes/campanhas/SetembroVerde';
import MalariaZero from './componentes/campanhas/MalariaZero';
import NovembroAzul from './componentes/campanhas/NovembroAzul'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaNotificacoes />} />
        <Route path="/notificacoes" element={<PaginaNotificacoes />} />
        <Route path="/mapa" element={<MapaLocais />} />
        <Route path="/campanhas" element={<CampanhasDeSaude />} />
        <Route path="/perfil" element={<PaginaPerfil />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pagina-departamento" element={<PaginaDepartamento />} />
        <Route path="/vigilancia-sanitaria" element={<DepartmentForm department="vigilancia-sanitaria" />} />
        <Route path="/acidentes" element={<DepartmentForm department="acidentes" />} />
        <Route path="/doencas-cronicas" element={<DepartmentForm department="doencas-cronicas" />} />
        <Route path="/saude-mental" element={<DepartmentForm department="saude-mental" />} />
        <Route path="/doencas-infecciosas" element={<DepartmentForm department="doencas-infecciosas" />} />
        <Route path="/zoonoses" element={<DepartmentForm department="zoonoses" />} />
        <Route path="/medicamentos" element={<DepartmentForm department="medicamentos" />} />
        <Route path="/materno-infantil" element={<DepartmentForm department="materno-infantil" />} />
        <Route path="/epidemiologia" element={<DepartmentForm department="epidemiologia" />} />
        <Route path="/campanha-vacinacao-covid" element={<CampanhaVacinacaoCovid />} />
        <Route path="/campanha-vacinacao-covid" element={<CampanhaVacinacaoCovid />} />
        <Route path="/campanha-dezembro-vermelho" element={<DezembroVermelho />} />
        <Route path="/setembro-verde" element={<SetembroVerde />} />
        <Route path="/malaria-zero" element={<MalariaZero />} />
        <Route path="/campanha-novembro-azul" element={<NovembroAzul />} />
      </Routes>
    </Router>
  );
}

export default App;