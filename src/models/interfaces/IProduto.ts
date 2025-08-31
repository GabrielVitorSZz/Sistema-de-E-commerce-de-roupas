export interface IProduto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  cor: string;
  urlImagem: string; // Adicione esta linha
  tags: string[];
  estoque: number;

  obterPrecoComDesconto(desconto: number): number;
  exibirDetalhes(): string;
}