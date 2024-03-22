import TerminalUtil from '../util/TerminalUtil'
import Usuario from '@/core/usuario/model/Usuario'
import RegistrarUsuario from '@/core/usuario/service/RegistrarUsuario'
import SenhaCripto from '@/adapters/auth/SenhaCripto'
import RepositorioUsuarioEmMemoria from '@/adapters/mock/RepositorioUsuarioEmMemoria'

export default async function registrarUsuario() {
  TerminalUtil.titulo('Registrar Usuário')

  const nome = await TerminalUtil.campoRequerido('Nome: ', 'aaaaaa aaaaa')
  const email = await TerminalUtil.campoRequerido('Email: ', 'eeeeee@gmail.com')
  const senha = await TerminalUtil.campoRequerido('Senha: ', '123456abc')

  const usuario: Usuario = { nome, email, senha }

  const provedorCripto = new SenhaCripto()
  const repositorio = new RepositorioUsuarioEmMemoria()
  const casoDeUso = new RegistrarUsuario(provedorCripto, repositorio)
  await casoDeUso.executar(usuario)

  TerminalUtil.sucesso('Usuario registrado com sucesso')

  await TerminalUtil.esperarEnter()

  try {
    await casoDeUso.executar(usuario)
  } catch (error) {
    TerminalUtil.erro('Usuario já existente')
  } finally {
    await TerminalUtil.esperarEnter()
  }
}
