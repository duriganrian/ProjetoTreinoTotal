// Importação do arquivo de estilo CSS e dos componentes Navegacao e Rodape
import './Assistencia.css';
import Navegacao from '../../components/Navegacao/Navegacao';
import Rodape from '../../components/Rodape/Rodape';
import Acompanhamento from '../../components/Acompanhamento/Acompanhamento';

// Definição do componente Acompanhamento
function Assistencia() {
    // Retorna um fragmento de elementos JSX
    return (
        <>
            <Navegacao />
            <Acompanhamento />
            <h1 className='nada'>NADA AQUI AINDA</h1>
            <Rodape />
        </>
    );
}

// Exporta o componente Acompanhamento para uso em outros locais
export default Assistencia;