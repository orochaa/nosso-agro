export abstract class IDeleteProperty {
  abstract delete(propertyId: string): Promise<void>
}
