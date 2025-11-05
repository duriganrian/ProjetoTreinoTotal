import { Exercicio } from "../model/Exercicio";
import { Request, Response } from "express";

interface ExercicioDTO {
    idExercicio?: number;
    idAparelho: number;
    exercicio: string;
    regiaoCorpoAtivada: string;
    carga?: number;
    repeticoes?: number;
    series?: number;
}

class ExercicioController extends Exercicio {

    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const exercicios = await Exercicio.listarExercicios();
            return res.status(200).json(exercicios);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json({ mensagem: 'Erro ao listar as exercícios. Entre em contato com o administrador do sistema!' });
        }
    }

    public async novo(req: Request, res: Response): Promise<Response> {
        try {
            const exercicioRecebidoCliente: ExercicioDTO = req.body;

            const novoExercicio = new Exercicio(
                exercicioRecebidoCliente.idAparelho, 
                exercicioRecebidoCliente.exercicio, 
                exercicioRecebidoCliente.regiaoCorpoAtivada);

            const result = await Exercicio.cadastrarExercicio(novoExercicio);
            
            if (result) {
                return res.status(200).json({ mensagem: 'Exercício cadastrado com sucesso' });
            } else {
                return res.status(400).json({ mensagem: 'Não foi possível cadastrar o exercício. Entre em contato com o administrador do sistema!' });
            }

        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o exercício. Entre em contato com o administrador do sistema!' });
        }
    }

    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idExercicio = parseInt(req.query.idExercicio as string);
            
            const result = await Exercicio.deletarExercicio(idExercicio);
            
            if (result) {
                return res.status(200).json({ mensagem: 'Exercício removido com sucesso!' });
            } else {
                return res.status(401).json({ mensagem: 'Não foi possível remover o exercício. Entre em contato com o administrador do sistema!' });
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}.`);
            return res.status(400).json({ mensagem: 'Não foi possível remover o exercício. Entre em contato com o administrador do sistema!' });
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const exercicioRecebidoCliente: ExercicioDTO = req.body;

            const exercicioAtualizado = new Exercicio(
                exercicioRecebidoCliente.idAparelho, 
                exercicioRecebidoCliente.exercicio, 
                exercicioRecebidoCliente.regiaoCorpoAtivada);

            exercicioAtualizado.setIdExercicio(parseInt(req.query.idExercicio as string));

            if (await Exercicio.atualizarExercicio(exercicioAtualizado)) {
                return res.status(200).json({ mensagem: "Dados do exercício atualizados com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: 'Não foi possível atualizar os dados do exercício. Entre em contato com o administrador do sistema!' });
            }
        } catch (error) {
            console.error(`Erro ao acessar o modelo: ${error}`);
            return res.json({ mensagem: "Não foi possível atualizar os dados do exercício. Entre em contato com o administrador do sistema!" });
        }
    }
}

export default ExercicioController;