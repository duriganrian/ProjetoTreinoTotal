import { Pessoa } from "./Pessoa";
import { DatabaseModel } from "./DatabaseModel";

/**
 * Pool de conexão do banco de dados.
 */
const database = new DatabaseModel().pool;

/**
 * Classe Aluno
 * Representa um aluno no sistema, herdando características básicas de Pessoa e acrescentando propriedades e métodos específicos.
 */
export class Aluno extends Pessoa {

    /**
     * Identificador único do aluno.
     */
    private idAluno: number = 0;

    /**
     * Altura do aluno em metros.
     */
    private altura: number;

    /**
     * Peso do aluno em quilogramas.
     */
    private peso: number;

    /**
     * Índice de Massa Corporal (IMC) do aluno.
     */
    private imc: number;

    /**
     * Número de matrícula do aluno.
     */
    private matricula: string = '';

    /**
     * Construtor da classe Aluno.
     * @param _nome Nome do aluno.
     * @param _celular Telefone celular do aluno.
     * @param _cpf CPF do aluno.
     * @param _data_nascimento Data de nascimento do aluno.
     * @param _telefone Telefone do aluno.
     * @param _endereco Endereço do aluno.
     * @param _email Email do aluno.
     * @param _altura Altura do aluno.
     * @param _peso Peso do aluno.
     * @param _imc Índice de Massa Corporal (IMC) do aluno.
     */
    constructor(_nome: string, 
        _celular: string, 
        _cpf: string, 
        _data_nascimento: Date, 
        _endereco: string, 
        _email: string, 
        _altura: number, 
        _peso: number, 
        _imc: number) {
            
        super(_nome, _cpf, _data_nascimento, _celular, _endereco, _email);
        this.altura = _altura;
        this.peso = _peso;
        this.imc = _imc;
    }

    /**
     * Define o ID do aluno.
     * @param _idAluno ID a ser atribuído ao aluno.
     */
    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    /**
     * Obtém o ID do aluno.
     * @returns ID do aluno.
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define a altura do aluno.
     * @param _altura Altura a ser atribuída ao aluno.
     */
    public setAltura(_altura: number): void {
        this.altura = _altura;
    }

    /**
     * Obtém a altura do aluno.
     * @returns Altura do aluno.
     */
    public getAltura(): number {
        return this.altura;
    }

    /**
     * Define o peso do aluno.
     * @param _peso Peso a ser atribuído ao aluno.
     */
    public setPeso(_peso: number): void {
        this.peso = _peso;
    }

    /**
     * Obtém o peso do aluno.
     * @returns Peso do aluno.
     */
    public getPeso(): number {
        return this.peso;
    }

    /**
     * Define o IMC do aluno.
     * @param _imc IMC a ser atribuído ao aluno.
     */
    public setIMC(_imc: number): void {
        this.imc = _imc;
    }

    /**
     * Obtém o IMC do aluno.
     * @returns IMC do aluno.
     */
    public getIMC(): number {
        return this.imc;
    }

    /**
     * Define a matrícula do aluno.
     * @param _matricula 
     */
    public setMatricula(_matricula: string): void {
        this.matricula = _matricula;
    }

    /**
     * Obtém a matrícula do aluno.
     * @returns Matrícula do aluno.
     */
    public getMatricula(): string {
        return this.matricula;
    }

    /**
     * Retorna uma lista com todos os alunos cadastrados e ativos no banco de dados.
     * 
     * @returns {Promise<Array<Aluno> | null>} Retorna um array de objetos Aluno ou null em caso de erro.
     * 
     * Este método realiza uma consulta ao banco de dados para buscar todos os alunos com status ativo (onde `situacao=true`).
     * Para cada registro encontrado, um objeto Aluno é criado e preenchido com os dados do banco, e então adicionado a uma lista que é retornada ao final.
     * Em caso de erro durante a consulta, a função captura a exceção e retorna `null`.
     */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        // Declara um array para armazenar todos os alunos encontrados.
        const listaDeAlunos: Array<Aluno> = [];

        // Consulta SQL para selecionar alunos ativos, ordenando-os por nome.
        const querySelectAluno = `SELECT * FROM aluno WHERE situacao=true ORDER BY nome ASC;`;

        // inicia um bloco try-catch para capturar exceções durante a execução da consulta.
        try {

            // Executa a consulta SQL usando o objeto de banco de dados.
            const queryReturn = await database.query(querySelectAluno);

            // Itera sobre cada linha de resultado da consulta.
            queryReturn.rows.forEach(linha => {

                // Cria uma nova instância de Aluno com os dados da linha.
                const novoAluno = new Aluno(
                    linha.nome,
                    linha.celular,
                    linha.cpf,
                    linha.data_nascimento,
                    linha.endereco,
                    linha.email,
                    linha.altura,
                    linha.peso,
                    linha.imc
                );

                // Define o ID do aluno e a matrícula, usando os dados da linha.
                novoAluno.setIdAluno(linha.id_aluno);

                // Define a matrícula do aluno.
                novoAluno.setMatricula(linha.matricula);

                // Adiciona o objeto Aluno à lista de alunos.
                listaDeAlunos.push(novoAluno);
            });

            // Retorna a lista completa de alunos.
            return listaDeAlunos;

            // Captura exceções durante a execução da consulta.
        } catch (error) {

            // Em caso de erro, exibe a mensagem no console e retorna null.
            console.log(`Erro ao listar alunos: ${error}`);

            // Retorna null em caso de erro.
            return null;
        }
    }

    /**
     * Cadastra um novo aluno no banco de dados.
     * 
     * @param aluno objeto da classe Aluno a ser cadastrado.
     * @returns {Promise<Boolean>} Retorna true se o aluno for cadastrado com sucesso e false em caso de erro.
     * 
     * Esta função constrói uma consulta SQL para inserir os dados do aluno no banco de dados.
     * Os dados são extraídos da instância do aluno fornecida como parâmetro, e a consulta é executada
     * assíncronamente. Em caso de sucesso na inserção, a função retorna true; caso contrário, retorna false.
     */
    static async cadastrarAluno(aluno: Aluno): Promise<Boolean> {
        // Inicializa a variável para indicar o resultado da inserção como falso.
        let queryResult = false;

        // Inicia um bloco try-catch para capturar exceções durante a execução da consulta.
        try {
            // Cria a consulta SQL para inserir os dados do aluno.
            const queryInsertAluno = `INSERT INTO aluno (nome, celular, cpf, data_nascimento, endereco, email, altura, peso, imc) 
                                            VALUES 
                                            ('${aluno.getNome().toUpperCase()}', 
                                            '${aluno.getCelular()}', 
                                            '${aluno.getCpf()}', 
                                            '${aluno.getDataNascimento()}', 
                                            '${aluno.getEndereco().toUpperCase()}', 
                                            '${aluno.getEmail().toUpperCase()}', 
                                            ${aluno.getAltura()}, 
                                            ${aluno.getPeso()}, 
                                            ${aluno.getIMC()})`;

            // Executa a consulta no banco de dados.
            await database.query(queryInsertAluno)
                // Verifica o resultado da inserção.
                .then((result) => {
                    // Verifica se a inserção foi bem-sucedida.
                    if (result.rowCount !== 0) {
                        // A inserção foi realizada com sucesso.
                        queryResult = true;
                    }
                });

            // Retorna o resultado da inserção (true ou false).
            return queryResult;

            // Captura exceções durante a execução da consulta.
        } catch (error) {
            // Captura e exibe erros que possam ocorrer durante a inserção.
            console.log(`Erro ao inserir aluno: ${error}`);

            // Retorna false em caso de erro.
            return queryResult;
        }
    }

    /**
     * Deleta um aluno do banco de dados, marcando sua situação como inativa.
     * 
     * @param idAluno ID do aluno a ser deletado.
     * @returns {Promise<Boolean>} Retorna true se o aluno for deletado com sucesso e false em caso de erro.
     * 
     * Esta função constrói uma consulta SQL para atualizar o status do aluno no banco de dados.
     * O aluno é marcado como inativo (situacao = false) com base no ID fornecido.
     * Se a atualização for bem-sucedida, a função retornará true; caso contrário, retornará false.
     */
    static async deletarAluno(idAluno: number): Promise<Boolean> {
        // Inicializa a variável para indicar o resultado da operação como verdadeiro.
        let queryResult = false;

        // Inicia um bloco try-catch para capturar exceções durante a execução da consulta.
        try {
            // Cria a consulta SQL para atualizar a situação do aluno.
            const queryDeleteAluno = `UPDATE aluno SET 
                                        situacao = false 
                                        WHERE id_aluno = ${idAluno}`;

            // Executa a consulta no banco de dados.
            await database.query(queryDeleteAluno)
                // Verifica o resultado da atualização.
                .then(async (result) => {
                    // Verifica se a atualização foi bem-sucedida.
                    if (result.rowCount !== 0) {
                        // A situação foi atualizada com sucesso.
                        queryResult = true;
                    }
                });
            // Retorna o resultado da operação (true ou false).
            return queryResult;

            // Captura exceções durante a execução da consulta.
        } catch (error) {
            // Captura e exibe erros que possam ocorrer durante a operação.
            console.log(`Erro ao remover aluno: ${error}`);

            // Retorna false em caso de erro.
            return queryResult;
        }
    }

    /**
     * Atualiza as informações de um aluno no banco de dados.
     * 
     * @param aluno Instância da classe Aluno com os dados atualizados.
     * @returns {Promise<Boolean>} Retorna true se a atualização for bem-sucedida e false em caso de erro.
     * 
     * Esta função constrói uma consulta SQL para atualizar os dados do aluno no banco de dados.
     * Os campos atualizados incluem nome, CPF, data de nascimento, celular, endereço, email, altura, peso e IMC.
     * O aluno é identificado pela sua ID única (id_aluno) fornecida na instância da classe Aluno.
     */
    static async atualizarAluno(aluno: Aluno): Promise<Boolean> {
        // Inicializa a variável para indicar o resultado da operação como falso.
        let queryResult = false;
        
        // Inicia um bloco try-catch para capturar exceções durante a execução da consulta.
        try {
            // Cria a consulta SQL para atualizar os dados do aluno.
            const queryUpdateAluno = `UPDATE aluno SET 
                                            nome = '${aluno.getNome().toUpperCase()}', 
                                            cpf = '${aluno.getCpf()}', 
                                            data_nascimento = '${aluno.getDataNascimento()}', 
                                            celular = '${aluno.getCelular()}', 
                                            endereco = '${aluno.getEndereco().toUpperCase()}', 
                                            email = '${aluno.getEmail().toUpperCase()}', 
                                            altura = ${aluno.getAltura()}, 
                                            peso = ${aluno.getPeso()}, 
                                            imc = ${aluno.getIMC()}
                                            WHERE id_aluno = ${aluno.idAluno};`;

            // Executa a consulta no banco de dados.
            await database.query(queryUpdateAluno)
                // Verifica o resultado da atualização.
                .then((result) => {
                    // Verifica se a atualização foi bem-sucedida.
                    if (result.rowCount !== 0) {
                        // A atualização foi realizada com sucesso.
                        queryResult = true;
                    }
                });

            // Retorna o resultado da operação (true ou false).
            return queryResult;

        // Captura exceções durante a execução da consulta.
        } catch (error) {
            // Captura e exibe erros que possam ocorrer durante a operação.
            console.log(`Erro ao atualizar aluno: ${error}`);
            
            // Retorna false em caso de erro.
            return queryResult;
        }
    }
}