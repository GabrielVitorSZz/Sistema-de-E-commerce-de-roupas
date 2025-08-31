// Classe Pedido (Agregação com ItemPedido e Associação com Cliente)
import { Cliente } from './Cliente';
import { ItemPedido } from './ItemPedido';

export class Pedido {
  private _id: string;
  private _cliente: Cliente; // Associação
  private _itens: ItemPedido[]; // Agregação - pedido "tem" itens
  private _datasPedido: Date;
  private _status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';

  constructor(id: string, cliente: Cliente) {
    this._id = id;
    this._cliente = cliente;
    this._itens = [];
    this._datasPedido = new Date();
    this._status = 'Pendente';
  }

  get id(): string { return this._id; }
  get cliente(): Cliente { return this._cliente; }
  get itens(): ItemPedido[] { return [...this._itens]; } // Retorna cópia para proteger o array
  get dataPedido(): Date { return this._datasPedido; }
  get status(): string { return this._status; }

  public adicionarItem(item: ItemPedido): void {
    this._itens.push(item);
  }

  public removerItem(produtoId: string): void {
    this._itens = this._itens.filter(item => item.produto.id !== produtoId);
  }

  public calcularTotal(): number {
    return this._itens.reduce((total, item) => total + item.obterSubtotal(), 0);
  }

  public alterarStatus(novoStatus: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado'): void {
    this._status = novoStatus;
  }

  public obterResumo(): string {
    return `Pedido ${this._id} - Cliente: ${this._cliente.nome} - Total: R$ ${this.calcularTotal().toFixed(2)} - Status: ${this._status}`;
  }
}