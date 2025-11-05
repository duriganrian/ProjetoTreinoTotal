import './LoginAluno.css'; // Importa o arquivo CSS para estilizar o componente de login do aluno.
import Navegacao from '../../components/Navegacao/Navegacao'; // Importa o componente de navegação.
import FormAluno from '../../components/FormAluno/FormAluno'; // Importa o formulário de login do aluno.

function LoginAluno() {
    return (
        <>
            <Navegacao/>
            <FormAluno/>
        </>
    );
}

export default LoginAluno; // Exporta o componente para uso em outras partes da aplicação.
