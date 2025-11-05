import './Rodape.css'; // Importa o arquivo CSS para estilizar o componente.
import face from '../../assets/face.png'; // Importa o ícone do Facebook.
import insta from '../../assets/insta.png'; // Importa o ícone do Instagram.
import { Link } from 'react-router-dom'; // Importa o componente Link do React Router DOM.

function Rodape() {
    return (
        <div className='rodape' style={{ borderColor: "black" }}> {/* Define uma div com a classe "rodape" */}
            <div className='container-rodape'> {/* Define uma div com a classe "container-rodape" */}
                <h1 className='h1-frase'>Persista hoje, conquiste amanhã!</h1> {/* Renderiza um título com a frase motivacional */}

                <h1>Endereço</h1> {/* Renderiza um título "Endereço" */}

                <p className='p-rodape'>Unnamed Road, Barrinha - SP, 14170-480</p> {/* Renderiza um parágrafo com o endereço */}
                <p>CEP: 14170-480 TEL: (16) 98269-2831</p> {/* Renderiza um parágrafo com o CEP e o telefone */}

                <h1>Redes Sociais</h1> {/* Renderiza um título "Redes Sociais" */}

                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> {/* Link para o Instagram */}
                    <img src={insta} alt="Instagram" /> {/* Renderiza o ícone do Instagram */}
                </a>

                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> {/* Link para o Facebook */}
                    <img src={face} alt="Facebook" /> {/* Renderiza o ícone do Facebook */}
                </a>
            </div>
        </div>
    );
}

export default Rodape; // Exporta o componente Rodape para uso em outras partes da aplicação.
