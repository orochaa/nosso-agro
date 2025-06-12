export abstract class IDeleteProducer {
  abstract delete(producerId: string): Promise<void>
}
