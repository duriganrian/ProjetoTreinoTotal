import './FormExercicio.css'; // Importa o arquivo CSS para estilização
import React, { useState, useEffect } from 'react'; // Importa a biblioteca React e os hooks useState e useEffect
import bg1 from '../../assets/bg1.png'; // Importa uma imagem de fundo
import ExercicioRequests from '../../fetch/ExercicioRequests'; // Importa as requisições relacionadas aos exercícios
import AparelhoRequests from '../../fetch/AparelhoRequests'; // Importa as requisições relacionadas aos aparelhos
import Navegacao from '../Navegacao/Navegacao'; // Importa o componente de navegação

/**
 * Componente que representa o formulário de cadastro de exercícios
 * @returns {JSX.Element} Código JSX que renderiza o formulário
 */
function FormExercicio() {
    // Estado inicial para os dados do exercício
    const [formData, setExercicioData] = useState({
        id_aparelho: '', // ID do aparelho
        exercicio: '', // Nome do exercício
        carga: '', // Carga utilizada
        repeticoes: '', // Número de repetições
        regiaoCorpoAtivada: '' // Região do corpo ativada
    });

    // Estado para armazenar a lista de aparelhos
    const [aparelhos, setAparelhos] = useState([]); // Lista de aparelhos

    // Hook useEffect para buscar os aparelhos ao carregar o componente
    useEffect(() => {
        // Função assíncrona para buscar os aparelhos do servidor
        const fetchAparelhos = async () => {
            const response = await AparelhoRequests.listarAparelhos(); // Busca os aparelhos
            if (response) {
                setAparelhos(response); // Atualiza o estado com os aparelhos recebidos
            }
        };

        fetchAparelhos(); // Chama a função para buscar aparelhos
    }, []); // Executa apenas uma vez ao montar o componente

    /**
     * Função para lidar com a mudança dos campos do formulário
     * @param {Event} e Evento de mudança dos campos do formulário
     */
    const handleChange = (e) => {
        const { name, value } = e.target; // Pega o nome e o valor do campo que disparou o evento
        setExercicioData(prevState => ({
            ...prevState,
            [name]: value // Atualiza o valor correspondente ao nome do campo
        }));
    };

    /**
     * Função para lidar com o envio do formulário
     * @param {Event} e Evento de envio do formulário
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        if (await ExercicioRequests.cadastrarExercicio(formData)) {
            alert(`O exercício ${formData.exercicio} foi cadastrado com sucesso.`); // Alerta de sucesso
            window.location.href = '/ListaExercicio'; // Redireciona para a lista de exercícios
        } else {
            window.alert("Erro ao enviar formulário"); // Alerta de erro
            window.location.reload(); // Recarrega a página em caso de erro
        }
    };

    return (
        <>
            <Navegacao /> {/* Componente de navegação */}
            <div className='container-exercicio'>
                <div className='topo-cabecalho'>
                    <header style={{ fontSize: "25px" }}>Cadastro de Exercício</header> {/* Título do formulário */}
                </div>
                <form onSubmit={handleSubmit}> {/* Formulário para cadastro */}
                    <div className='campo-selecao'>
                        <label htmlFor="" style={{ fontSize: "12px" }}>Aparelho:</label>
                        <select
                            className='campo-input' // Classe de estilo para o select
                            value={formData.id_aparelho} // Valor baseado no estado
                            onChange={handleChange} // Atualiza o estado ao mudar o valor
                            name="id_aparelho" // Nome do campo
                            required // Campo obrigatório
                        >
                            <option value="">Selecione o Aparelho</option> {/* Opção padrão */}
                            {/* Mapeia os aparelhos recebidos e cria uma opção para cada um */}
                            {aparelhos.map(aparelho => (
                                <option key={aparelho.id_aparelho} value={aparelho.id_aparelho}>
                                    {aparelho.nome_aparelho} {/* Nome do aparelho */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='campo-selecao'>
                        <label htmlFor="" style={{ fontSize: "12px" }}>Nome do Exercício:</label>
                        <input
                            className='campo-input'
                            type="text" // Tipo do input como texto
                            name='exercicio' // Nome do campo
                            value={formData.exercicio} // Valor baseado no estado
                            onChange={handleChange} // Atualiza o estado ao mudar o valor
                            placeholder='Nome do Exercício' // Texto de espaço reservado
                            required // Campo obrigatório
                        />
                    </div>

                    <div className='campo-selecao'>
                        <label htmlFor="" style={{ fontSize: "12px" }}>Região Ativada:</label>
                        <input
                            type="text" // Tipo do input como texto
                            className='campo-input' // Classe de estilo para o input
                            name='regiaoCorpoAtivada' // Nome do campo
                            value={formData.regiaoCorpoAtivada} // Valor baseado no estado
                            onChange={handleChange} // Atualiza o estado ao mudar o valor
                            placeholder='Região ativada' // Texto de espaço reservado
                            required // Campo obrigatório
                        />
                    </div>

                    <div className='botoes'>
                        <input type="submit" className='botao-cadastro' value='Cadastrar' style={{ borderRadius: '9px' }} /> {/* Botão para cadastro */}
                        <button className='botao-cadastro' onClick={() => window.location.href = '/ListaExercicio'}>Aparelhos</button> {/* Botão para voltar à lista de exercícios */}
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormExercicio; // Exporta o componente para uso em outras partes da aplicação
