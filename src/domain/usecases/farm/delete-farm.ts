export abstract class IDeleteFarm {
  abstract delete(farmId: string): Promise<void>
}
