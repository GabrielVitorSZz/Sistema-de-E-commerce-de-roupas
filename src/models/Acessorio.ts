// Outra classe concreta (Herança e Polimorfismo)
import { ProdutoBase } from './abstract/ProdutoBase';

export class Acessorio extends ProdutoBase {
  private _tipo: string;

  constructor(
      id: string,
      nome: string,
      preco: number,
      descricao: string,
      categoria: string,
      cor: string,
      urlImagem: string,
      tags: string[],
      tipo: string,
      estoque: number = 0
  ) {
    super(id, nome, preco, descricao, categoria, cor, urlImagem, tags, estoque);
    this._tipo = tipo;
  }

  get tipo(): string { return this._tipo; }

  // Polimorfismo - acessórios têm desconto diferente
  public obterPrecoComDesconto(desconto: number): number {
    // Acessórios têm desconto limitado a 20%
    const descontoLimitado = Math.min(desconto, 20);
    const descontoAplicado = this._preco * (descontoLimitado / 100);
    return this._preco - descontoAplicado;
  }

  public exibirDetalhes(): string {
    return `${super.exibirDetalhes()} - Tipo: ${this._tipo}`;
  }
}