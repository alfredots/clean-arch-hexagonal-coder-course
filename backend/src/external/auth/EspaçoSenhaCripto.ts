import ProvedorCriptografia from '@/core/usuario/service/ProvedorCriptografia'

export default class EspaçoSenhaCripto implements ProvedorCriptografia {
  criptografar(texto: string): string {
    return texto.split('').join(' ')
  }

  comparar(senha: string, senhaCriptografada: string): boolean {
    return this.criptografar(senha) === senhaCriptografada
  }
}
