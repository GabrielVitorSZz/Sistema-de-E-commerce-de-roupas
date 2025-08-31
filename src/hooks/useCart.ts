// src/hooks/useCart.ts

import { useState, useMemo } from 'react'; // CORREÇÃO: Importação ajustada para o pacote 'react'.
import { IProduto } from '../models/interfaces/IProduto';
import { ItemPedido } from '../models/ItemPedido';

export const useCart = () => {
  const [items, setItems] = useState<ItemPedido[]>([]);

  const addToCart = (produto: IProduto, quantidade: number = 1) => {
    setItems(current => {
      const existingItem = current.find(item => item.produto.id === produto.id);

      if (existingItem) {
        return current.map(item =>
            item.produto.id === produto.id
                // CORREÇÃO: Criada uma nova instância de ItemPedido para manter os métodos da classe.
                ? new ItemPedido(item.produto, item.quantidade + quantidade)
                : item
        );
      }

      return [...current, new ItemPedido(produto, quantidade)];
    });
  };

  const updateQuantity = (produtoId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(produtoId);
      return;
    }

    setItems(current =>
        current.map(item => {
          if (item.produto.id === produtoId) {
            const updatedItem = new ItemPedido(item.produto, newQuantity);
            return updatedItem;
          }
          return item;
        })
    );
  };

  const removeFromCart = (produtoId: string) => {
    setItems(current => current.filter(item => item.produto.id !== produtoId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.obterSubtotal(), 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantidade, 0);
  }, [items]);

  return {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    itemCount
  };
};