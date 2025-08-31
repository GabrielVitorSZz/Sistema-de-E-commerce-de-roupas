import { useState } from 'react';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (searchTerm: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onSearch }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
    setIsSearchVisible(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo com Link para a Home */}
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-800">Gabriel E-commerce</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Início</Link>
              <Link to="/roupas" className="text-gray-700 hover:text-blue-600 transition-colors">Roupas</Link>
              <Link to="/acessorios" className="text-gray-700 hover:text-blue-600 transition-colors">Acessórios</Link>
              <Link to="/promocoes" className="text-gray-700 hover:text-blue-600 transition-colors">Promoções</Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Botão de Pesquisa */}
              <button
                  onClick={handleSearchClick}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Botão de Login */}
              <button
                  onClick={handleLoginClick}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User size={20} />
              </button>

              {/* Botão do Carrinho */}
              <button
                  onClick={onCartClick}
                  className="relative text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
                )}
              </button>
              <button className="md:hidden text-gray-700 hover:text-blue-600 transition-colors">
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Campo de busca condicional */}
          {isSearchVisible && (
              <form onSubmit={handleSearchSubmit} className="py-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Digite para buscar..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
          )}
        </div>
      </header>
  );
};