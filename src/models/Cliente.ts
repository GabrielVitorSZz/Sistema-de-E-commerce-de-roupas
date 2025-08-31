// Classe Cliente implementando interface (Interface)
import { ICliente } from './interfaces/ICliente';

export class Cliente implements ICliente {
  private _id: string;
  private _nome: string;
  private _email: string;
  private _telefone: string;
  private _endereco: string;

  constructor(id: string, nome: string, email: string, telefone: string, endereco: string) {
    this._id = id;
    this._nome = nome;
    this._email = email;
    this._telefone = telefone;
    this._endereco = endereco;
  }

  // Getters (Encapsulamento)
  get id(): string { return this._id; }
  get nome(): string { return this._nome; }
  get email(): string { return this._email; }
  get telefone(): string { return this._telefone; }
  get endereco(): string { return this._endereco; }

  public obterInformacoes(): string {
    return `${this._nome} - ${this._email} - ${this._telefone}`;
  }
}