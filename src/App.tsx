import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CartModal } from './components/CartModal';
import { LojaService } from './services/LojaService';
import { useCart } from './hooks/useCart';
import { IProduto } from './models/interfaces/IProduto';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage'; // Importa o novo componente

// Componente placeholder para as páginas em construção
const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-gray-600">Esta página está em construção.</p>
    </div>
);

function App() {
  const [lojaService] = useState(new LojaService());
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<IProduto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { items, addToCart, updateQuantity, removeFromCart, total, itemCount } = useCart();

  useEffect(() => {
    const produtosDaLoja = lojaService.obterProdutos();
    const categoriasDaLoja = lojaService.obterCategorias();

    setProdutos(produtosDaLoja);
    setProdutosFiltrados(produtosDaLoja);
    setCategorias(categoriasDaLoja);
  }, [lojaService]);

  useEffect(() => {
    let produtosFiltradosTemp = produtos;

    // Filtra por categoria
    if (categoriaSelecionada !== 'Todas') {
      produtosFiltradosTemp = lojaService.obterProdutosPorCategoria(categoriaSelecionada);
    }

    // Filtra por termo de busca
    if (searchTerm) {
      produtosFiltradosTemp = produtosFiltradosTemp.filter(produto =>
          produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProdutosFiltrados(produtosFiltradosTemp);
  }, [categoriaSelecionada, produtos, lojaService, searchTerm]);

  const handleAddToCart = (produto: IProduto) => {
    addToCart(produto);
  };

  const handleViewDetails = (produto: IProduto) => {
    alert(`Detalhes do produto:\n${produto.exibirDetalhes()}`);
  };

  const handleCategoryChange = (category: string) => {
    setCategoriaSelecionada(category);
    setSearchTerm(''); // Limpa a busca ao mudar de categoria
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCategoriaSelecionada('Todas'); // Muda para "Todas" as categorias ao pesquisar
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Header
            cartCount={itemCount}
            onCartClick={() => setIsCartOpen(true)}
            onSearch={handleSearch}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <HomePage
                  produtosFiltrados={produtosFiltrados}
                  categorias={categorias}
                  categoriaSelecionada={categoriaSelecionada}
                  onCategoryChange={handleCategoryChange}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
              />
            } />
            {/* Rotas para as páginas do menu */}
            <Route path="/roupas" element={<PlaceholderPage title="Roupas" />} />
            <Route path="/acessorios" element={<PlaceholderPage title="Acessórios" />} />
            <Route path="/promocoes" element={<PlaceholderPage title="Promoções" />} />

            {/* Rota para a página de login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rota para página não encontrada */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Cart Modal */}
        <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={items}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            total={total}
        />
      </div>
  );
}

export default App;