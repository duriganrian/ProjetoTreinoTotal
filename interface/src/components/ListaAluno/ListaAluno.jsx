import Navegacao from '../Navegacao/Navegacao'; // Importa componente de navegação
import Table from 'react-bootstrap/Table'; // Importa componente de tabela do Bootstrap
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa funções de requisições para alunos
import { FaTrash } from 'react-icons/fa'; // Importa ícone de lixo para deletar
import { AiFillEdit } from 'react-icons/ai'; // Importa ícone de edição
import Paginacao from '../Paginacao/Paginacao'; // Importa componente de paginação
import style from './ListaAluno.module.css'; // Importa estilos específicos para este componente
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação
import React, { useState, useEffect } from 'react';
function ListaAluno() {
    const [alunos, setAlunos] = useState([]); // Estado para armazenar a lista de alunos
    const navegacao = useNavigate(); // Hook para navegação
    const [filtroNome, setFiltroNome] = useState(""); // Estado para filtro de nome dos alunos

    // Estado para gerenciar a página atual da listagem
    const [paginaAtual, setPaginaAtual] = useState(1); // Define a página atual
    // Constantes para controle da paginação
    const itensPorPagina = 10; // Número de itens por página
    const maxPageNumbersToShow = 5; // Máximo de números de página a serem mostrados
    // Estado para gerenciar o carregamento e erros
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado para gerenciar erros

    // Função para formatar a data no formato desejado
    const formatarData = (dataISO) => {
        if (!dataISO) return ""; // Retorna string vazia se não houver data
        const [ano, mes, dia] = dataISO.split("T")[0].split("-"); // Divide a data em componentes
        return `${dia}/${mes}/${ano}`; // Retorna a data formatada
    };

    // Efeito colateral para buscar alunos quando o componente é montado
    useEffect(() => {
        const fetchData = async () => {
            try {
                const alunos = await AlunoRequests.listarAlunos(); // Chama função para listar alunos
                if (Array.isArray(alunos)) {
                    setAlunos(alunos); // Atualiza estado com a lista de alunos
                } else {
                    throw new Error('Formato de resposta inválido'); // Lança erro se a resposta não for válida
                }
            } catch (error) {
                console.error('Erro ao buscar alunos:', error); // Loga erro no console
                setError('Erro ao buscar alunos. Verifique se o servidor está funcionando.'); // Define mensagem de erro
            } finally {
                setLoading(false); // Atualiza estado de carregamento para falso
            }
        };
        fetchData(); // Chama a função para buscar dados
    }, []); // Executa apenas uma vez quando o componente é montado

    // Função para remover aluno
    const deletarAluno = async (idAluno, nome) => {
    const confirma = window.confirm(`Deseja mesmo remover o registro ${nome}? Essa operação é irreversível!`);
    if (confirma) {
        try {
            const sucesso = await AlunoRequests.deletarAluno(idAluno);
            if (sucesso) {
                window.alert(`Registro ${nome} removido com sucesso.`);
                setAlunos(prev => prev.filter(aluno => aluno.id_aluno !== idAluno)); // ✅ remove localmente
            } else {
                window.alert(`Falha ao remover ${nome}.`);
            }
        } catch (error) {
            console.error(`Falha ao remover ${nome}.`, error);
            window.alert(`Falha ao remover ${nome}.`);
        }
    }
};


    // Função para atualizar aluno
    const atualizarAluno = (aluno) => {
        navegacao('/atualizarAluno', { state: { atualizar: aluno }, replace: true }); // Navega para a página de atualização
    }

    // Filtra alunos pelo nome
    const alunosFiltrados = alunos.filter((aluno) =>
        aluno.nome.toLowerCase().includes(filtroNome.toLowerCase()) // Filtra com base no nome
    );

    // Cálculo dos índices para a paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina; // Último item da página atual
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina; // Primeiro item da página atual
    const currentItems = alunosFiltrados.slice(indicePrimeiroItem, indiceUltimoItem); // Itens atuais a serem exibidos
    const totalPaginas = Math.ceil(alunosFiltrados.length / itensPorPagina); // Total de páginas

    // Função para mudar de página
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina); // Atualiza a página atual
    };

    return (
        <>
            <div style={{ backgroundColor: "#fca311" }}> {/* Estilo de fundo */}
                <Navegacao /> {/* Componente de navegação */}
                <div>
                    <h1>Lista dos Alunos</h1> {/* Título da lista */}

                    <div className={style.section}>
                        <div className={style.container}>
                            <div className={style.row}>
                                <div className={style.col}>
                                    <div className={style.section}>
                                        {/* Campo de busca para filtrar alunos por nome */}
                                        <input
                                            placeholder="Buscar aluno por nome" // Placeholder do campo de busca
                                            value={filtroNome} // Valor do campo de busca
                                            onChange={(e) => setFiltroNome(e.target.value)} // Atualiza o filtro ao mudar o valor
                                            className={style.inputBusca} // Classe de estilo
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Table striped bordered hover> {/* Tabela de alunos */}
                        <thead>
                            <tr>
                                <th hidden style={{ backgroundColor: "#14213D", width: "180px", color: "white" }}>ID</th> {/* ID oculto */}
                                <th style={{ backgroundColor: "#14213D", width: "180px", color: "white", textAlign: "center" }}>Nome</th> {/* Nome do aluno */}
                                <th style={{ backgroundColor: "#14213D", width: "150px", color: "white", textAlign: "center" }}>CPF</th> {/* CPF do aluno */}
                                <th style={{ backgroundColor: "#14213D", width: "150px", color: "white", textAlign: "center" }}>Email</th> {/* Email do aluno */}
                                <th style={{ backgroundColor: "#14213D", color: "white", width: "150px", textAlign: "center" }}>Telefone</th> {/* Telefone do aluno */}
                                <th style={{ backgroundColor: "#14213D", color: "white", width: "200px", textAlign: "center" }}>Endereço</th> {/* Endereço do aluno */}
                                <th style={{ backgroundColor: "#14213D", color: "white", width: "200px", textAlign: "center" }}>Data de Nascimento</th> {/* Data de nascimento do aluno */}
                                <th style={{ backgroundColor: "#14213D", color: "white", width: "90px", textAlign: "center" }}>Altura</th> {/* Altura do aluno */}
                                <th style={{ backgroundColor: "#14213D", color: "white", width: "80px", textAlign: "center" }}>Peso</th> {/* Peso do aluno */}
                                <th style={{ backgroundColor: "#14213D", color: "white", width: "80px", textAlign: "center" }}>IMC</th> {/* IMC do aluno */}
                                <th style={{ backgroundColor: "#14213D", color: "white", width: "120px", textAlign: "center" }}>Delete</th> {/* Coluna para deletar */}
                                <th style={{ backgroundColor: "#14213D", color: "white", width: "120px", textAlign: "center" }}>Atualizar</th> {/* Coluna para atualizar */}
                            </tr>
                        </thead>
                        <tbody style={{ color: "black" }}> {/* Corpo da tabela */}
                            {loading ? ( // Verifica se está carregando
                                <tr>
                                    <td colSpan='11'>Carregando...</td> {/* Mensagem de carregamento */}
                                </tr>
                            ) : error ? ( // Verifica se há erro
                                <tr>
                                    <td colSpan='11'>{error}</td> {/* Mensagem de erro */}
                                </tr>
                            ) : currentItems.length > 0 ? ( // Verifica se há alunos a serem exibidos
                                currentItems.map(aluno => (
                                    <tr key={aluno.id_aluno}>
                                        <td hidden>{aluno.id_aluno}</td>
                                        <td>{aluno.nome}</td>
                                        <td>{aluno.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>
                                        <td>{aluno.email}</td>
                                        <td>{`(${aluno.celular.substring(0, 2)}) ${aluno.celular.substring(2, 7)}-${aluno.celular.substring(7, 11)}`}</td>
                                        <td>{aluno.endereco}</td>
                                        <td>{formatarData(aluno.data_nascimento)}</td>
                                        <td>{aluno.altura}</td>
                                        <td>{aluno.peso}</td>
                                        <td>{aluno.imc}</td>
                                        <td
                                            onClick={() => deletarAluno(aluno.id_aluno, aluno.nome)} // ✅ corrigido
                                            style={{ background: 'none', cursor: 'pointer' }}
                                        >
                                            <FaTrash />
                                        </td>
                                        <td>
                                            <AiFillEdit onClick={() => atualizarAluno(aluno)} className={style.pTableBodyButtons} />
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan='11'>Nenhum aluno encontrado</td> {/* Mensagem se não houver alunos */}
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <Paginacao
                        currentPage={paginaAtual} // Página atual
                        totalPages={totalPaginas} // Total de páginas
                        onPageChange={mudarPagina} // Função para mudar de página
                    />
                </div>
            </div>
        </>
    );
}

export default ListaAluno; // Exporta o componente para uso em outras partes da aplicação