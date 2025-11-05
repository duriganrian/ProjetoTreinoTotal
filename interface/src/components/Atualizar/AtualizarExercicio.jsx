import React, { useState, useEffect } from 'react';
import './AtualizarExercicio.css';
import { useLocation } from 'react-router';
import ExercicioRequests from '../../fetch/ExercicioRequests';
import AparelhoRequests from '../../fetch/AparelhoRequests';

function AtualizarExercicio() {
  const location = useLocation();
  const atualizar = location.state.atualizar;

  const [exercicioData, setExercicioData] = useState({
    id_exercicio: atualizar.id_exercicio,
    id_aparelho: atualizar.id_aparelho,
    exercicio: atualizar.exercicio || '',
    regiao_corpo_ativada: atualizar.regiao_corpo_ativada || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercicioData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!exercicioData.exercicio) {
      alert('O campo "Exercício" é obrigatório');
      return;
    }

    try {
      const atualizado = await ExercicioRequests.atualizarExercicio(exercicioData);
      if (atualizado) {
        alert(`Exercício "${exercicioData.exercicio}" atualizado com sucesso.`);
        window.location.href = '/ListaExercicio';
      } else {
        alert('Erro ao atualizar o exercício!');
      }
    } catch (error) {
      console.error('Erro ao atualizar exercício:', error);
      alert('Erro ao atualizar o exercício!');
    }
  };

  const [aparelhos, setAparelhos] = useState([]);

  useEffect(() => {
    const fetchAparelhos = async () => {
      const response = await AparelhoRequests.listarAparelhos();
      if (response) setAparelhos(response);
    };
    fetchAparelhos();
  }, []);

  return (
    <>
      <h1 className="titulo-exercicio-atualizar">Atualizar Exercício</h1>
      <form onSubmit={handleSubmit} className="FormAtualizarExercicio">
        <div className="GrupoExercicio">
          <label className="label-exercicio">Nome do Aparelho</label>
          <select
            className="seletor-aparelho-exercicio"
            name="id_aparelho"
            value={exercicioData.id_aparelho || ''}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Aparelho</option>
            {aparelhos.map(aparelho => (
              <option key={aparelho.id_aparelho} value={aparelho.id_aparelho}>
                {aparelho.nome_aparelho}
              </option>
            ))}
          </select>
        </div>

        <div className="GrupoExercicio">
          <label className="label-exercicio">Exercício</label>
          <input
            type="text"
            name="exercicio"
            className="CampoExercicio"
            value={exercicioData.exercicio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="GrupoExercicio">
          <label className="label-exercicio">Região Corpo Ativada</label>
          <input
            type="text"
            name="regiao_corpo_ativada"
            className="CampoExercicio"
            value={exercicioData.regiao_corpo_ativada}
            onChange={handleChange}
          />
        </div>

        <div className="acoes-exercicio-atualizar">
          <button type="submit" className="BotaoEnviar">Enviar</button>
          <button
            type="button"
            className="BotaoVoltar"
            onClick={() => window.location.href = '/ListaExercicio'}
          >
            Exercícios
          </button>
        </div>
      </form>
    </>
  );
}

export default AtualizarExercicio;
