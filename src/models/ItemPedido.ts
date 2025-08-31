// Classe para representar item do pedido (Associação)
import { IProduto } from './interfaces/IProduto';

export class ItemPedido {
  private _produto: IProduto; // Associação com IProduto
  private _quantidade: number;
  private _precoUnitario: number;

  constructor(produto: IProduto, quantidade: number) {
    this._produto = produto;
    this._quantidade = quantidade;
    this._precoUnitario = produto.preco;
  }

  get produto(): IProduto { return this._produto; }
  get quantidade(): number { return this._quantidade; }
  get precoUnitario(): number { return this._precoUnitario; }

  public obterSubtotal(): number {
    return this._precoUnitario * this._quantidade;
  }

  public alterarQuantidade(novaQuantidade: number): void {
    if (novaQuantidade > 0) {
      this._quantidade = novaQuantidade;
    }
  }
}