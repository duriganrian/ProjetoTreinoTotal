import './LoginProfessor.css'; // Importa o arquivo CSS para estilizar o componente de login do professor.
import Navegacao from '../../components/Navegacao/Navegacao'; // Importa o componente de navegação.
import FormProfessor from '../../components/FormProfessor/FormProfessor'; // Importa o formulário de login do professor.

function LoginProfessor() {
    return (
        <>
            <FormProfessor />
        </>
    );
}

export default LoginProfessor; // Exporta o componente para uso em outras partes da aplicação.
