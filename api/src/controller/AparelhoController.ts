import { Aparelho } from "../model/Aparelho";
import { Request, Response } from "express";

interface AparelhoDTO {
    nomeAparelho: string;
    musculoAtivado: string;
    idAparelho?: number;
}

class AparelhoController extends Aparelho {

    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const aparelhos = await Aparelho.listarAparelhos();
            return res.status(200).json(aparelhos);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json({ mensagem: 'Erro ao listar aparelhos. Entre em contato com o administrador do sistema!' });
        }
    }

    public async novo(req: Request, res: Response): Promise<Response> {
        try {
            const aparelhoRecebidoCliente: AparelhoDTO = req.body;

            const novoAparelho = new Aparelho(
                aparelhoRecebidoCliente.nomeAparelho, 
                aparelhoRecebidoCliente.musculoAtivado);

            const result = await Aparelho.cadastrarAparelho(novoAparelho);

            if (result) {
                return res.status(200).json({ mensagem: 'Aparelho cadastrado com sucesso' });
            } else {
                return res.status(400).json({ mensagem: 'Não foi possível cadastrar o aparelho. Entre em contato com o administrador do sistema!' });
            }

        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o aparelho. Entre em contato com o administrador do sistema!' });
        }
    }

    public async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idAparelho = parseInt(req.query.idAparelho as string);
            const result = await Aparelho.deletarAparelho(idAparelho);
            
            if (result) {
                return res.status(200).json({ mensagem: 'Aparelho removido com sucesso!' });
            } else {
                return res.status(401).json({ mensagem: 'Não foi possível remover o aparelho. Entre em contato com o administrador do sistema!' });
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}.`);
            return res.status(400).json({ mensagem: 'Não foi possível remover o aparelho. Entre em contato com o administrador do sistema!' });
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response>{
        try {
            const aparelhoRecebidoCliente: AparelhoDTO = req.body;

            const aparelho = new Aparelho(
                aparelhoRecebidoCliente.nomeAparelho, 
                aparelhoRecebidoCliente.musculoAtivado);

            aparelho.setIdAparelho(parseInt(req.query.idAparelho as string));

            if(await Aparelho.atualizarAparelho(aparelho)){
                return res.status(200).json({ mensagem: "Dados do aparelho atualizados com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: 'Não foi possível atualizar os dados do aparelho. Entre em contato com o administrador do sistema!' });
            }
        } catch (error) {
            console.error(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível atualizar os dados do aparelho. Entre em contato com o administrador do sistema!" });
        }
    }
}

export default AparelhoController;