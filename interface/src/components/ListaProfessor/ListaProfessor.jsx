import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navegacao from '../Navegacao/Navegacao';
import Table from 'react-bootstrap/Table';
import ProfessorRequests from '../../fetch/ProfessorRequests';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import Paginacao from '../Paginacao/Paginacao';
import style from './ListarProfessor.module.css';

function ListaProfessor() {
  const [professores, setProfessores] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;
  const navegacao = useNavigate();

  const formatarData = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ProfessorRequests.listarProfessores();
        if (Array.isArray(response)) {
          setProfessores(response);
        } else {
          throw new Error("Formato de resposta inválido");
        }
      } catch (err) {
        console.error("Erro ao buscar professores:", err);
        setError("Erro ao buscar professores. Verifique o servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deletarProfessor = async (id_professor, nome) => {
    if (window.confirm(`Deseja realmente remover ${nome}? Essa ação é irreversível.`)) {
      const sucesso = await ProfessorRequests.deletarProfessor(id_professor);
      if (sucesso) {
        setProfessores(prev => prev.filter(p => p.id_professor !== id_professor));
        alert(`${nome} removido com sucesso.`);
      } else {
        alert(`Falha ao remover ${nome}.`);
      }
    }
  };

  const atualizarProfessor = (professor) => {
    navegacao('/atualizarProfessor', { state: { atualizar: professor } });
  };

  const currentItems = professores
    .filter(p => p.nome.toLowerCase().includes(filtroNome.toLowerCase()))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(professores.length / itemsPerPage);

  return (
    <div style={{ backgroundColor: "#fca311" }}>
      <div className={style.listaProfessor}>
        <Navegacao />
        <h1>Lista dos Professores</h1>

        <input
          placeholder="Buscar professor por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className={style.inputBusca}
        />

        <Table striped bordered hover style={{ color: "white" }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Data Nascimento</th>
              <th>Data Contratação</th>
              <th>Formação</th>
              <th>Especialidade</th>
              <th>Deletar</th>
              <th>Atualizar</th>
            </tr>
          </thead>
          <tbody style={{ color: "black" }}>
            {loading ? (
              <tr><td colSpan="11">Carregando...</td></tr>
            ) : error ? (
              <tr><td colSpan="11">{error}</td></tr>
            ) : currentItems.length === 0 ? (
              <tr><td colSpan="11">Nenhum professor encontrado</td></tr>
            ) : (
              currentItems.map(p => (
                <tr key={p.id_professor}>
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                  <td>{p.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>
                  <td>{`(${p.celular.slice(0,2)}) ${p.celular.slice(2,7)}-${p.celular.slice(7,11)}`}</td>
                  <td>{p.endereco}</td>
                  <td>{formatarData(p.data_nascimento)}</td>
                  <td>{formatarData(p.data_contratacao)}</td>
                  <td>{p.formacao}</td>
                  <td>{p.especialidade}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => deletarProfessor(p.id_professor, p.nome)}><FaTrash /></td>
                  <td><AiFillEdit style={{ cursor: 'pointer' }} onClick={() => atualizarProfessor(p)} /></td>
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

export default ListaProfessor;
