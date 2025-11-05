import { Professor } from "../model/Professor";
import { Request, Response } from "express";

interface ProfessorDTO {
    nome: string;
    cpf: string;
    dataNascimento: Date;
    celular: string;
    endereco: string;
    email: string;
    dataContratacao: Date;
    formacao: string;
    especialidade: string;
    senha?: string;
    idProfessor?: number;
    cref?: string;
}

class ProfessorController extends Professor {

    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const professores = await Professor.listarProfessores();
            return res.status(200).json(professores);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json({ mensagem: 'Erro ao listar os professores. Entre em contato com o administrador do sistema!' });
        }
    }

    public async novo(req: Request, res: Response): Promise<Response> {
        try {
            const professoreRecebidoCliente: ProfessorDTO = req.body;
            
            const novoProfessor = new Professor(
                professoreRecebidoCliente.nome,
                professoreRecebidoCliente.cpf,
                professoreRecebidoCliente.dataNascimento,
                professoreRecebidoCliente.celular,
                professoreRecebidoCliente.endereco,
                professoreRecebidoCliente.email,
                professoreRecebidoCliente.dataContratacao,
                professoreRecebidoCliente.formacao,
                professoreRecebidoCliente.especialidade);

            const result = await Professor.cadastrarProfessor(novoProfessor);

            if (result) {
                return res.status(200).json({ mensagem: 'Professor cadastrado com sucesso' });
            } else {
                return res.status(400).json({ mensagem: 'Não foi possível cadastrar o professor. Entre em contato com o administrador do sistema!' });
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o professor. Entre em contato com o administrador do sistema!' });
        }
    }

    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idProfessor = parseInt(req.query.idProfessor as string);
            const result = await Professor.deletarProfessor(idProfessor);

            if (result) {
                return res.status(200).json({ mensagem: 'Professor removido com sucesso' });
            } else {
                return res.status(401).json({ mensagem: 'Não foi possível remover o professor. Entre em contato com o administrador do sistema!' });
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}.`);
            return res.status(400).json({ mensagem: 'Não foi possível remover o professor. Entre em contato com o administrador do sistema!' });
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const professorRecebidoCliente: ProfessorDTO = req.body;

            const professor = new Professor(
                professorRecebidoCliente.nome, 
                professorRecebidoCliente.cpf, 
                professorRecebidoCliente.dataNascimento, 
                professorRecebidoCliente.celular, 
                professorRecebidoCliente.endereco, 
                professorRecebidoCliente.email, 
                professorRecebidoCliente.dataContratacao, 
                professorRecebidoCliente.formacao, 
                professorRecebidoCliente.especialidade);

            professor.setIdProfessor(parseInt(req.query.idProfessor as string));

            const resultadoAtualizacao = await Professor.atualizarProfessor(professor);

            if (resultadoAtualizacao) {
                return res.status(200).json({ mensagem: "Dados do professor atualizados com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: 'Não foi possível atualizar os dados do professor. Entre em contato com o administrador do sistema!' });
            }
        } catch (error) {
            console.error(`Erro ao acessar o modelo: ${error}`);
            return res.json({ mensagem: "Não foi possível atualizar os dados do professor. Entre em contato com o administrador do sistema!" });
        }
    }
}

export default ProfessorController;