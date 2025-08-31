// Imports de classes e interfaces
import { IProduto } from "../models/interfaces/IProduto";
import { Acessorio } from "../models/Acessorio";
import { Roupa } from "../models/Roupa";

// Importe as imagens diretamente do diretório local
import imagem1 from '../imagens/imagem 1.jpg';
import imagem2 from '../imagens/imagem 2.jpg';
import imagem3 from '../imagens/imagem 3.jpg';
import imagem4 from '../imagens/imagem 4.jpg';
import imagem5 from '../imagens/imagem 5.jpg';
import imagem6 from '../imagens/imagem 6.jpg';

export class LojaService {
  private produtos: IProduto[] = [];

  constructor() {
    this.carregarProdutos();
  }

  private carregarProdutos(): void {
    // A ordem dos parâmetros agora é: id, nome, preco, descricao, categoria, cor, urlImagem, tags, (específicos), estoque
    // Roupas
    this.produtos.push(new Roupa('1', "Camiseta Básica", 49.90, "Camiseta 100% algodão", "Camisetas", "Azul", imagem1, ["T-shirt"], "M", "Algodão", 10));
    this.produtos.push(new Roupa('2', "Calça Jeans", 89.90, "Calça jeans slim fit", "Calças", "Azul Claro", imagem2, ["Jeans"], "40", "Jeans", 15));
    this.produtos.push(new Roupa('3', "Vestido Floral", 129.90, "Vestido estampado lindo", "Vestidos", "Rosa", imagem3, ["Casual"], "P", "Seda", 8));
    this.produtos.push(new Roupa('4', "Blazer Elegante", 249.90, "Blazer masculino corte slim", "Blazer", "Preto", imagem6, ["Social", "Casual"], "G", "Algodão", 5));

    // Acessórios
    this.produtos.push(new Acessorio('5', "Bolsa de Couro", 199.90, "Bolsa feminina elegante", "Bolsas", "Marrom", imagem4, ["Couro"], "Bolsa", 7));
    this.produtos.push(new Acessorio('6', "Óculos de Sol Clássico", 79.90, "Óculos de sol com proteção UV", "Óculos", "Preto", imagem5, ["UV400"], "Óculos de sol", 12));
  }

  obterProdutos(): IProduto[] {
    return [...this.produtos];
  }

  obterCategorias(): string[] {
    const categorias = new Set<string>();
    this.produtos.forEach(produto => categorias.add(produto.categoria));
    // Esta linha garante que "Todas" seja o primeiro item da lista e não se repita
    return ['Todas', ...Array.from(categorias)];
  }

  obterProdutosPorCategoria(categoria: string): IProduto[] {
    if (categoria === 'Todas') {
      return this.obterProdutos();
    }
    return this.produtos.filter(produto => produto.categoria === categoria);
  }
}