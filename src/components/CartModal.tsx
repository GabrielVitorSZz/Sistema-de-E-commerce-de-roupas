import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { ItemPedido } from '../models/ItemPedido';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ItemPedido[];
  onUpdateQuantity: (produtoId: string, quantity: number) => void;
  onRemoveItem: (produtoId: string) => void;
  total: number;
}

export const CartModal: React.FC<CartModalProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      items,
                                                      onUpdateQuantity,
                                                      onRemoveItem,
                                                      total
                                                    }) => {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
        <div className="bg-white h-full w-full max-w-md shadow-xl overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Carrinho de Compras</h2>
            <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 p-4">
            {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
            ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                      <div key={item.produto.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {/* Seção corrigida para exibir a imagem */}
                        <div className="w-16 h-16 flex-shrink-0">
                          {item.produto.urlImagem ? (
                              <img
                                  src={item.produto.urlImagem}
                                  alt={item.produto.nome}
                                  className="w-full h-full object-cover rounded-md"
                              />
                          ) : (
                              <div className="w-full h-full bg-gray-200 rounded-md"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">{item.produto.nome}</h4>
                          <p className="text-sm text-gray-600">R$ {item.precoUnitario.toFixed(2)}</p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                                onClick={() => onUpdateQuantity(item.produto.id, Math.max(1, item.quantidade - 1))}
                                className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 py-1 bg-white rounded border min-w-[2rem] text-center">
                        {item.quantidade}
                      </span>
                            <button
                                onClick={() => onUpdateQuantity(item.produto.id, item.quantidade + 1)}
                                className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                                onClick={() => onRemoveItem(item.produto.id)}
                                className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">R$ {item.obterSubtotal().toFixed(2)}</p>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Finalizar Compra
                </button>
              </div>
          )}
        </div>
      </div>
  );
};