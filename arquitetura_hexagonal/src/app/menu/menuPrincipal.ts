import TerminalUtil from '@/app/util/TerminalUtil'
import menuFundamentos from './menuFundamentos'
import menuUsuario from './menuUsuario'

export default async function menuPrincipal() {
  TerminalUtil.titulo('Menu Principal')

  const [index] = await TerminalUtil.menu([
    '1. Fundamentos',
    '2. Menu Usuário',
    'Sair',
  ])

  switch (index) {
    case 0:
      await menuFundamentos()
      break
    case 1:
      await menuUsuario()
      break
    default:
      process.exit(0)
  }

  menuPrincipal()
}