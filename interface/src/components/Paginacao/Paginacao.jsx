import React from 'react'; // Importa a biblioteca React.

const Paginacao = ({ currentPage, totalPages, onPageChange }) => {
  // Cria um array com os números das páginas com base no total de páginas.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{
      display: 'flex', // Define um layout flexível para a paginação.
      justifyContent: 'center', // Centraliza os botões horizontalmente.
      alignItems: 'center', // Alinha os botões verticalmente ao centro.
      marginTop: 20, // Adiciona espaço acima da seção de paginação.
    }}>
      {pages.map((page) => (
        <button
          key={page} // A chave única para cada botão é o número da página.
          onClick={() => onPageChange(page)} // Chama a função onPageChange com o número da página ao clicar.
          style={{
            backgroundColor: page === currentPage ? '#14213D' : '#fca311', // Define a cor de fundo com base na página atual.
            color: page === currentPage ? '#fff' : '#14213D', // Define a cor do texto com base na página atual.
            border: 'none', // Remove a borda padrão do botão.
            padding: '10px 20px', // Adiciona espaçamento interno ao botão.
            margin: '5px', // Adiciona margem ao redor do botão.
            cursor: 'pointer', // Altera o cursor para uma mãozinha ao passar sobre o botão.
            fontSize: 16, // Define o tamanho da fonte do texto.
            fontWeight: 'bold', // Define o texto como negrito.
            borderRadius: 5, // Adiciona bordas arredondadas ao botão.
          }}
        >
          {page} {/* Exibe o número da página no botão */}
        </button>
      ))}
    </div>
  );
};

export default Paginacao; // Exporta o componente Paginacao para uso em outras partes da aplicação.
