import './ListagemAparelho.css' // Importa o arquivo CSS para estilizar a lista de aparelhos.
import ListaAparelho from '../../components/ListaAparelho/ListaAparelho'; // Importa o componente que lista os aparelhos.

function ListagemAparelho() {
    return (
        <>
            <div>
                <h1 className={style.header}>Lista de Aparelho</h1>
                <ListaAparelho/>
            </div>
        </>
    );
}

export default ListagemAparelho; // Exporta o componente para uso em outras partes da aplicação.
