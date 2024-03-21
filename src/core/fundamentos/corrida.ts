import Carro from './Carro'

export default function corrida(
  carro: Carro,
  logger: (str: string) => void = console.log
) {
  Array.from({ length: 10 }).forEach(() => {
    carro.acelerar()
    logger(`\nVelocidade: ${carro.velocidadeAtual} km/h`)
  })

  Array.from({ length: 10 }).forEach(() => {
    carro.frear()
    logger(`\nVelocidade: ${carro.velocidadeAtual} km/h`)
  })
}
