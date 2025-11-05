import express from 'express';
import AlunoController from "./controller/AlunoController";
import ProfessorController from "./controller/ProfessorController";
import AparelhoController from "./controller/AparelhoController";
import ExercicioController from "./controller/ExercicioController";
import TreinoController from './controller/TreinoController';
import { Authentication } from './utils/Authentication';
import { SERVER_ROUTES } from './appconfig';

const alunoController = new AlunoController('', '', '', new Date(), '', '', 0, 0, 0);
const professorController = new ProfessorController('', '', new Date(), '', '', '', new Date(), '', '');
const aparelhoController = new AparelhoController('', '');
const exercicioController = new ExercicioController( 0, '', '');
const treinoController = new TreinoController(0, 0, []);

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Olá");
});

/**
 * rotas de autenticaçao
 */
router.post(SERVER_ROUTES.LOGIN, Authentication.validacaoUsuario);

/**
 * Rotas para lidar com a entidade aluno
 */
router.get(SERVER_ROUTES.LISTAR_ALUNOS, Authentication.verifyToken, alunoController.todos);
router.post(SERVER_ROUTES.CADASTRAR_ALUNO, Authentication.verifyToken, alunoController.novo);
router.put(SERVER_ROUTES.REMOVER_ALUNO, Authentication.verifyToken, alunoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_ALUNO, Authentication.verifyToken, alunoController.atualizar);

/**
 * Rotas para lidar com a entidade professor
 */
router.get(SERVER_ROUTES.LISTAR_PROFESSORES, Authentication.verifyToken, professorController.todos);
router.post(SERVER_ROUTES.CADASTRAR_PROFESSOR, Authentication.verifyToken, professorController.novo);
router.put(SERVER_ROUTES.REMOVER_PROFESSOR, Authentication.verifyToken, professorController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_PROFESSOR, Authentication.verifyToken, professorController.atualizar);

/*
* Rotas para lidar com a entidade aparelho
*/
router.get(SERVER_ROUTES.LISTAR_APARELHOS, Authentication.verifyToken, aparelhoController.todos);
router.post(SERVER_ROUTES.CADASTRAR_APARELHO, Authentication.verifyToken, aparelhoController.novo);
router.put(SERVER_ROUTES.REMOVER_APARELHO, Authentication.verifyToken, aparelhoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_APARELHO, Authentication.verifyToken, aparelhoController.atualizar);

/*
* Rotas para lidar com a entidade exercicio
*/
router.get(SERVER_ROUTES.LISTAR_EXERCICIOS, Authentication.verifyToken, exercicioController.todos);
router.post(SERVER_ROUTES.CADASTRAR_EXERCICIO, Authentication.verifyToken, exercicioController.novo);
router.put(SERVER_ROUTES.REMOVER_EXERCICIO, Authentication.verifyToken, exercicioController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_EXERCICIO, Authentication.verifyToken, exercicioController.atualizar);

/**
* Rotas para a entidade treio
*/
// Listar todos os treinos cadastrados para um aluno (usando nome como parâmetro)
router.get(SERVER_ROUTES.LISTAR_TREINO, Authentication.verifyToken, treinoController.listarTreino);
// Cadastra um novo treino
router.post(SERVER_ROUTES.CADASTRAR_TREINO, Authentication.verifyToken, treinoController.novo);
// Remove um treino 
router.delete(SERVER_ROUTES.REMOVER_TREINO, Authentication.verifyToken, treinoController.remover);
// Atualiza um treino 
router.put(SERVER_ROUTES.ATUALIZAR_TREINO, Authentication.verifyToken, treinoController.atualizar);

export { router}