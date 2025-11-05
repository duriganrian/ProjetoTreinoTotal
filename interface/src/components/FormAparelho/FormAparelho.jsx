import './FormAparelho.css'; // Importa o arquivo CSS para estilização
import React, { useState } from 'react'; // Importa a biblioteca React e o hook useState
import AparelhoRequests from '../../fetch/AparelhoRequests'; // Importa as requisições relacionadas aos aparelhos

/**
 * Componente que representa o formulário de cadastro de aparelhos
 * @returns {JSX.Element} Código JSX que renderiza o formulário
 */
function cadastrarFormAparelho() {
    // Estado inicial para os dados do aparelho
    const [aparelhoData, setAparelhoData] = useState({
        nome_aparelho: '', // Nome do aparelho
        musculo_ativado: '' // Músculo ativado pelo aparelho
    });

    /**
     * Função para lidar com a mudança dos campos do formulário
     * @param {Event} e Evento de mudança dos campos do formulário
     */
    const handleChange = (e) => {
        const { name, value } = e.target; // Pega o nome e o valor do campo que disparou o evento
        setAparelhoData(prevState => ({
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
        // Envia os dados do formulário para o servidor
        if (await AparelhoRequests.cadastrarAparelho(aparelhoData)) {
            alert(`O aparelho ${aparelhoData.nome_aparelho} foi cadastrado com sucesso.`); // Alerta de sucesso
            window.location.href = '/ListaAparelho'; // Redireciona para a lista de aparelhos
        } else {
            window.alert("Erro ao enviar formulário"); // Alerta de erro
            window.location.reload(); // Recarrega a página em caso de erro
        }
    };

    return (
        <div className='container-centralizado' style={{
            backgroundSize: 'cover', // Tamanho do fundo
            backgroundRepeat: 'no-repeat', // Sem repetição do fundo
            backgroundPosition: 'center', // Centraliza o fundo
            height: '500px'
        }}>
            <div className='caixa-formulario'> {/* Caixa de formulário */}
                <div className='cabecalho-formulario'>
                    <header className='titulo-formulario'>Cadastro de Aparelho</header> {/* Título do formulário */}
                </div>
                <form onSubmit={handleSubmit}> {/* Formulário para cadastro */}
                    <div className='campo-input-container'>
                        <label htmlFor="nome_aparelho" className='etiqueta-campo'>Nome do Aparelho:</label>
                        <input
                            type='text' // Tipo do input como texto
                            className='campo-texto campo-texto-foco' // Classe de estilo para o input
                            placeholder='Nome do Aparelho' // Texto de espaço reservado
                            name='nome_aparelho' // Nome do campo
                            value={aparelhoData.nome_aparelho} // Valor do campo baseado no estado
                            onChange={handleChange} // Atualiza o estado ao mudar o valor
                            required // Campo obrigatório
                        />
                        <i className='icone-direita bx bx-user'></i> {/* Ícone associado ao campo */}
                    </div>
                    <div className='campo-input-container'>
                        <label htmlFor="musculo_ativado" className='etiqueta-campo'>Músculo Ativado:</label>
                        <input
                            type='text' // Tipo do input como texto
                            className='campo-texto campo-texto-foco' // Classe de estilo para o input
                            placeholder='Músculo Ativado' // Texto de espaço reservado
                            name='musculo_ativado' // Nome do campo
                            value={aparelhoData.musculo_ativado} // Valor do campo baseado no estado
                            onChange={handleChange} // Atualiza o estado ao mudar o valor
                            required // Campo obrigatório
                        />
                        <i className='icone-direita bx bx-muscle'></i> {/* Ícone associado ao campo */}
                    </div>
                    <div className='container-botoes'> {/* Contêiner para os botões */}
                        <input type='submit' className='botao-envio' value='Cadastrar' />
                        <button className='buttonv' onClick={() => window.location.href = '/ListaAparelho'}>
                            Aparelhos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default cadastrarFormAparelho; // Exporta o componente para uso em outras partes da aplicação.
