import Assinatura from './pages/Assinatura/Assinatura';
import Treinos from './pages/Treinos/Treinos';
import Assistencia from './pages/Assistencia/Assistencia';
import Home from './pages/Home/Home';
import LoginAluno from './pages/LoginAluno/LoginAluno';
import LoginAparelho from './pages/LoginAparelho/LoginAparelho';
import LoginProfessor from './pages/LoginProfessor/LoginProfessor';
import LoginExercicio from './components/FormExercicio/FormExercicio';
import FormAparelho from './components/FormAparelho/FormAparelho';
import Lista from './pages/Lista/Lista';
import ListaAluno from './components/ListaAluno/ListaAluno';
import ListaProfessor from './components/ListaProfessor/ListaProfessor';
import ListaAparelho from './components/ListaAparelho/ListaAparelho';
import ListaExercicio from './components/ListaExercicio/ListaExercicio';
import FichaTreino from './pages/FichaTreino/FichaTreino';
import UpdateAluno from './update/updateAluno';
import UpdateAparelho from './update/updateAparelho';
import UpdateProfessor from './update/updateProfessor';
import UpdateExercicio from './update/updateExercicio';
import AtualizarSenhaProfessor from './components/Atualizar/AtualizarSenhaProfessor';
import { BrowserRouter as Roteador, Routes, Route } from 'react-router-dom';
import PaginaLogin from './pages/Login/Login';
import CadastroTreino from './pages/CriarTreino/CriarTreino';
import { ROUTES } from './appconfig';
import CriarTreino from './pages/CriarTreino/CriarTreino';

function AppRouter() {
  return (
    <>
      <Roteador>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/Home' Component={Home} />
          <Route exact path='/assinatura' Component={Assinatura} />
          <Route exact path='/assistencia' Component={Assistencia} />
          <Route exact path='/loginexercicio' Component={LoginExercicio} />
          <Route exact path='/formaparelho' Component={FormAparelho} />
          <Route exact path='/lista' Component={Lista} />
          <Route exact path='/listaaluno' Component={ListaAluno} />
          <Route exact path='/ListaAparelho' Component={ListaAparelho} />
          <Route exact path='/LoginAparelho' Component={LoginAparelho} />
          <Route exact path='/ListaExercicio' Component={ListaExercicio} />
          <Route exact path='/listaprofessor' Component={ListaProfessor} />
          <Route exact path='/loginaluno' Component={LoginAluno} />
          <Route exact path='/loginprofessor' Component={LoginProfessor} />
          <Route exact path='/treinos' Component={Treinos} />
          <Route exact path='/atualizarAluno' element={<UpdateAluno />} />
          <Route exact path='/atualizarAparelho' element={<UpdateAparelho />} />
          <Route exate path='/atualizarProfessor' element={<UpdateProfessor />} />
          <Route exate path='/atualizarExercicio' element={< UpdateExercicio />} />
          <Route exact path='/login' element={<PaginaLogin />} />
          <Route path='/CadastroTreino' element={ <CadastroTreino />} />
          <Route path={ROUTES.CRIAR_TREINO} element={<CriarTreino/>}/>
          <Route path='/FichaTreino' element={ <FichaTreino />} />
          <Route path='/atualizar/senha/professor' element={<AtualizarSenhaProfessor />} />
        </Routes>
      </Roteador>
    </>
  );
}


export default AppRouter;

