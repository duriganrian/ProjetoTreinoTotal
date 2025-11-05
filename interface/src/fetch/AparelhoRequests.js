import { supabase } from '../config/supabaseClient';

class AparelhoRequests {

    // ✅ Cadastrar aparelho
    async cadastrarAparelho(aparelhoData) {
        try {
            const { data, error } = await supabase
                .from('aparelho')
                .insert([{
                    nome_aparelho: aparelhoData.nome_aparelho,
                    musculo_ativado: aparelhoData.musculo_ativado || null
                }])
                .select();

            if (error) throw error;

            if (!data || data.length === 0) {
                console.log('Aparelho cadastrado, mas sem retorno de dados (normal).');
            } else {
                console.log('Aparelho cadastrado com sucesso:', data);
            }

            return data;

        } catch (error) {
            console.error('Erro ao cadastrar aparelho (mesmo que tenha cadastrado):', error);
            return null;
        }
    }

    // ✅ Listar todos os aparelhos
    async listarAparelhos() {
        try {
            const { data, error } = await supabase
                .from('aparelho')
                .select('*')
                .order('nome_aparelho', { ascending: true });

            if (error) throw error;
            return data;

        } catch (error) {
            console.error('Erro ao listar aparelhos:', error);
            return [];
        }
    }

    // ✅ Atualizar aparelho
    async atualizarAparelho(aparelho) {
        try {
            const { data, error } = await supabase
                .from('aparelho')
                .update({
                    nome_aparelho: aparelho.nome_aparelho,
                    musculo_ativado: aparelho.musculo_ativado || null
                })
                .eq('id_aparelho', aparelho.id_aparelho)
                .select();

            if (error) throw error;
            return data && data.length > 0;

        } catch (error) {
            console.error('Erro ao atualizar aparelho:', error);
            return false;
        }
    }

    async deletarAparelho(id_aparelho) {
        try {
            // 1️⃣ Buscar os exercícios vinculados ao aparelho
            const { data: exercicios, error: errExercicios } = await supabase
                .from('exercicio')
                .select('id_exercicio')
                .eq('id_aparelho', id_aparelho);

            if (errExercicios) throw errExercicios;

            const exercicioIds = exercicios.map(e => e.id_exercicio);

            // 2️⃣ Deletar registros em exercicio_treino vinculados aos exercícios
            if (exercicioIds.length > 0) {
                const { error: errTreinos } = await supabase
                    .from('exercicio_treino')
                    .delete()
                    .in('id_exercicio', exercicioIds);
                if (errTreinos) throw errTreinos;

                // 3️⃣ Deletar os exercícios
                const { error: errDelExercicios } = await supabase
                    .from('exercicio')
                    .delete()
                    .in('id_exercicio', exercicioIds);
                if (errDelExercicios) throw errDelExercicios;
            }

            // 4️⃣ Deletar o aparelho
            const { error: errDelAparelho } = await supabase
                .from('aparelho')
                .delete()
                .eq('id_aparelho', id_aparelho);
            if (errDelAparelho) throw errDelAparelho;

            return true;

        } catch (error) {
            console.error('Erro ao deletar aparelho e dependências:', error);
            return false;
        }
    }


    // ✅ Buscar aparelho por ID
    async getAparelhoPorId(id_aparelho) {
        try {
            const { data, error } = await supabase
                .from('aparelho')
                .select('*')
                .eq('id_aparelho', id_aparelho)
                .single();

            if (error) throw error;
            return data;

        } catch (error) {
            console.error('Erro ao buscar aparelho:', error);
            return null;
        }
    }
}

export default new AparelhoRequests();
