import './FormAluno.css';
import React, { useState, useEffect } from 'react';
import bg1 from '../../assets/bg1.png';
import AlunoRequests from '../../fetch/AlunoRequests';
import InputMask from 'react-input-mask';

function FormAluno() {
  const [alunoData, setAlunoData] = useState({
    nome: '',
    email: '',
    celular: '',
    dataNascimento: '',
    endereco: '',
    cpf: '',
    senha: '',
    altura: '',
    peso: '',
    imc: ''
  });

  const [resultado, setResultado] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNumericInput = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D+/g, '');
    setAlunoData((prevState) => ({
      ...prevState,
      [name]: numericValue
    }));
  };

  useEffect(() => {
    if (alunoData.altura && alunoData.peso) {
      const pesoNum = parseFloat(alunoData.peso);
      const alturaNum = parseFloat(alunoData.altura.replace(',', '.')); // aceita vírgula
      if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) return;
      const imc = pesoNum / (alturaNum * alturaNum);
      setAlunoData((prevState) => ({ ...prevState, imc: imc.toFixed(2) }));
    }
  }, [alunoData.altura, alunoData.peso]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!alunoData.senha || alunoData.senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    const result = await AlunoRequests.cadastrarAluno(alunoData);
    if (result) {
      alert(`${alunoData.nome} cadastrado com sucesso!`);
      window.location.href = '/listaaluno';
    } else {
      alert('Erro ao cadastrar aluno');
    }
  };

  return (
    <div className='form-aluno-box'>
      <div className='form-aluno-header'>
        <h1 className='form-aluno-titulo'>Cadastro Aluno</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='form-aluno-lista'>
          <div className='form-aluno-campo'>
            <label htmlFor="nome" className='form-aluno-label'>Aluno:</label>
            <input
              type="text"
              className='form-aluno-input'
              name='nome'
              value={alunoData.nome}
              onChange={handleChange}
              placeholder='Nome'
              required
            />
          </div>

          <div className='form-aluno-campo'>
            <label htmlFor="email" className='form-aluno-label'>Email:</label>
            <input
              type="email"
              className='form-aluno-input'
              name='email'
              value={alunoData.email}
              onChange={handleChange}
              placeholder='E-mail'
              required
            />
          </div>

          <div className='form-aluno-info'>
            <div className='form-aluno-campo'>
              <label htmlFor="celular" className='form-aluno-label'>Celular:</label>
              <InputMask
                mask="(99) 99999-9999"
                name='celular'
                value={alunoData.celular}
                onChange={handleChange} 
                placeholder='Celular'
              />
            </div>

            <div className='form-aluno-campo'>
              <label htmlFor="dataNascimento" className='form-aluno-label'>Nascimento:</label>
              <input
                type="date"
                className='form-aluno-input'
                name='dataNascimento'
                value={alunoData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-aluno-campo'>
              <label htmlFor="cpf" className='form-aluno-label'>CPF:</label>
              <InputMask
                mask="999.999.999-99"
                name='cpf'
                value={alunoData.cpf}
                onChange={handleChange} 
                placeholder='CPF'
              />
            </div>
          </div>

          <div className='form-aluno-campo'>
            <label htmlFor="endereco" className='form-aluno-label'>Endereço:</label>
            <input
              type="text"
              className='form-aluno-input'
              name='endereco'
              value={alunoData.endereco}
              onChange={handleChange}
              placeholder='Endereço'
              required
            />
          </div>

          <div className='form-aluno-info'>
            <div className='form-aluno-campo'>
              <label htmlFor="altura" className='form-aluno-label'>Altura (m):</label>
              <InputMask
                mask="9.99"
                name="altura"
                value={alunoData.altura}
                onChange={handleChange}
                placeholder='Altura'
              />
            </div>

            <div className='form-aluno-campo'>
              <label htmlFor="peso" className='form-aluno-label'>Peso (kg):</label>
              <InputMask
                mask="999.99"
                name='peso'
                value={alunoData.peso}
                onChange={handleChange}
                placeholder='Peso'
              />
            </div>

            <div className='form-aluno-campo'>
              <label htmlFor="imc" className='form-aluno-label'>IMC:</label>
              <input
                type="number"
                className='form-aluno-input'
                name='imc'
                value={alunoData.imc}
                readOnly
                placeholder='IMC'
              />
            </div>
          </div>

          <div className='form-aluno-campo'>
            <label htmlFor="senha" className='form-aluno-label'>Senha:</label>
            <input
              type="password"
              className='form-aluno-input'
              name='senha'
              value={alunoData.senha}
              onChange={handleChange}
              placeholder='Senha (mínimo 6 caracteres)'
              required
              minLength={6}
            />
          </div>

        </div>

        <div className='form-aluno-botoes'>
          <input type="submit" className='form-aluno-submit' value='Cadastrar' />
          <input type="button" onClick={() => window.location.href = '/listaaluno'} className='form-aluno-navegar' value='Alunos' />
        </div>
      </form>
    </div>
  );
}

export default FormAluno;
