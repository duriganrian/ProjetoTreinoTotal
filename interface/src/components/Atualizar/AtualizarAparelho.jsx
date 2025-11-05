import './AtualizarAparelho.css'; // Importa o CSS específico para a página de atualização de aparelho
import { useState } from 'react'; // Importa useState para gerenciar estados
import { useLocation } from 'react-router'; // Importa hook para acessar a localização atual
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação entre páginas
import AparelhoRequests from '../../fetch/AparelhoRequests'; // Importa as requisições para manipulação de dados de aparelho

/**
 * Componente com o formulário para atualizar os dados do aparelho
 */
function AtualizarAparelho() {
    // Usado para pegar os dados da página anterior (as informações do aparelho que foram passadas pelo componente ListaAparelho)
    const location = useLocation(); // Obtém a localização atual
    const navegacao = useNavigate(); // Obtém função de navegação
    const atualizar = location.state.atualizar; // Obtém os dados do aparelho a ser atualizado

    // Estado do aparelho, inicializado com os dados recebidos da página anterior
    const [aparelho, setAparelho] = useState({
        id_aparelho: atualizar.id_aparelho,
        nome_aparelho: atualizar.nome_aparelho,
        musculo_ativado: atualizar.musculo_ativado,
    });

    // Função para atualizar os valores conforme os inputs do formulário são preenchidos
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e valor do input
        setAparelho(prevState => ({
            ...prevState,
            [name]: value // Atualiza o estado com o novo valor
        }));
    };

    // Função para atualizar os dados do aparelho no banco de dados
    const handleSubmit = async (e) => {
        // Enviar dados para a API
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Tenta atualizar os dados do aparelho
        if (await AparelhoRequests.atualizarAparelho(aparelho)) {
            alert(`O aparelho ${aparelho.nome_aparelho} foi atualizado com sucesso.`);
            navegacao('/ListaAparelho', { replace: true });
        } else {
            alert("Erro ao atualizar informações!"); // Alerta de erro
            window.location.reload(); // Recarrega a página em caso de erro
        }
    };

    // Renderiza o formulário de atualização de aparelho
    return (
        <>
            <h1 className="titulo-atualizar-aparelho">Atualizar Aparelho</h1> {/* Título da página */}
            <form className="formulario-atualizar-aparelho" onSubmit={handleSubmit}> {/* Formulário de atualização */}
                <div className="grupo-formulario">
                    <label className="label-formulario">Nome do Aparelho</label>
                    <input
                        type="text"
                        name="nome_aparelho"
                        className="input-formulario"
                        value={aparelho.nome_aparelho}
                        onChange={handleChange}
                    />
                </div>
                <div className="grupo-formulario">
                    <label className="label-formulario">Músculo Ativado</label>
                    <input
                        type="text"
                        name="musculo_ativado"
                        className="input-formulario"
                        value={aparelho.musculo_ativado}
                        onChange={handleChange}
                    />
                </div>
                <div className="acoes-formulario">
                    <button type="submit" className="botao-enviar">Enviar</button> {/* Botão para enviar o formulário */}
                    <button
                        type="button"
                        className="botao-voltar"
                        onClick={() => window.location.href = '/ListaAparelho'}
                    >
                        Aparelhos
                    </button>
                </div>
            </form>
        </>
    );
}

export default AtualizarAparelho; // Exporta o componente AtualizarAparelho
