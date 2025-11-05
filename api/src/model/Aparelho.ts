import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel().pool;

export class Aparelho {

    private idAparelho: number = 0;

    private nomeAparelho: string;

    private musculoAtivado: string;

    private situacao: boolean = true;

    constructor(_nomeAparelho: string, 
        _musculoAtivado: string) {
            
        this.nomeAparelho = _nomeAparelho;
        this.musculoAtivado = _musculoAtivado;
    }


    public setIdAparelho(_idAparelho: number): void {
        this.idAparelho = _idAparelho;
    }

    public getIdAparelho(): number {
        return this.idAparelho;
    }

    public setNomeAparelho(_nomeAparelho: string): void {
        this.nomeAparelho = _nomeAparelho;
    }

    public getNomeAparelho(): string {
        return this.nomeAparelho;
    }

    public setMusculoAtivado(_musculoAtivado: string): void {
        this.musculoAtivado = _musculoAtivado;
    }

    public getMusculoAtivado(): string {
        return this.musculoAtivado;
    }

    public setSituacao(_situacao: boolean): void {
        this.situacao = _situacao;
    }

    public getSituacao(): boolean {
        return this.situacao;
    }

    static async listarAparelhos(): Promise<Array<Aparelho> | null> {
        const listaDeAparelhos: Array<Aparelho> = [];

        const querySelectAparelho = `SELECT * FROM aparelho WHERE situacao=true ORDER BY nome_aparelho ASC;`;

        try {
            const queryReturn = await database.query(querySelectAparelho);
            queryReturn.rows.forEach(linha => {
                const novoAparelho = new Aparelho(
                    linha.nome_aparelho,
                    linha.musculo_ativado
                )
                novoAparelho.setIdAparelho(linha.id_aparelho);
                listaDeAparelhos.push(novoAparelho);
            });

            return listaDeAparelhos;
        } catch (error) {
            console.log(`Erro ao listar aparelhos: ${error}`);
            return null;
        }
    }

    static async cadastrarAparelho(aparelho: Aparelho): Promise<boolean> {
        let queryResult = false;
        try {
            const queryInsertAparelho = `INSERT INTO aparelho (nome_aparelho, musculo_ativado) 
                                        VALUES 
                                        ('${aparelho.getNomeAparelho().toUpperCase()}',
                                        '${aparelho.getMusculoAtivado().toUpperCase()}')`;

            await database.query(queryInsertAparelho)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                })
            return queryResult;
        } catch (error) {
            console.log(`Erro ao inserir aparelho: ${error}`);
            return queryResult;
        }
    }

    static async deletarAparelho(idAparelho: number): Promise<boolean> {
        let queryResult = false;

        try {
            const queryDeleteAparelho = `UPDATE aparelho 
                                            SET situacao = false 
                                            WHERE id_aparelho = ${idAparelho};`;

            await database.query(queryDeleteAparelho)
                .then(async (result) => {
                    if (result.rowCount !== 0) {
                        queryResult = true;
                    }
                })

            return queryResult;
        } catch (error) {
            console.log(`Erro ao remover aparelho: ${error}`);
            return queryResult;
        }
    }

    static async atualizarAparelho(aparelho: Aparelho): Promise<boolean> {
        let queryResult = false;
        try {
            const queryUpdateAparelho = `UPDATE aparelho SET 
                                            nome_aparelho = '${aparelho.nomeAparelho.toUpperCase()}', 
                                            musculo_ativado = '${aparelho.musculoAtivado.toUpperCase()}'
                                            WHERE id_aparelho = ${aparelho.idAparelho}`;
            await database.query(queryUpdateAparelho)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });
            return queryResult;
        } catch (error) {
            console.log(`Erro ao atualizar aparelho: ${error}`);
            return queryResult;
        }
    }

}