export abstract class IDeletePlantation {
  abstract delete(plantationId: string): Promise<void>
}
