/**
 * Componente responsável por listar os exercícios.
 * @returns Web component que renderiza a lista de exercícios com funcionalidades de filtro, remoção e atualização.
 */
import React, { useState, useEffect } from 'react'; // Importa React e hooks useState e useEffect
import Navegacao from '../Navegacao/Navegacao'; // Importa componente de navegação
import Table from 'react-bootstrap/Table'; // Importa tabela do Bootstrap
import ExercicioRequests from '../../fetch/ExercicioRequests'; // Importa funções de requisições para exercícios
import { FaTrash } from 'react-icons/fa'; // Importa ícone de lixeira para deletar
import { AiFillEdit } from 'react-icons/ai'; // Importa ícone de edição
import Paginacao from '../Paginacao/Paginacao'; // Importa componente de paginação
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação entre páginas
import style from './ListaExercicio.module.css'; // Importa estilos específicos para este componente

function ListaExercicio() {
    const [exercicios, setExercicios] = useState([]); // Estado que armazena a lista de exercícios
    const [filtroNome, setFiltroNome] = useState(''); // Estado para o filtro de nome dos exercícios
    const navegacao = useNavigate(); // Hook para navegação entre páginas
    const [currentPage, setCurrentPage] = useState(1); // Estado que define a página atual da tabela
    const itemsPerPage = 10; // Define o número de itens exibidos por página
    const [loading, setLoading] = useState(true); // Estado de carregamento da lista
    const [error, setError] = useState(null); // Estado para gerenciar erros ao carregar dados

    /**
     * Busca a lista de exercícios do servidor quando o componente é montado.
     * Trata erros e gerencia estado de carregamento.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercicios = await ExercicioRequests.listarExercicios(); // Faz a requisição para listar exercícios
                if (Array.isArray(exercicios)) {
                    setExercicios(exercicios); // Atualiza o estado com a lista de exercícios
                } else {
                    throw new Error('Formato de resposta inválido'); // Lança erro se a resposta não for válida
                }
            } catch (error) {
                console.error('Erro ao buscar exercícios:', error); // Loga erro no console
                setError('Erro ao buscar exercícios. Verifique se o servidor está funcionando.'); // Define mensagem de erro
            } finally {
                setLoading(false); // Atualiza estado de carregamento para falso
            }
        };
        fetchData(); // Chama a função para buscar dados
    }, []); // Efeito executado apenas uma vez ao montar o componente

    /**
     * Remove um exercício do servidor com base no ID.
     * Solicita confirmação do usuário antes de executar a ação.
     * @param {number} id_exercicio - ID do exercício a ser removido.
     * @param {string} exercicio - Nome do exercício para exibir na confirmação.
     */
    const deletarExercicio = async (id_exercicio, exercicio) => {
        const confirma = window.confirm(`Deseja mesmo remover o registro ${exercicio}? Essa operação é irreversível!`); // Exibe mensagem de confirmação
        if (confirma) {
            try {
                await ExercicioRequests.deletarExercicio(id_exercicio); // Faz a requisição para remover exercício
                alert(`Registro ${exercicio} removido com sucesso.`); // Exibe mensagem de sucesso
                window.location.reload(); // Recarrega a página para atualizar a lista
            } catch (error) {
                console.error(`Falha ao remover ${exercicio}.`, error); // Loga erro no console
                alert(`Falha ao remover ${exercicio}.`); // Exibe mensagem de falha
            }
        }
    };

    /**
     * Navega para a página de atualização de exercício com os dados do exercício selecionado.
     * @param {object} exercicio - Objeto do exercício que será atualizado.
     */
    const atualizarExercicio = (exercicio) => {
        navegacao('/atualizarExercicio', { state: { atualizar: exercicio }, replace: true }); // Navega para a página de atualização
    };

    // Filtra os exercícios pelo nome usando o valor do estado `filtroNome`
    const exerciciosFiltrados = exercicios.filter(exercicio =>
        exercicio.exercicio.toLowerCase().includes(filtroNome.toLowerCase())
    );

    // Calcula os índices dos itens exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage; // Índice do último item da página atual
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Índice do primeiro item da página atual
    const currentItems = exerciciosFiltrados.slice(indexOfFirstItem, indexOfLastItem); // Itens exibidos na página atual

    // Calcula o número total de páginas
    const totalPages = Math.ceil(exerciciosFiltrados.length / itemsPerPage);

    return (
        <div style={{ backgroundColor: "#fca311" }}> {/* Estilo do fundo */}
            <Navegacao /> {/* Componente de navegação */}
            <div className={style.section}>
                <h1>Lista dos Exercícios</h1> {/* Título da página */}
                <div className={style.container}>
                    <div className={style.row}>
                        <div className={style.col}>
                            {/* Campo de busca para filtrar exercícios */}
                            <input
                                placeholder="Buscar exercício por nome"
                                value={filtroNome}
                                onChange={(e) => setFiltroNome(e.target.value)}
                                className={style.inputBusca}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabela que exibe a lista de exercícios */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "#14213D", color: "white", textAlign: "center" }}>Nome do Exercício</th>
                            <th style={{ backgroundColor: "#14213D", color: "white", textAlign: "center" }}>Região Ativada</th>
                            <th style={{ backgroundColor: "#14213D", color: "white", textAlign: "center" }}>Deletar</th>
                            <th style={{ backgroundColor: "#14213D", color: "white", textAlign: "center" }}>Atualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4">Carregando...</td> {/* Mensagem de carregamento */}
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="4">{error}</td> {/* Mensagem de erro */}
                            </tr>
                        ) : currentItems.length > 0 ? (
                            currentItems.map((exercicio) => (
                                <tr key={exercicio.id_exercicio}>
                                    <td>{exercicio.exercicio.toUpperCase()}</td>
                                    <td>{exercicio.regiao_corpo_ativada}</td>
                                    <td onClick={() => deletarExercicio(exercicio.id_exercicio, exercicio.exercicio)} style={{ cursor: 'pointer' }}>
                                        <FaTrash />
                                    </td>
                                    <td onClick={() => atualizarExercicio(exercicio)} style={{ cursor: 'pointer' }}>
                                        <AiFillEdit className={style.pTableBodyButtons} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Nenhum exercício encontrado</td> {/* Mensagem caso a lista esteja vazia */}
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Paginacao
                    currentPage={currentPage} // Página atual
                    totalPages={totalPages} // Total de páginas
                    onPageChange={(page) => setCurrentPage(page)} // Atualiza a página ao clicar em um número
                />
            </div>
        </div>
    );
}

export default ListaExercicio; // Exporta o componente para uso em outras partes da aplicação
