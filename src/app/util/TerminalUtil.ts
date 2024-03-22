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

  static async campoRequerido(
    label: string,
    valorPadrao: string = ''
  ): Promise<string> {
    terminal.yellow(`\n${label}`)
    const valor = await terminal.inputField({
      default: valorPadrao,
    }).promise
    if (valor) return valor
    return TerminalUtil.campoRequerido(label)
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

  static async sucesso(text: string, novaLinha: boolean = true) {
    terminal.green((novaLinha ? '\n' : '') + text)
  }

  static async erro(text: string, novaLinha: boolean = true) {
    terminal.red((novaLinha ? '\n' : '') + text)
  }
}
