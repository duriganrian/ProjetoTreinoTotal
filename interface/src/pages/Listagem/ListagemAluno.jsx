import './ListagemAluno.css' // Importa um arquivo CSS para estilizar o componente.
import NavBar from "../../components/NavBar/NavBar"; // Importa o componente de navegação.
import ListaAluno from "../../components/ListaAluno/ListaAluno"; // Importa o componente que lista alunos.

function ListagemAluno() {
    return (
        <>
            <NavBar /> 
            <div>
                <h1 className={style.header}>Lista de Alunos</h1> 
                <ListaAluno/>
            </div>
        </>
    );
}

export default ListagemAluno; // Exporta o componente ListagemAluno para uso em outras partes da aplicação.
