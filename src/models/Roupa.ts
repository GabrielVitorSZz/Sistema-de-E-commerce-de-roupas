import { ProdutoBase } from './abstract/ProdutoBase';

export class Roupa extends ProdutoBase {
  private _tamanho: string;
  private _material: string;

  constructor(
      id: string,
      nome: string,
      preco: number,
      descricao: string,
      categoria: string,
      cor: string,
      urlImagem: string,
      tags: string[],
      tamanho: string,
      material: string,
      estoque: number = 0
  ) {
    super(id, nome, preco, descricao, categoria, cor, urlImagem, tags, estoque);
    this._tamanho = tamanho;
    this._material = material;
  }

  get tamanho(): string { return this._tamanho; }
  get material(): string { return this._material; }

  public obterPrecoComDesconto(desconto: number): number {
    const descontoAplicado = this.preco * (desconto / 100);
    return this.preco - descontoAplicado;
  }

  public exibirDetalhes(): string {
    return `${super.exibirDetalhes()} - Tamanho: ${this.tamanho} - Material: ${this.material}`;
  }
}