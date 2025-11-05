import { Aluno } from "../model/Aluno";
import { Request, Response } from "express";

/** 
 * Interface AlunoDTO
 * Representa os dados de um aluno em um sistema educacional, incluindo informações pessoais e métricas físicas.
 * Utilizado para padronizar o recebimento de dados de alunos em requisições HTTP.
 * 
 * Atributos:
 * - nome: string - Nome completo do aluno.
 * - cpf: string - CPF do aluno, utilizado como identificador único.
 * - celular: string - Número de celular do aluno.
 * - dataNascimento: Date - Data de nascimento do aluno.
 * - email: string - Endereço de e-mail para comunicação.
 * - telefone: string - Número de telefone fixo, se disponível.
 * - endereco: string - Endereço residencial completo do aluno.
 * - altura: number - Altura em metros.
 * - peso: number - Peso em quilogramas.
 * - imc: number - Índice de Massa Corporal, calculado com altura e peso.
 * - senha?: string - Senha para autenticação, opcional.
 * - matricula?: string - Número de matrícula do aluno, opcional.
 * - idAluno?: number - Identificador único do aluno, opcional.
 */
interface AlunoDTO {
    nome: string;
    cpf: string;
    celular: string;
    dataNascimento: Date;
    email: string;
    telefone: string;
    endereco: string;
    altura: number;
    peso: number;
    imc: number;
    senha?: string;
    matricula?: string;
    idAluno?: number;
}

/**
 * Classe AlunoController
 * Controlador para ações relacionadas a alunos no sistema.
 * Responsável por intermediar as requisições HTTP e o modelo de dados.
 */
class AlunoController extends Aluno {

    /**
     * Função para listar todos os alunos cadastrados no sistema.
     * 
     * @param req Objeto de requisição do cliente.
     * @param res Objeto de resposta para o cliente.
     * @returns Uma lista de alunos cadastrados no sistema.
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        // inicia um bloco try-catch para capturar possíveis erros
        try {
            
            // chama a função listarAlunos do modelo Aluno e armazena seu resultado na variável alunos
            const alunos = await Aluno.listarAlunos();

            // retorna um status 200 com a lista de alunos em formato JSON
            return res.status(200).json(alunos);

            // caso ocorra um erro, captura a exceção e retorna um status 400 com uma mensagem de erro
        } catch (error) {
            
            // exibe o erro no console
            console.log(`Erro ao acessar o modelo: ${error}`);

            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json({ mensagem: 'Erro ao listar as alunos. Entre em contato com o administrador do sistema!' });
        }
    }

    /**
     * Função para cadastrar um novo aluno no sistema.
     * 
     * @param req Objeto de requisição do cliente.
     * @param res Objeto de resposta para o cliente.
     * @returns Mensagem de sucesso ou erro ao cadastrar o aluno
     */
    public async novo(req: Request, res: Response): Promise<Response> {
        // inicia um bloco try-catch para capturar possíveis erros
        try {
           
            // recebe os dados do aluno do corpo da requisição e armazena na variável alunoRecebidoCliente
            const alunoRecebidoCliente: AlunoDTO = req.body;

            // cria um novo objeto Aluno com os dados recebidos do cliente
            const novoAluno = new Aluno(
                alunoRecebidoCliente.nome,
                alunoRecebidoCliente.celular,
                alunoRecebidoCliente.cpf,
                alunoRecebidoCliente.dataNascimento,
                alunoRecebidoCliente.endereco,
                alunoRecebidoCliente.email,
                alunoRecebidoCliente.altura,
                alunoRecebidoCliente.peso,
                alunoRecebidoCliente.imc);

            // chama a função cadastrarAluno do modelo Aluno e armazena seu resultado na variável result
            const result = await Aluno.cadastrarAluno(novoAluno);

            // se o resultado for verdadeiro, retorna um status 200 com uma mensagem de sucesso
            if (result) {
                
                // retorna um status 200 com uma mensagem de sucesso
                return res.status(200).json({ mensagem: 'Aluno cadastrado com sucesso' });
           
                // se o resultado for falso, retorna um status 401 com uma mensagem de erro
            } else {
               
                // retorna um status 400 com uma mensagem de erro
                return res.status(400).json({ mensagem: 'Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema!' });
            }

        // caso ocorra um erro, captura a exceção e retorna um status 400 com uma mensagem de erro
        } catch (error) {
            
            // exibe o erro no console
            console.log(`Erro ao acessar o modelo: ${error}`);
            
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema!' });
        }
    }

    /**
     * Função para remover um aluno do sistema.
     * 
     * @param req Objeto de requisição do cliente.
     * @param res Objeto de resposta para o cliente.
     * @returns Mensagem de sucesso ou erro ao deletar o aluno
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        // inicia um bloco try-catch para capturar possíveis erros
        try {
            
            // recebe o id do aluno a ser removido da query da requisição
            const idAluno = parseInt(req.query.idAluno as string);

            // chama a função deletarAluno do modelo Aluno e armazena seu resultado na variável result
            const result = await Aluno.deletarAluno(idAluno);

            // se o resultado for verdadeiro, retorna um status 200 com uma mensagem de sucesso
            if (result) {
               
                // retorna um status 200 com uma mensagem de sucesso
                return res.status(200).json({ mensagem: 'Aluno removido com sucesso!' });
            
                // se o resultado for falso, retorna um status 401 com uma mensagem de erro
            } else {
                
                // retorna um status 400 com uma mensagem de erro
                return res.status(400).json({ mensagem: 'Não foi possível remover o aluno. Entre em contato com o administrador do sistema!' });
            }

        // caso ocorra um erro, captura a exceção e retorna um status 400 com uma mensagem de erro
        } catch (error) {

            // exibe o erro no console
            console.log(`Erro ao acessar o modelo: ${error}.`);
            
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json({ mensagem: "Não foi possível remover o aluno. Entre em contato com o administrador do sistema!" });
        }
    }

    /**
     * Função para atualizar os dados de um aluno no sistema.
     * 
     * @param req Objeto de requisição do cliente.
     * @param res Objeto de resposta para o cliente.
     * @returns Mensagem de sucesso ou erro ao atualizar o aluno
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        // inicia um bloco try-catch para capturar possíveis erros
        try {
            
            // recebe os dados do aluno do corpo da requisição e armazena na variável alunoRecebidoCliente
            const alunoRecebidoCliente: AlunoDTO = req.body;

            // cria um novo objeto Aluno com os dados recebidos do cliente
            const aluno = new Aluno(
                alunoRecebidoCliente.nome,
                alunoRecebidoCliente.celular,
                alunoRecebidoCliente.cpf,
                alunoRecebidoCliente.dataNascimento,
                alunoRecebidoCliente.endereco,
                alunoRecebidoCliente.email,
                alunoRecebidoCliente.altura,
                alunoRecebidoCliente.peso,
                alunoRecebidoCliente.imc);

            // recebe o id do aluno a ser removido da query da requisição
            aluno.setIdAluno(parseInt(req.query.idAluno as string));

            // chama a função atualizarAluno do modelo Aluno e armazena seu resultado na variável result
            const result = await Aluno.atualizarAluno(aluno);

            // se o resultado for verdadeiro, retorna um status 200 com uma mensagem de sucesso
            if (result) {

                // retorna um status 200 com uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Dados do aluno atualizados com sucesso!" });

            // se o resultado for falso, retorna um status 401 com uma mensagem de erro
            } else {

                // retorna um status 400 com uma mensagem de erro
                return res.status(400).json({ mensagem: 'Não foi possível atualizar os dados do aluno. Entre em contato com o administrador do sistema!'});
            }

        // caso ocorra um erro, captura a exceção e retorna um status 400 com uma mensagem de erro
        } catch (error) {

            // exibe o erro no console
            console.error(`Erro ao acessar o modelo: ${error}`);

            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json({ mensagem: "Não foi possível atualizar os dados do aluno. Entre em contato com o administrador do sistema!" })
        }
    }
}

export default AlunoController;