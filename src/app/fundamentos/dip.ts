import corrida from '@/core/fundamentos/corrida'
import TerminalUtil from '../util/TerminalUtil'
import Carro from '@/core/fundamentos/Carro'
import Ferrari from '@/core/fundamentos/Ferrari'
import Fusca from '@/core/fundamentos/Fusca'
import { terminal } from 'terminal-kit'

export default async function dip() {
  TerminalUtil.titulo('Inversão de Dependência')

  const [tipoCarro] = await TerminalUtil.selecao('Tipo de Carro?', [
    'Ferrari',
    'Fusca',
  ])

  const carro: Carro = tipoCarro === 0 ? new Ferrari() : new Fusca()

  corrida(carro, terminal.red)

  await TerminalUtil.esperarEnter()
}
