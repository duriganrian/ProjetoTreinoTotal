import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados.
 */
const database = new DatabaseModel().pool;

export class Exercicio {

    private idExercicio: number = 0;

    private idAparelho: number;

    private exercicio: string;

    private carga: number = 0;

    private repeticoes: number = 0;

    private series: number = 0;

    private regiaoCorpoAtivada: string;

    private situacao: boolean = true;

    constructor(_idAparelho: number, 
        _exercicio: string, 
        _regiaoCorpoAtivada: string) {
            
        this.idAparelho = _idAparelho;
        this.exercicio = _exercicio;
        this.regiaoCorpoAtivada = _regiaoCorpoAtivada;
    }

    public setIdExercicio(_idExercicio: number): void {
        this.idExercicio = _idExercicio;
    }

    public getIdExercicio(): number {
        return this.idAparelho;
    }

    public setIdAparelho(_idAparelho: number): void {
        this.idAparelho = _idAparelho;
    }

    public getIdAparelho(): number {
        return this.idAparelho;
    }

    public setExercicio(_exercicio: string): void {
        this.exercicio = _exercicio;
    }

    public getExercicio(): string {
        return this.exercicio;
    }

    public setCarga(_carga: number): void {
        this.carga = _carga;
    }

    public getCarga(): number {
        return this.carga;
    }

    public setSeries(_series: number): void {
        this.series = _series;
    }

    public getSeries(): number {
        return this.series;
    }

    public setRepeticoes(_repeticoes: number): void {
        this.repeticoes = _repeticoes;
    }

    public getRepeticoes(): number {
        return this.repeticoes;
    }

    public setRegiaoCorpoAtivada(_regiaoCorpoAtivada: string): void {
        this.regiaoCorpoAtivada = _regiaoCorpoAtivada;
    }

    public getRegiaoCorpoAtivada(): string {
        return this.regiaoCorpoAtivada;
    }

    public setSituacao(_situacao: boolean): void {
        this.situacao = _situacao;
    }

    public getSituacao(): boolean {
        return this.situacao;
    }

    static async listarExercicios(): Promise<Array<Exercicio> | null> {
        const listaDeExercicios: Array<Exercicio> = [];
        const querySelectExercicio = `SELECT * FROM exercicio WHERE situacao = true ORDER BY exercicio ASC;`;
        try {
            const queryReturn = await database.query(querySelectExercicio);
            queryReturn.rows.forEach(linha => {
                const novoExercicio = new Exercicio(
                    linha.id_aparelho,
                    linha.exercicio,
                    linha.regiao_corpo_ativada
                )
                novoExercicio.setIdExercicio(linha.id_exercicio)
                listaDeExercicios.push(novoExercicio);
            });

            return listaDeExercicios;
        } catch (error) {
            console.log(`Erro ao listar exercícios: ${error}`);
            return null;
        }
    }

    static async cadastrarExercicio(exercicio: Exercicio): Promise<boolean> {
        let queryResult = false;
        try {
            const queryInsertExercicio = `INSERT INTO exercicio (id_aparelho, exercicio, regiao_corpo_ativada) 
                                            VALUES 
                                            ('${exercicio.getIdAparelho()}', 
                                            '${exercicio.getExercicio().toUpperCase()}', 
                                            '${exercicio.getRegiaoCorpoAtivada().toUpperCase()}')`;

            await database.query(queryInsertExercicio)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro ao inserir exercício: ${error}`);
            return queryResult;
        }
    }

    static async deletarExercicio(idExercicio: number): Promise<boolean> {
        let queryResult = false;
        try {
            const queryDeleteExercicio = `UPDATE exercicio SET 
                                            situacao = false 
                                            WHERE id_exercicio = ${idExercicio};`;

            await database.query(queryDeleteExercicio)
                .then((result) => {
                    if (result.rowCount !== 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro ao remover exercício: ${error}`);
            return queryResult;
        }
    }

    static async atualizarExercicio(exercicio: Exercicio): Promise<boolean> {
        let queryResult = false;
        try {
            const queryUpdateExercicio = `UPDATE exercicio SET 
                                              id_aparelho = ${exercicio.getIdAparelho()},
                                              exercicio = '${exercicio.getExercicio().toUpperCase()}',
                                              regiao_corpo_ativada = '${exercicio.getRegiaoCorpoAtivada().toUpperCase()}'
                                          WHERE id_exercicio = ${exercicio.getIdExercicio()}`;

            await database.query(queryUpdateExercicio)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro ao atualizar exercício: ${error}`);
            return queryResult;
        }
    }
}