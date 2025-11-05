/**
 * Componente responsável por listar os aparelhos.
 * @returns Web component que renderiza a lista de aparelhos com filtro, remoção e atualização.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navegacao from '../Navegacao/Navegacao';
import Table from 'react-bootstrap/Table';
import AparelhoRequests from '../../fetch/AparelhoRequests';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import Paginacao from '../Paginacao/Paginacao';
import style from './ListaAparelho.module.css';

function ListaAparelho() {
  const [aparelhos, setAparelhos] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await AparelhoRequests.listarAparelhos();
        if (Array.isArray(response)) {
          setAparelhos(response);
        } else {
          throw new Error('Formato de resposta inválido');
        }
      } catch (err) {
        console.error('Erro ao buscar aparelhos:', err);
        setError('Erro ao buscar aparelhos. Verifique o servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removerAparelho = async (id, nome) => {
  if (window.confirm(`Deseja realmente remover "${nome}"? Essa ação é irreversível.`)) {
    try {
      const sucesso = await AparelhoRequests.deletarAparelho(id);
      if (sucesso) {
        setAparelhos(prev => prev.filter(a => a.id_aparelho !== id));
        alert(`"${nome}" removido com sucesso.`);
      } else {
        alert(`Falha ao remover "${nome}".`);
      }
    } catch (err) {
      console.error(`Falha ao remover ${nome}:`, err);
      alert(`Falha ao remover "${nome}".`);
    }
  }
};


  const atualizarAparelho = (aparelho) => {
    navigate('/atualizarAparelho', { state: { atualizar: aparelho } });
  };

  const currentItems = aparelhos
    .filter(a => a.nome_aparelho.toLowerCase().includes(filtroNome.toLowerCase()))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(aparelhos.length / itemsPerPage);

  return (
    <div style={{ backgroundColor: "#fca311" }}>
      <div className={style.listaAparelho}>
        <Navegacao />
        <h1>Lista dos Aparelhos</h1>

        <input
          placeholder="Buscar aparelho por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className={style.inputBusca}
        />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome do Aparelho</th>
              <th>Músculo Ativado</th>
              <th>Deletar</th>
              <th>Atualizar</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4">Carregando...</td></tr>
            ) : error ? (
              <tr><td colSpan="4">{error}</td></tr>
            ) : currentItems.length === 0 ? (
              <tr><td colSpan="4">Nenhum aparelho encontrado</td></tr>
            ) : (
              currentItems.map(a => (
                <tr key={a.id_aparelho}>
                  <td>{a.nome_aparelho}</td>
                  <td>{a.musculo_ativado}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => removerAparelho(a.id_aparelho, a.nome_aparelho)}>
                    <FaTrash />
                  </td>
                  <td>
                    <AiFillEdit style={{ cursor: 'pointer' }} onClick={() => atualizarAparelho(a)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Paginacao currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

export default ListaAparelho;
