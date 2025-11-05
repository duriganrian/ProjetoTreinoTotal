import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FaTrash } from "react-icons/fa";
import AlunoModal from '../../components/Modal/AlunoModal';
import ProfessorModal from '../../components/Modal/ProfessorModal';
import ExercicioModal from '../../components/Modal/ExercicioModal';
import TreinoRequests from '../../fetch/TreinoRequests';
import styles from '../styles/CadastroTreino.module.css';

/**
 * Componente responsável por montar o formulário de cadastro do treino
 */
function CadastroTreino() {
    // Estados para controlar modais
    const [showAlunoModal, setShowAlunoModal] = useState(false);
    const [showProfessorModal, setShowProfessorModal] = useState(false);
    const [showExercicioModal, setShowExercicioModal] = useState(false);

    // Estados para armazenar seleções
    const [selectedAluno, setSelectedAluno] = useState(null);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [selectedExercicios, setSelectedExercicios] = useState([]);

    // Funções para abrir/fechar modais
    const handleShowAlunoModal = () => setShowAlunoModal(true);
    const handleCloseAlunoModal = () => setShowAlunoModal(false);

    const handleShowProfessorModal = () => setShowProfessorModal(true);
    const handleCloseProfessorModal = () => setShowProfessorModal(false);

    const handleShowExercicioModal = () => setShowExercicioModal(true);
    const handleCloseExercicioModal = () => setShowExercicioModal(false);

    // Seleção de aluno
    const handleSelectAluno = (aluno) => {
        setSelectedAluno(aluno);
        handleCloseAlunoModal();
    };

    // Seleção de professor
    const handleSelectProfessor = (professor) => {
        setSelectedProfessor(professor);
        handleCloseProfessorModal();
    };

    // Seleção de exercício
    const handleSelectExercicio = (exercicio) => {
        setSelectedExercicios([
            ...selectedExercicios,
            {
                id_exercicio: exercicio.id_exercicio, // ⚡ id do exercício do banco
                nome: exercicio.exercicio,
                repeticoes: 10,
                carga: 0,
                series: 3
            }
        ]);
        handleCloseExercicioModal();
    };

    // Alteração de valores de repeticoes, carga e series
    const handleInputChange = (index, field, value) => {
        const newSelectedExercicios = [...selectedExercicios];
        newSelectedExercicios[index][field] = value;
        setSelectedExercicios(newSelectedExercicios);
    };

    // Remover exercício da lista
    const handleRemoveExercicio = (index) => {
        const newSelectedExercicios = selectedExercicios.filter((_, i) => i !== index);
        setSelectedExercicios(newSelectedExercicios);
    };

    // Cadastro do treino e dos exercícios vinculados
    const cadastrar = async () => {
        if (!selectedAluno || !selectedProfessor || selectedExercicios.length === 0) {
            alert('Selecione aluno, professor e ao menos um exercício.');
            return;
        }

        try {
            // 1️⃣ Cadastra o treino e pega o ID
            const treinoResult = await TreinoRequests.cadastrarTreino({
                id_aluno: selectedAluno.id_aluno,
                id_professor: selectedProfessor.id_professor
            });

            if (!treinoResult || treinoResult.length === 0) {
                alert('Erro ao cadastrar treino.');
                return;
            }

            const idTreino = treinoResult[0].id_treino;

            // 2️⃣ Cadastra cada exercício vinculado ao treino
            for (const ex of selectedExercicios) {
                await TreinoRequests.cadastrarExercicioTreino({
                    id_treino: idTreino,
                    id_exercicio: ex.id_exercicio,
                    repeticoes: ex.repeticoes || 10,
                    carga: ex.carga || 0,
                    series: ex.series || 3
                });
            }

            alert('Treino cadastrado com sucesso!');
            window.location.reload();

        } catch (error) {
            console.error('Erro ao cadastrar treino:', error);
            alert('Erro ao cadastrar treino!');
        }
    };

    return (
        <div className={styles.cadastroTreino}>
            <div className={styles.header}>
                <h1 className={styles.h1}>Cadastro Treino</h1>
            </div>

            <div className={styles.selections}>
                <div style={{ width: '25%'}}>
                    <Button variant="outline-light" style={{backgroundColor: '#FCA311'}} onClick={handleShowAlunoModal} className={styles.botaoSelecao}>
                        Escolher Aluno
                    </Button>
                    <div className={styles.selected}>{selectedAluno?.nome}</div>
                </div>

                <div style={{ width: '30%', margin: 'auto auto'}}>
                    <Button variant="outline-light" style={{backgroundColor: '#FCA311'}} onClick={handleShowProfessorModal} className={styles.botaoSelecao}>
                        Escolher Professor
                    </Button>
                    <div className={styles.selected}>{selectedProfessor?.nome}</div>
                </div>

                <div style={{ width: '25%'}}>
                    <Button variant="outline-light" style={{backgroundColor: '#FCA311'}} onClick={handleShowExercicioModal} className={styles.botaoSelecao}>
                        Escolher Exercício
                    </Button>
                </div>
            </div>

            {selectedExercicios.length > 0 && (
                <Table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Exercício</th>
                            <th style={{ width: '10%'}}>Repetições</th>
                            <th style={{ width: '10%'}}>Carga</th>
                            <th style={{ width: '10%'}}>Séries</th>
                            <th style={{ width: '10%'}}>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedExercicios.map((exercicio, index) => (
                            <tr key={index}>
                                <td>{exercicio.nome}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.repeticoes}
                                        onChange={(e) => handleInputChange(index, 'repeticoes', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.carga}
                                        onChange={(e) => handleInputChange(index, 'carga', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={exercicio.series}
                                        onChange={(e) => handleInputChange(index, 'series', e.target.value)}
                                        className={styles.input}
                                    />
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoveExercicio(index)} className={styles.removeButton}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <button
                variant="outline-light"
                style={{backgroundColor: '#FCA311', marginLeft: '37%'}}
                onClick={cadastrar}
                className={styles.btn}
            >
                Cadastrar
            </button>

            <AlunoModal
                show={showAlunoModal}
                handleClose={handleCloseAlunoModal}
                onSelectAluno={handleSelectAluno}
            />

            <ProfessorModal 
                show={showProfessorModal}
                handleClose={handleCloseProfessorModal}
                onSelectProfessor={handleSelectProfessor}
            />

            <ExercicioModal 
                show={showExercicioModal}
                handleClose={handleCloseExercicioModal}
                onSelectExercicio={handleSelectExercicio}
            />
        </div>
    );
}

export default CadastroTreino;
