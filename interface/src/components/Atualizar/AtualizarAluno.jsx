import './AtualizarAluno.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { formatarData } from '../../util/Utilitario';
import AlunoRequests from '../../fetch/AlunoRequests';
import InputMask from 'react-input-mask';
import React, { useState } from 'react';

function AtualizarAluno() {
  const location = useLocation();
  const navegacao = useNavigate();
  const atualizar = location.state?.atualizar;

  const [aluno, setAluno] = useState({
    id: atualizar.id_aluno, 
    nome: atualizar.nome,
    email: atualizar.email,
    celular: atualizar.celular,
    data_nascimento: formatarData(new Date(atualizar.data_nascimento)), 
    endereco: atualizar.endereco,
    cpf: atualizar.cpf,
    altura: atualizar.altura,
    peso: atualizar.peso,
    imc: atualizar.imc
  });

  // Atualiza IMC automaticamente
  useEffect(() => {
    if (aluno.altura && aluno.peso) {
      const pesoNum = parseFloat(aluno.peso);
      const alturaNum = parseFloat(aluno.altura);
      if (!isNaN(pesoNum) && !isNaN(alturaNum) && pesoNum > 0 && alturaNum > 0) {
        const imc = pesoNum / (alturaNum * alturaNum);
        setAluno((prev) => ({ ...prev, imc: imc.toFixed(2) }));
      }
    }
  }, [aluno.altura, aluno.peso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNumericInput = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D+/g, '');
    setAluno((prevState) => ({
      ...prevState,
      [name]: numericValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await AlunoRequests.atualizarAluno(aluno);
    if (sucesso) {
      alert(`O aluno ${aluno.nome} foi atualizado com sucesso.`);
      navegacao('/listaaluno', { replace: true });
    } else {
      alert('Erro ao atualizar informações!');
    }
  };

  return (
    <>
      <h1>Atualizar Aluno</h1>
      <form className="FormAtualizarAluno" onSubmit={handleSubmit}>
        <label className="label-atualizar">
          Nome
          <input type="text" name="nome" value={aluno.nome} onChange={handleChange} />
        </label>

        <label className="label-atualizar">
          Email
          <input type="text" name="email" value={aluno.email} onChange={handleChange} />
        </label>

        <div className="GrupoAtualizarAluno">
          <label className="label-atualizar">
            Celular
            <InputMask
              mask="(99) 99999-9999"
              name="celular"
              value={aluno.celular}
              onChange={handleNumericInput}
              style={{ width: '89%' }}
            />
          </label>

          <label className="label-atualizar">
            CPF
            <InputMask
              mask="999.999.999-99"
              name="cpf"
              value={aluno.cpf}
              onChange={handleNumericInput}
              style={{ width: '89%' }}
            />
          </label>

          <label className="label-atualizar">
            Nascimento
            <input
              type="date"
              name="data_nascimento"
              value={aluno.data_nascimento}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <label className="label-atualizar">
          Endereço
          <input type="text" name="endereco" value={aluno.endereco} onChange={handleChange} />
        </label>

        <div className="GrupoMedidas">
          <label className="label-atualizar">
            Altura
            <InputMask mask="9.99" name="altura" value={aluno.altura} onChange={handleChange} />
          </label>
          <label className="label-atualizar">
            Peso
            <InputMask mask="999.99" name="peso" value={aluno.peso} onChange={handleChange} />
          </label>

          <label className="label-atualizar">
            IMC
            <input
              type="number"
              name="imc"
              value={aluno.imc}
              readOnly
              placeholder="IMC"
            />
          </label>
        </div>

        <button type="submit" className="BotaoEnviar">
          Enviar
        </button>
        <button
          type="button"
          className="BotaoVoltar"
          onClick={() => navegacao('/listaaluno')}
        >
          Alunos
        </button>
      </form>
    </>
  );
}

export default AtualizarAluno;
