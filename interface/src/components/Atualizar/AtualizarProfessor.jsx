import './AtualizarProfessor.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import ProfessorRequests from '../../fetch/ProfessorRequests';
import { formatarData } from '../../util/Utilitario';

function AtualizarProfessor() {
  const location = useLocation();
  const navegacao = useNavigate();
  const atualizar = location.state?.atualizar;

  const [professor, setProfessor] = useState({
    id_professor: atualizar?.id_professor || '',
    nome: atualizar?.nome || '',
    email: atualizar?.email || '',
    celular: atualizar?.celular || '',
    cpf: atualizar?.cpf || '',
    endereco: atualizar?.endereco || '',
    data_nascimento: formatarData(new Date(atualizar?.data_nascimento)) || '',
    data_contratacao: formatarData(new Date(atualizar?.data_contratacao)) || '',
    formacao: atualizar?.formacao || '',
    especialidade: atualizar?.especialidade || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessor((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumericInput = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D+/g, '');
    setProfessor((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!professor.id_professor) {
      alert('ID do professor não definido!');
      return;
    }

    const sucesso = await ProfessorRequests.atualizarProfessor(professor);
    if (sucesso) {
      alert(`O professor ${professor.nome} foi atualizado com sucesso.`);
      navegacao('/listaprofessor', { replace: true });
    } else {
      alert('Erro ao atualizar informações!');
    }
  };

  return (
    <>
      <h1>Atualizar Professor</h1>
      <form className="formulario-atualizar" onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={professor.nome} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={professor.email} onChange={handleChange} />
        </label>

        <label>
          Celular:
          <InputMask
            mask="(99) 99999-9999"
            name="celular"
            value={professor.celular}
            onChange={handleNumericInput}
          />
        </label>

        <label>
          CPF:
          <InputMask
            mask="999.999.999-99"
            name="cpf"
            value={professor.cpf}
            onChange={handleNumericInput}
          />
        </label>

        <label>
          Endereço:
          <input type="text" name="endereco" value={professor.endereco} onChange={handleChange} />
        </label>

        <label>
          Data de Nascimento:
          <input type="date" name="data_nascimento" value={professor.data_nascimento} onChange={handleChange} />
        </label>

        <label>
          Data de Contratação:
          <input type="date" name="data_contratacao" value={professor.data_contratacao} onChange={handleChange} />
        </label>

        <label>
          Formação:
          <input type="text" name="formacao" value={professor.formacao} onChange={handleChange} />
        </label>

        <label>
          Especialidade:
          <input type="text" name="especialidade" value={professor.especialidade} onChange={handleChange} />
        </label>

        <button type="submit">Atualizar</button>
        <button type="button" onClick={() => navegacao('/listaprofessor')}>Voltar</button>
      </form>
    </>
  );
}

export default AtualizarProfessor;
