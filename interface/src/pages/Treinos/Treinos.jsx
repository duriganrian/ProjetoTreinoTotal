import './Treinos.css'; // Importa um arquivo CSS para estilizar o componente.
import Navegacao from '../../components/Navegacao/Navegacao'; // Importa o componente de navegação.
import Rodape from '../../components/Rodape/Rodape'; // Importa o componente de rodapé.
import { Link } from 'react-router-dom'; // Importa o componente Link do React Router para criar links entre páginas.
import Aparelho from '../../assets/img-aparelho.jpg'; // Importa uma imagem de aparelho.
import Exercicio from '../../assets/img-exercicio.jpg'; // Importa uma imagem de exercício.
import bg1 from '../../assets/bg1.png'; // Importa uma imagem de fundo.

function Treinos() {
    return (
        <>
            <Navegacao /> {/* Renderiza o componente de navegação */}
            {/* Renderiza os cartões de opção de treino */}
            <div className="pagina-registro" style={{
                backgroundImage: `url(${bg1})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '550px'
            }}>
                {/* Cartão para registrar treino */}
                <Link to="/loginexercicio" className="cartao-1">
                    <img src={Exercicio} alt="Imagem Treino" className='img1' />
                    <h3>Registrar Exercício</h3>
                    <p>Registre aqui o seu exercício.</p>
                </Link>
                {/* Cartão para registrar aparelho */}
                <Link to="/loginaparelho" className="cartao-2">
                    <img src={Aparelho} alt="Imagem Aparelho" className='img2' />
                    <h3>Registrar Aparelho</h3>
                    <p>Registre um aparelho aqui.</p>
                </Link>
            </div>
            <Rodape/>
        </>
    );
}

export default Treinos; // Exporta o componente Treinos para uso em outras partes da aplicação.
