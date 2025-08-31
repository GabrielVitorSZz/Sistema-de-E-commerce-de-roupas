import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { IProduto } from '../models/interfaces/IProduto';

interface ProductCardProps {
  produto: IProduto;
  onAddToCart: (produto: IProduto) => void;
  onViewDetails: (produto: IProduto) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ produto, onAddToCart, onViewDetails }) => {
  return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {produto.urlImagem ? (
              <img
                  src={produto.urlImagem}
                  alt={produto.nome}
                  className="w-full h-full object-cover"
              />
          ) : (
              <span className="text-gray-400 text-sm">Imagem do Produto</span>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{produto.nome}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{produto.descricao}</p>

          <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {produto.categoria}
          </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {produto.cor}
          </span>
          </div>

          <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            R$ {produto.preco.toFixed(2)}
          </span>

            <div className="flex gap-2">
              <button
                  onClick={() => onViewDetails(produto)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  title="Ver detalhes"
              >
                <Eye size={18} />
              </button>
              <button
                  onClick={() => onAddToCart(produto)}
                  className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                  title="Adicionar ao carrinho"
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};