import { supabase } from '../config/supabaseClient';

class TreinoRequests {

    // 1️⃣ Cadastrar treino
    async cadastrarTreino(treino) {
        const { data, error } = await supabase
            .from('treino')
            .insert([{ id_aluno: treino.id_aluno, id_professor: treino.id_professor }])
            .select();
        if (error) throw error;
        return data; // retorna array com id_treino
    }

    // 2️⃣ Cadastrar exercícios do treino
    async cadastrarExercicioTreino(exercicioTreino) {
        const { data, error } = await supabase
            .from('exercicio_treino')
            .insert([{
                id_treino: exercicioTreino.id_treino,
                id_exercicio: exercicioTreino.id_exercicio,
                repeticoes: exercicioTreino.repeticoes || 10,
                carga: exercicioTreino.carga || 0,
                series: exercicioTreino.series || 3,
                situacao: true
            }])
            .select();
        if (error) throw error;
        return data;
    }


    async listarTreinos(tipoBusca, valorBusca) {
    try {
        let alunoFilter = null;
        if (tipoBusca === 'matricula') {
            const { data: alunos, error: erroAluno } = await supabase
                .from('aluno')
                .select('*')
                .eq('matricula', valorBusca);
            if (erroAluno) throw erroAluno;
            if (!alunos || alunos.length === 0) return { treino: { treinos: [] } };
            alunoFilter = alunos[0].id_aluno;
        } else if (tipoBusca === 'nome') {
            const { data: alunos, error: erroAluno } = await supabase
                .from('aluno')
                .select('*')
                .ilike('nome', `%${valorBusca}%`);
            if (erroAluno) throw erroAluno;
            if (!alunos || alunos.length === 0) return { treino: { treinos: [] } };
            alunoFilter = alunos[0].id_aluno;
        }

        const { data, error } = await supabase
            .from('treino')
            .select(`
                *,
                aluno(*),
                professor(*),
                exercicio_treino(*)
            `)
            .eq('id_aluno', alunoFilter);

        if (error) throw error;

        if (!data || data.length === 0) return { treino: { treinos: [] } };

        const treinosFormatados = data.map(t => ({
            id_treino: t.id_treino,
            professor: { nome_professor: t.professor.nome || t.professor.nome_professor },
            exercicios: t.exercicio_treino.map(et => ({
                id: et.id_exercicio_treino,
                exercicio: et.nome || et.nome_exercicio || `Exercicio ${et.id_exercicio}`,
                repeticoes: et.repeticoes,
                carga: et.carga,
                series: et.series
            }))
        }));

        return {
            treino: {
                treinos: treinosFormatados,
                nome_aluno: data[0].aluno.nome
            }
        };

    } catch (error) {
        console.error('Erro ao listar treinos:', error);
        return { treino: { treinos: [] } };
    }
}



    // ✅ Atualizar treino
    async atualizarTreino(treino) {
        try {
            const { data, error } = await supabase
                .from('treino')
                .update({
                    id_aluno: treino.id_aluno,
                    id_professor: treino.id_professor,
                    situacao: treino.situacao !== undefined ? treino.situacao : true
                })
                .eq('id_treino', treino.id_treino)
                .select();

            if (error) throw error;
            return data && data.length > 0;

        } catch (error) {
            console.error('Erro ao atualizar treino:', error);
            return false;
        }
    }

    // ✅ Deletar treino
    async deletarTreino(id_treino) {
        try {
            const { error } = await supabase
                .from('treino')
                .delete()
                .eq('id_treino', id_treino);

            if (error) throw error;
            return true;

        } catch (error) {
            console.error('Erro ao deletar treino:', error);
            return false;
        }
    }

    // ✅ Buscar treino por ID
    async getTreinoPorId(id_treino) {
        try {
            const { data, error } = await supabase
                .from('treino')
                .select('*')
                .eq('id_treino', id_treino)
                .single();

            if (error) throw error;
            return data;

        } catch (error) {
            console.error('Erro ao buscar treino:', error);
            return null;
        }
    }
}

export default new TreinoRequests();
