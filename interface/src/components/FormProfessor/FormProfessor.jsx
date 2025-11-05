import './FormProfessor.css';
import React, { useState } from 'react';
import Navegacao from '../Navegacao/Navegacao';
import InputMask from 'react-input-mask';
import ProfessorRequests from '../../fetch/ProfessorRequests';

function FormProfessor({ professorParaAtualizar }) {
  const [professorData, setProfessorData] = useState({
    id_professor: professorParaAtualizar?.id_professor || '',
    nome: professorParaAtualizar?.nome || '',
    cpf: professorParaAtualizar?.cpf || '',
    email: professorParaAtualizar?.email || '',
    celular: professorParaAtualizar?.celular || '',
    endereco: professorParaAtualizar?.endereco || '',
    data_nascimento: professorParaAtualizar?.data_nascimento || '',
    data_contratacao: professorParaAtualizar?.data_contratacao || '',
    formacao: professorParaAtualizar?.formacao || '',
    especialidade: professorParaAtualizar?.especialidade || '',
    senha: professorParaAtualizar?.senha || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessorData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumericInput = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D+/g, '');
    setProfessorData(prev => ({ ...prev, [name]: numericValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!professorData.senha || professorData.senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    let sucesso;
    if (professorData.id_professor) {
      // Atualizar professor
      sucesso = await ProfessorRequests.atualizarProfessor(professorData);
      if (sucesso) alert(`Professor ${professorData.nome} atualizado com sucesso!`);
      else alert('Erro ao atualizar professor!');
    } else {
      // Cadastrar professor
      sucesso = await ProfessorRequests.cadastrarProfessor(professorData);
      if (sucesso) alert(`Professor ${professorData.nome} cadastrado com sucesso!`);
      else alert('Erro ao cadastrar professor!');
    }

    if (sucesso) window.location.href = '/listaprofessor';
  };

  return (
    <>
      <Navegacao />
      <div className="container-formulario">
        <h1 className="titulo-formulario">
          {professorData.id_professor ? 'Atualizar Professor' : 'Cadastro Professor'}
        </h1>
        <form onSubmit={handleSubmit}>

          <div className="secao-formulario">
            <label className="rotulo-input">Nome:</label>
            <input
              type="text"
              name="nome"
              value={professorData.nome}
              onChange={handleChange}
              placeholder="Nome"
              required
            />
          </div>

          <div className="secao-formulario secao-formulario-flex">
            <div className="container-input">
              <label className="rotulo-input">Celular:</label>
              <InputMask
                mask="(99) 99999-9999"
                name="celular"
                value={professorData.celular}
                onChange={handleNumericInput}
                placeholder="Celular"
              />
            </div>

            <div className="container-input">
              <label className="rotulo-input">CPF:</label>
              <InputMask
                mask="999.999.999-99"
                name="cpf"
                value={professorData.cpf}
                onChange={handleNumericInput}
                placeholder="CPF"
              />
            </div>
          </div>

          <div className="secao-formulario">
            <label className="rotulo-input">Endereço:</label>
            <input
              type="text"
              name="endereco"
              value={professorData.endereco}
              onChange={handleChange}
              placeholder="Endereço"
              required
            />
          </div>

          <div className="secao-formulario">
            <label className="rotulo-input">Email:</label>
            <input
              type="email"
              name="email"
              value={professorData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="secao-formulario secao-formulario-flex">
            <div className="container-input">
              <label className="rotulo-input">Data Nascimento:</label>
              <input
                type="date"
                name="data_nascimento"
                value={professorData.data_nascimento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="container-input">
              <label className="rotulo-input">Data Contratação:</label>
              <input
                type="date"
                name="data_contratacao"
                value={professorData.data_contratacao}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="secao-formulario secao-formulario-flex">
            <div className="container-input">
              <label className="rotulo-input">Formação:</label>
              <input
                type="text"
                name="formacao"
                value={professorData.formacao}
                onChange={handleChange}
                placeholder="Formação"
              />
            </div>

            <div className="container-input">
              <label className="rotulo-input">Especialidade:</label>
              <input
                type="text"
                name="especialidade"
                value={professorData.especialidade}
                onChange={handleChange}
                placeholder="Especialidade"
              />
            </div>
          </div>

          <div className="secao-formulario">
            <label className="rotulo-input">Senha:</label>
            <input
              type="password"
              name="senha"
              value={professorData.senha}
              onChange={handleChange}
              placeholder="Senha (mínimo 6 caracteres)"
              required
              minLength={6}
            />
          </div>

          <div className="rodape-formulario">
            <button type="submit" className="buttonpe">
              {professorData.id_professor ? 'Atualizar' : 'Cadastrar'}
            </button>
            <button
              type="button"
              className="buttonpv"
              onClick={() => window.location.href = '/listaprofessor'}
            >
              Professores
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

export default FormProfessor;
