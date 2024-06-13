import CasoDeUso from '@/core/shared/CasoDeUso'
import Produto from '../model/Produto'

export type LoginUsuarioEntrada = {
  email: string
  senha: string
}

export default class ObterProdutoPorId implements CasoDeUso<string, Produto> {
  constructor() {}

  async executar(entrada: string): Promise<Produto> {
    return {
      id: entrada,
      nome: 'Poster do JungKook',
      preco: 1000,
    } as Produto
  }
}
