import TerminalUtil from '@/app/util/TerminalUtil'
import registrarUsuario from '../usuario/registrarUsuario'

export default async function menuUsuario() {
  TerminalUtil.titulo('Menu Usuário')

  const [index] = await TerminalUtil.menu(['Registrar', 'Voltar'])

  switch (index) {
    case 0:
      await registrarUsuario()
      break

    default:
      return
  }

  await menuUsuario()
}
