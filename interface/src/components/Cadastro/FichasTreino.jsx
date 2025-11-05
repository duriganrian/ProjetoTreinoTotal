import React, { useEffect, useState } from 'react';
import TreinoRequests from '../../fetch/TreinoRequests';
import styles from '../styles/FichaTreino.module.css';
import AlunoModal from '../Modal/AlunoModal';
import TreinoSelectionModal from '../Modal/TreinoSelectionModal';

function FichaTreino() {
    const [searchType, setSearchType] = useState('matricula');
    const [searchValue, setSearchValue] = useState('');
    const [exercicios, setExercicios] = useState([]);
    const [aluno, setAluno] = useState('');
    const [professor, setProfessor] = useState('');
    const [treinosDisponiveis, setTreinosDisponiveis] = useState([]);
    const [showTreinoSelection, setShowTreinoSelection] = useState(false);
    const [showAlunoModal, setShowAlunoModal] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState(null);

    const handleShowAlunoModal = () => setShowAlunoModal(true);
    const handleCloseAlunoModal = () => setShowAlunoModal(false);

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSelectAluno = (aluno) => {
        setSelectedAluno(aluno);
        setSearchValue(aluno.matricula);
        handleCloseAlunoModal();
    };

    useEffect(() => {
        if (selectedAluno) {
            handleSearch();
        }
    }, [selectedAluno]);

    const handleSelectTreino = (treino) => {
        setProfessor(treino.professor.nome_professor);
        setExercicios(treino.exercicios || []); // garante array vazio se não houver
        setShowTreinoSelection(false);
        setSearchValue('');
    };

    const handleSearch = async () => {
        if (!searchValue) {
            handleShowAlunoModal();
            return;
        }

        try {
            const response = await TreinoRequests.listarTreinos(searchType, searchValue);

            const treinos = response.treino.treinos || [];

            if (treinos.length > 1) {
                setTreinosDisponiveis(treinos);
                setAluno(response.treino.nome_aluno);
                setShowTreinoSelection(true);
            } else if (treinos.length === 1) {
                const treinoUnico = treinos[0];
                setAluno(response.treino.nome_aluno);
                setProfessor(treinoUnico.professor.nome_professor);
                setExercicios(treinoUnico.exercicios || []);
                setSearchValue('');
            } else {
                alert('Nenhum treino cadastrado para o aluno informado');
                resetTreinoStates();
            }
        } catch (error) {
            alert('Erro ao buscar treino. Verifique se o aluno possui treinos cadastrados.');
            console.error('Erro na busca:', error);
            resetTreinoStates();
        }
    };

    const resetTreinoStates = () => {
        setAluno('');
        setProfessor('');
        setExercicios([]);
        setSearchValue('');
        setTreinosDisponiveis([]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchSection} style={{ display: 'flex', justifyContent: 'center' }}>
                <label htmlFor="searchValue" className={styles.labelMatricula}>Matricula aluno:</label>

                <input
                    id="searchValue"
                    type={searchType === 'matricula' ? 'number' : 'text'}
                    value={searchValue}
                    onChange={handleSearchValueChange}
                    style={{ width: '50%' }}
                />

                <button onClick={handleSearch} style={{ width: '20%' }}>Pesquisar</button>
                <AlunoModal
                    show={showAlunoModal}
                    handleClose={handleCloseAlunoModal}
                    onSelectAluno={handleSelectAluno}
                />
            </div>

            <TreinoSelectionModal
                show={showTreinoSelection}
                treinos={treinosDisponiveis}
                onSelect={handleSelectTreino}
                onClose={() => { setShowTreinoSelection(false); setSearchValue(''); }}
            />

            <div className={styles.nome_aluno}>
                <h4>Nome do Aluno:</h4>
                <h3>{aluno}</h3>
            </div>

            <div className={styles.nome_professor}>
                <h4>Nome do Professor:</h4>
                <h3>{professor}</h3>
            </div>

            <div className={styles.exerciciosSection}>
                {exercicios.map((exercicio) => (
                    <div key={exercicio.id} className={styles.exercicio}>
                        <table className={styles.tabelaListTreino}>
                            <tbody>
                                <tr>
                                    <td colSpan={3} style={{ textAlign: 'left' }}>Exercício: {exercicio.exercicio}</td>
                                </tr>
                                <tr>
                                    <td width={'30%'}>Repetições: {exercicio.repeticoes}</td>
                                    <td width={'30%'} style={{ textAlign: 'center' }}>Carga (kg): {exercicio.carga}</td>
                                    <td width={'30%'} style={{ textAlign: 'right' }}>Séries: {exercicio.series}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FichaTreino;
