import './LoginAparelho.css'; // Importa o arquivo CSS para estilizar o componente de login do aparelho.
import Navegacao from '../../components/Navegacao/Navegacao'; // Importa o componente de navegação.
import FormAparelho from '../../components/FormAparelho/FormAparelho'; // Importa o formulário de login do aparelho.

function Maquina() {
    return (
        <>
            <Navegacao />
            <FormAparelho />
        </>
    );
}

export default Maquina; // Exporta o componente para uso em outras partes da aplicação.
