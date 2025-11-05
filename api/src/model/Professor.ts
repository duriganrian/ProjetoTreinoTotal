import { Pessoa } from "./Pessoa";
import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados.
 */
const database = new DatabaseModel().pool;

export class Professor extends Pessoa {

    private idProfessor: number = 0;

    private dataContratacao: Date;

    private formacao: string;

    private especialidade: string;

    private cref: string = '';

    constructor(_nome: string, 
        _cpf: string,
         _data_nascimento: Date, 
         _telefone: string, 
         _endereco: string, 
         _email: string, 
         _dataContratacao: Date, 
         _formacao: string, 
         _especialidade: string) {

        super(_nome, _cpf, _data_nascimento, _telefone, _endereco, _email);
        this.dataContratacao = _dataContratacao;
        this.formacao = _formacao;
        this.especialidade = _especialidade;
    }

    public setIdProfessor(idProfessor: number): void {
        this.idProfessor = idProfessor;
    }

    public getIdProfessor(): number {
        return this.idProfessor;
    }

    public setDataContratacao(_dataContratacao: Date): void {
        this.dataContratacao = _dataContratacao;
    }

    public getDataContratacao(): Date {
        return this.dataContratacao;
    }

    public setFormacao(_formacao: string): void {
        this.formacao = _formacao;
    }

    public getFormacao(): string {
        return this.formacao;
    }

    public setEspecialidade(_especialidade: string): void {
        this.especialidade = _especialidade;
    }

    public getEspecialidade(): string {
        return this.especialidade;
    }

    public setCref(_cref: string): void {
        this.cref = _cref;
    }

    public getCref(): string {
        return this.cref;
    }

    static async listarProfessores(): Promise<Array<Professor> | null> {
        const listaDeProfessores: Array<Professor> = [];
        const querySelectProfessor = `SELECT * FROM professor WHERE situacao = true AND nome != UPPER('admin') ORDER BY nome ASC`;
        try {
            const queryReturn = await database.query(querySelectProfessor);
            queryReturn.rows.forEach(linha => {
                const novoProfessor = new Professor(
                    linha.nome,
                    linha.cpf,
                    linha.data_nascimento,
                    linha.celular,
                    linha.endereco,
                    linha.email,
                    linha.data_contratacao,
                    linha.formacao,
                    linha.especialidade
                );

                novoProfessor.setIdProfessor(linha.id_professor);
                novoProfessor.setCref(linha.cref);
                listaDeProfessores.push(novoProfessor);
            });
            return listaDeProfessores;
        } catch (error) {
            console.log(`Erro ao listar professores: ${error}`);
            return null;
        }
    }

    static async cadastrarProfessor(professor: Professor): Promise<boolean> {
        let queryResult = false;

        try {
            const queryInsertProfessor = `INSERT INTO professor (nome, cpf, data_nascimento, celular, endereco, email, senha, data_contratacao, formacao, especialidade) 
                                            VALUES 
                                            ('${professor.getNome().toUpperCase()}',
                                            '${professor.getCpf()}',
                                            '${professor.getDataNascimento()}',
                                            '${professor.getCelular()}',
                                            '${professor.getEndereco().toUpperCase()}',
                                            '${professor.getEmail().toUpperCase()}',
                                            '${professor.getCpf()}',
                                            '${professor.getDataContratacao()}',
                                            '${professor.getFormacao().toUpperCase()}',
                                            '${professor.getEspecialidade().toUpperCase()}');`;

            await database.query(queryInsertProfessor)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                })

            return queryResult;
        } catch (error) {
            console.log(`Erro ao inserir professor: ${error}`);
            return queryResult;
        }
    }
    
    static async deletarProfessor(idProfessor: number): Promise<Boolean> {
        let queryResult = false;
        try {
            const queryDeleteProfessor = `UPDATE professor SET 
                                            situacao = false 
                                            WHERE id_professor = ${idProfessor};`;
            
            await database.query(queryDeleteProfessor)
                .then((result) => {
                    if (result.rowCount !== 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro ao remover professor: ${error}`);
            return queryResult;
        }
    }

    static async atualizarProfessor(professor: Professor): Promise<Boolean> {
        let queryResult = false;
        try {
            const queryUpdateProfessor = `UPDATE professor SET 
                                                nome = '${professor.getNome().toUpperCase()}', 
                                                cpf = '${professor.getCpf()}', 
                                                celular = '${professor.getCelular()}', 
                                                data_nascimento = '${professor.getDataNascimento()}',
                                                endereco = '${professor.getEndereco().toUpperCase()}', 
                                                email = '${professor.getEmail().toUpperCase()}', 
                                                data_contratacao = '${professor.getDataContratacao()}',
                                                formacao = '${professor.getFormacao().toUpperCase()}', 
                                                especialidade = '${professor.getEspecialidade().toUpperCase()}'
                                                WHERE id_professor = ${professor.getIdProfessor()};`;

            await database.query(queryUpdateProfessor)
                .then((result) => {
                    if (result.rowCount !== 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro ao atualizar professor: ${error}`);
            return queryResult;
        }
    }
}