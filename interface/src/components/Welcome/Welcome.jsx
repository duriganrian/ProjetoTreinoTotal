// Importações necessárias de bibliotecas e recursos
import React from 'react'; // Importa a biblioteca React
import { Carousel } from 'react-responsive-carousel'; // Importa o componente Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa o CSS do carrossel
import './Welcome.css'; // Importa um arquivo CSS para estilizar o componente
import gym1 from '../../assets/cs1.jpg'; // Importa a imagem 1
import gym2 from '../../assets/gym2.jpg'; // Importa a imagem 2
import gym3 from '../../assets/cs3.jpg'; // Importa a imagem 3
import gym4 from '../../assets/cs2.jpg'; // Importa a imagem 4

function Welcome() {
    // Função para renderizar as setas de navegação do carrossel
    const renderArrow = (onClickHandler, has, label, direction) => (
        has && ( // Verifica se a seta deve ser renderizada
            <button type="button" onClick={onClickHandler} title={label} className={`custom-arrow custom-${direction}`}>
                {direction === 'prev' ? '<' : '>'} {/* Ícone ou texto da seta */}
            </button>
        )
    );

    return (
        <>
            <div className="welcome-container"> {/* Contêiner principal do componente */}
                <div className="welcome"> {/* Seção do carrossel */}
                    <Carousel
                        showThumbs={false} // Não exibe miniaturas
                        autoPlay={true} // Ativa o autoplay
                        infiniteLoop={true} // Permite loop infinito
                        showStatus={false} // Não exibe status do carrossel
                        renderArrowPrev={(onClickHandler, hasPrev) => renderArrow(onClickHandler, hasPrev, 'Anterior', 'prev')} // Renderiza a seta anterior
                        renderArrowNext={(onClickHandler, hasNext) => renderArrow(onClickHandler, hasNext, 'Próxima', 'next')} // Renderiza a seta próxima
>
                        {[gym1, gym2, gym3].map((image, index) => ( // Mapeia as imagens para renderizar no carrossel
                            <div key={index}> {/* Cada imagem é um item do carrossel */}
                                <img src={image} alt={`Imagem ${index + 1}`} className='carousel' /> {/* Imagem do carrossel */}
                                <p className="legend">{`Imagem ${index + 1}`}</p> {/* Legenda da imagem */}
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Seção adicional com um card de introdução */}
                <div className='introduction' style={{ borderColor: "black" }}> {/* Contêiner da seção de introdução */}
                    <div className='card-1'> {/* Contêiner do card */}
                        <div className="card"> {/* Card principal */}
                            <img src={gym4} alt="Imagem 2" className='carousel' /> {/* Imagem do card */}
                            <div className="card-content"> {/* Conteúdo do card */}
                                <h2 className="card-title">Treino Total</h2> {/* Título do card */}
                                <p className="card-text">Transforme seu treino, potencialize seus resultados e atinja seu máximo com uma plataforma personalizada!</p> {/* Descrição do card */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Welcome; // Exporta o componente Welcome para uso em outras partes da aplicação.
