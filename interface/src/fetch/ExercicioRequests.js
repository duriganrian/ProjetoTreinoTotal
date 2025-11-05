import { supabase } from '../config/supabaseClient';

class ExercicioRequests {

  async cadastrarExercicio(exercicioData) {
    try {
      // Validar o campo obrigatório
      if (!exercicioData.exercicio) {
        throw new Error('O campo "exercicio" é obrigatório');
      }

      const { data, error } = await supabase
        .from('exercicio')
        .insert([{
          exercicio: exercicioData.exercicio,
          id_aparelho: exercicioData.id_aparelho || null,
          regiao_corpo_ativada: exercicioData.regiao_corpo_ativada || null
        }])
        .select();

      if (error) throw error;

      return data;

    } catch (error) {
      console.error('Erro ao cadastrar exercício:', error);
      return null;
    }
  }

  async listarExercicios() {
    try {
      const { data, error } = await supabase
        .from('exercicio')
        .select('*')
        .order('exercicio', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao listar exercícios:', error);
      return [];
    }
  }

  async atualizarExercicio(exercicioData) {
    try {
      if (!exercicioData.exercicio) {
        throw new Error('O campo "exercicio" é obrigatório');
      }

      const { data, error } = await supabase
        .from('exercicio')
        .update({
          exercicio: exercicioData.exercicio,
          id_aparelho: exercicioData.id_aparelho || null,
          regiao_corpo_ativada: exercicioData.regiao_corpo_ativada || null
        })
        .eq('id_exercicio', exercicioData.id_exercicio)
        .select();

      if (error) throw error;
      return data && data.length > 0;
    } catch (error) {
      console.error('Erro ao atualizar exercício:', error);
      return false;
    }
  }

  async deletarExercicio(id_exercicio) {
    try {
      const { error } = await supabase
        .from('exercicio')
        .delete()
        .eq('id_exercicio', id_exercicio);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar exercício:', error);
      return false;
    }
  }

  async getExercicioPorId(id_exercicio) {
    try {
      const { data, error } = await supabase
        .from('exercicio')
        .select('*')
        .eq('id_exercicio', id_exercicio)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar exercício:', error);
      return null;
    }
  }
}

export default new ExercicioRequests();
