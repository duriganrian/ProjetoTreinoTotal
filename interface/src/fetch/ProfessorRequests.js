import { supabase } from '../config/supabaseClient'

class ProfessorRequests {

    // ✅ Cadastrar professor (somente no banco)
    async cadastrarProfessor(professorData) {
        try {
            const celularLimpo = professorData.celular ? professorData.celular.replace(/\D/g, '') : '';
            const cpfLimpo = professorData.cpf ? professorData.cpf.replace(/\D/g, '') : '';
            const salarioNum = professorData.salario ? parseFloat(professorData.salario.toString().replace(/_/g, '')) : 0;

           const { data, error } = await supabase
  .from('professor')
  .insert([{
      nome: professorData.nome,
      email: professorData.email,
      celular: celularLimpo,
      cpf: cpfLimpo,
      data_nascimento: professorData.data_nascimento,
      data_contratacao: professorData.data_contratacao, // ✅ adicionado
      endereco: professorData.endereco || null,
      especialidade: professorData.especialidade || null,
      formacao: professorData.formacao || null
  }])
  .select();

            if (error) throw error;

            if (!data || data.length === 0) {
                console.log('Professor cadastrado, mas sem retorno de dados (normal).');
            } else {
                console.log('Professor cadastrado com sucesso:', data);
            }

            return data;

        } catch (error) {
            console.error('Erro ao cadastrar professor (mesmo que tenha cadastrado):', error);
            return null;
        }
    }

    // ✅ Listar todos os professores
    async listarProfessores() {
        try {
            const { data, error } = await supabase
                .from('professor')
                .select('*')
                .order('nome', { ascending: true });

            if (error) throw error;
            return data;

        } catch (error) {
            console.error('Erro ao listar professores:', error);
            return [];
        }
    }

    // ✅ Atualizar professor
    async atualizarProfessor(professor) {
        try {
            const { data, error } = await supabase
                .from('professor')
                .update({
                    nome: professor.nome,
                    email: professor.email,
                    celular: professor.celular ? professor.celular.replace(/\D/g, '') : '',
                    cpf: professor.cpf ? professor.cpf.replace(/\D/g, '') : '',
                    data_nascimento: professor.data_nascimento,
                    endereco: professor.endereco || null,
                    especialidade: professor.especialidade || null
                })
                .eq('id_professor', professor.id_professor)
                .select();

            if (error) throw error;
            return data && data.length > 0;

        } catch (error) {
            console.error('Erro ao atualizar professor:', error);
            return false;
        }
    }

    // ✅ Deletar professor
    async deletarProfessor(id_professor) {
        try {
            const { error } = await supabase
                .from('professor')
                .delete()
                .eq('id_professor', id_professor);

            if (error) throw error;
            return true;

        } catch (error) {
            console.error('Erro ao deletar professor:', error);
            return false;
        }
    }

    // ✅ Buscar professor por ID
    async getProfessorPorId(id_professor) {
        try {
            const { data, error } = await supabase
                .from('professor')
                .select('*')
                .eq('id_professor', id_professor)
                .single();

            if (error) throw error;
            return data;

        } catch (error) {
            console.error('Erro ao buscar professor:', error);
            return null;
        }
    }
}

export default new ProfessorRequests();
