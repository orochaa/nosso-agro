export abstract class IDeleteSafra {
  abstract delete(safraId: string): Promise<void>
}
