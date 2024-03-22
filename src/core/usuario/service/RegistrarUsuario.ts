import CasoDeUso from '@/core/shared/CasoDeUso'
import Usuario from '../model/Usuario'
import Erros from '@/core/shared/Erros'
import Id from '@/core/shared/Id'
import ProvedorCriptografia from './ProvedorCriptografia'
import RepositorioUsuario from './RepositorioUsuario'

export default class RegistrarUsuario implements CasoDeUso<Usuario, void> {
  constructor(
    private provedorCripto: ProvedorCriptografia,
    private repositorio: RepositorioUsuario
  ) {}

  async executar(usuario: Usuario): Promise<void> {
    const senhaCripto = this.provedorCripto.criptografar(usuario.senha)

    const usuarioExistente = await this.repositorio.buscarPorEmail(
      usuario.email
    )
    if (usuarioExistente) throw new Error(Erros.USUARIO_JA_EXISTE)

    const novoUsuario: Usuario = {
      id: Id.gerarHash(),
      nome: usuario.nome,
      email: usuario.email,
      senha: senhaCripto,
    }

    console.log(novoUsuario)

    this.repositorio.inserir(novoUsuario)
  }
}
