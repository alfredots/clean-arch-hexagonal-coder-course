import { terminal } from 'terminal-kit'

export default class TerminalUtil {
  static titulo(text: string) {
    terminal.clear()
    terminal.magenta(`${text}\n`)
    terminal.magenta(`-`.repeat(text.length) + `\n`)
  }

  static limpar() {
    terminal.clear()
  }

  static exibir(chave: string, valor: any) {
    terminal.yellow(chave).green(valor).white('\n')
  }

  static async menu(options: string[]): Promise<[number, string]> {
    const answer = await terminal.singleColumnMenu(options).promise

    return [answer.selectedIndex, answer.selectedText]
  }

  static async selecao(
    text: string,
    options: string[]
  ): Promise<[number, string]> {
    terminal.yellow(`\n${text}`)
    const answer = await terminal.singleLineMenu(options).promise
    return [answer.selectedIndex, answer.selectedText]
  }

  static async confirmacao(text: string): Promise<boolean> {
    terminal.yellow(`\n${text}`)
    const answer = await terminal.singleLineMenu(['Sim', 'Não']).promise
    return answer.selectedIndex === 0
  }

  static async esperarEnter(): Promise<void> {
    terminal.white('\nPressione ENTER para continuar...')
    await terminal.inputField({ echo: false }).promise
  }
}
