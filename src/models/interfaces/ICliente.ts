// Interface para clientes
export interface ICliente {
  id: string;
  nome: string;
  email: string;
  obterInformacoes(): string;
}