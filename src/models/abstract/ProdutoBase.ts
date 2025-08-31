import { IProduto } from "../interfaces/IProduto";

// Classe abstrata base para produtos (conceito de Herança e Encapsulamento)
export abstract class ProdutoBase implements IProduto {
  protected _id: string; // Encapsulamento com protected
  protected _nome: string;
  protected _preco: number;
  protected _descricao: string;
  protected _categoria: string;
  protected _cor: string;
  protected _urlImagem: string;
  protected _tags: string[]; // Adicione esta linha
  protected _estoque: number;

  // Método Construtor
  constructor(
      id: string,
      nome: string,
      preco: number,
      descricao: string,
      categoria: string,
      cor: string,
      urlImagem: string,
      tags: string[], // Adicione este parâmetro
      estoque: number = 0
  ) {
    this._id = id;
    this._nome = nome;
    this._preco = preco;
    this._descricao = descricao;
    this._categoria = categoria;
    this._cor = cor;
    this._urlImagem = urlImagem;
    this._tags = tags; // Atribua o valor aqui
    this._estoque = estoque;
  }

  // Getters e Setters (Encapsulamento)
  get id(): string { return this._id; }
  get nome(): string { return this._nome; }
  get preco(): number { return this._preco; }
  get descricao(): string { return this._descricao; }
  get categoria(): string { return this._categoria; }
  get cor(): string { return this._cor; }
  get urlImagem(): string { return this._urlImagem; }
  get tags(): string[] { return this._tags; } // Adicione o getter
  get estoque(): number { return this._estoque; }

  set preco(valor: number) {
    if (valor > 0) {
      this._preco = valor;
    }
  }

  set estoque(quantidade: number) {
    if (quantidade >= 0) {
      this._estoque = quantidade;
    }
  }

  // Método que será sobrescrito (Polimorfismo)
  abstract obterPrecoComDesconto(desconto: number): number;

  // Método comum para todos os produtos
  public exibirDetalhes(): string {
    return `${this._nome} - R$ ${this._preco.toFixed(2)} - ${this._cor}`;
  }

  public temEstoque(quantidade: number): boolean {
    return this._estoque >= quantidade;
  }

  public reduzirEstoque(quantidade: number): void {
    if (this.temEstoque(quantidade)) {
      this._estoque -= quantidade;
    }
  }
}