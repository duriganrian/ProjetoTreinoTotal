import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navegacao from '../Navegacao/Navegacao';
import Table from 'react-bootstrap/Table';
import TreinoRequests from '../../fetch/TreinoRequests';
import Paginacao from '../Paginacao/Paginacao';
import style from '../styles/ListagemTreino.module.css';

function ListagemTreino() {
    const [treino, setTreino] = useState([]);
    const navegacao = useNavigate();
    const [filtroNome, setFiltroNome] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resposta = await TreinoRequests.listarTreinos();
                console.log('Resposta da API:', resposta); // Log para verificar a resposta da API

                if (resposta && resposta.data && Array.isArray(resposta.data)) {
                    setTreino(resposta.data);
                } else {
                    throw new Error('Formato de resposta inválido, esperado um array em resposta.data');
                }
            } catch (error) {
                console.error('Erro ao buscar treinos:', error); // Log de erro detalhado
                if (error.response) {
                    // Se houver uma resposta de erro do servidor, podemos pegar o status e mensagem
                    setError(`Erro no servidor: ${error.response.status} - ${error.response.statusText}`);
                } else {
                    setError('Erro ao buscar treinos. Verifique se o servidor está funcionando corretamente.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const treinoFiltrados = treino.filter((treino) =>
        treino.aluno.toLowerCase().includes(filtroNome.toLowerCase())
    );

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const currentItems = treinoFiltrados.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(treinoFiltrados.length / itensPorPagina);

    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    return (
        <>
            <div style={{ backgroundColor: "#fca311" }}>
                <Navegacao />
                <div>
                    <h1>Lista dos Treinos</h1>

                    <div className={style.section}>
                        <div className={style.container}>
                            <div className={style.row}>
                                <div className={style.col}>
                                    <div className={style.section}>
                                        <input
                                            placeholder="Buscar treino por nome do aluno"
                                            value={filtroNome}
                                            onChange={(e) => setFiltroNome(e.target.value)}
                                            className={style.inputBusca}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th hidden>ID</th>
                                <th style={{ backgroundColor: "#14213D", width: "180px", color: "white", textAlign: "center" }}>Aluno</th>
                                <th style={{ backgroundColor: "#14213D", width: "150px", color: "white", textAlign: "center" }}>Professor</th>
                                <th style={{ backgroundColor: "#14213D", width: "150px", color: "white", textAlign: "center" }}>Exercício</th>
                                <th style={{ backgroundColor: "#14213D", width: "150px", color: "white", textAlign: "center" }}>Repetições</th>
                                <th style={{ backgroundColor: "#14213D", width: "150px", color: "white", textAlign: "center" }}>Carga</th>
                                <th style={{ backgroundColor: "#14213D", width: "150px", color: "white", textAlign: "center" }}>Série</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "black" }}>
                            {loading ? (
                                <tr>
                                    <td colSpan="7">Carregando...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="7">{error}</td>
                                </tr>
                            ) : currentItems.length > 0 ? (
                                currentItems.map(treino => (
                                    <tr key={treino.id_treino}>
                                        <td hidden>{treino.id_treino}</td>
                                        <td>{treino.aluno}</td>
                                        <td>{treino.professor}</td>
                                        <td>{treino.exercicio}</td>
                                        <td>{treino.repeticao}</td>
                                        <td>{treino.carga}</td>
                                        <td>{treino.serie}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">Nenhum treino encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Paginacao
                        currentPage={paginaAtual}
                        totalPages={totalPaginas}
                        onPageChange={mudarPagina}
                    />
                </div>
            </div>
        </>
    );
}

export default ListagemTreino;
