export default interface CasoDeUsoo<E, S> {
  executar(entrada: E): Promise<S>
}
