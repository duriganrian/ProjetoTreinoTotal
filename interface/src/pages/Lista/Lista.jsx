import './Lista.css'; // Importa um arquivo CSS para estilizar o componente.
import Rodape from '../../components/Rodape/Rodape'; // Importa o componente de rodapé.
import ListaAluno from '../../components/ListaAluno/ListaAluno'; // Importa o componente que lista alunos.
import Navegacao from '../../components/Navegacao/Navegacao'; // Importa o componente de navegação.

function Maquina() {
    return (
        <>
            <Navegacao/> 
            <ListaAluno/> 
            <h1 className='nada'>NADA AQUI AINDA</h1>
            <Rodape/> 
        </>
    );
}

export default Maquina; // Exporta o componente Maquina para uso em outras partes da aplicação.
