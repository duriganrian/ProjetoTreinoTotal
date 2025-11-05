import { supabase } from '../config/supabaseClient'

class AlunoRequests {

    // ✅ Cadastrar aluno (somente no banco)
    async cadastrarAluno(alunoData) {
        try {
            const celularLimpo = alunoData.celular.replace(/\D/g, '');
            const cpfLimpo = alunoData.cpf.replace(/\D/g, '');
            const alturaNum = parseFloat(alunoData.altura.replace(/_/g, '')) || 0;
            const pesoNum = parseFloat(alunoData.peso.replace(/_/g, '')) || 0;
            const imcNum = parseFloat(alunoData.imc) || 0;

            const { data, error } = await supabase
                .from('aluno')
                .insert([{
                    nome: alunoData.nome,
                    email: alunoData.email,
                    celular: celularLimpo,
                    data_nascimento: alunoData.dataNascimento,
                    endereco: alunoData.endereco,
                    cpf: cpfLimpo,
                    altura: alturaNum,
                    peso: pesoNum,
                    imc: imcNum
                }])
                .select(); // <--- força a API a retornar os dados

            // Se houver erro, lança
            if (error) throw error;

            // Confere se de fato inseriu algum registro
            if (!data || data.length === 0) {
                console.log('Aluno cadastrado, mas sem retorno de dados (normal).');
            }
            return data;

            console.log('Aluno cadastrado com sucesso:', data);
            return data;

        } catch (error) {
            console.error('Erro ao cadastrar aluno (mesmo que tenha cadastrado):', error);
            return null; // aqui você pode optar por retornar data em vez de null
        }
    }


    // ✅ Listar todos os alunos
    async listarAlunos() {
        try {
            const { data, error } = await supabase
                .from('aluno')
                .select('*')
                .order('nome', { ascending: true })

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao listar alunos:', error)
            return []
        }
    }

    // ✅ Atualizar aluno
    async atualizarAluno(aluno) {
        try {
            const { data, error } = await supabase
                .from('aluno')
                .update({
                    nome: aluno.nome,
                    email: aluno.email,
                    celular: aluno.celular.replace(/\D/g, ''),
                    data_nascimento: aluno.data_nascimento,
                    endereco: aluno.endereco,
                    altura: parseFloat(aluno.altura) || 0,
                    peso: parseFloat(aluno.peso) || 0,
                    imc: parseFloat(aluno.imc) || 0
                })
                .eq('id_aluno', aluno.id)
                .select(); // <-- garante que retorna os dados atualizados

            if (error) throw error;

            return data && data.length > 0; // <-- true se atualizou algum registro
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            return false;
        }
    }



    // ✅ Deletar aluno
    async deletarAluno(id_aluno) {
        try {
            const { error } = await supabase
                .from('aluno')
                .delete()
                .eq('id_aluno', id_aluno) // ✅ nome certo da coluna
            if (error) throw error
            return true
        } catch (error) {
            console.error('Erro ao deletar aluno:', error)
            return false
        }
    }


    // ✅ Recuperar um aluno específico
    async getAlunoPorId(id) {
        try {
            const { data, error } = await supabase
                .from('aluno')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Erro ao buscar aluno:', error)
            return null
        }
    }
}

export default new AlunoRequests()
