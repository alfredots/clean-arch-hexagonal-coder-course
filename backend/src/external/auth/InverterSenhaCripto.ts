import ProvedorCriptografia from '../../core/usuario/service/ProvedorCriptografia'

// Na arquitetura hexagonal esta interface é um Adaptador
// O Adaptador NÃOOOO faz parte do core bussiness da aplicação
export default class InverterSenhaCripto implements ProvedorCriptografia {
  comparar(senha: string, senhaCriptografada: string): boolean {
    return this.criptografar(senha) === senhaCriptografada
  }

  criptografar(senha: string): string {
    return senha.split('').reverse().join()
  }
}
