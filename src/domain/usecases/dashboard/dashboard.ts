export abstract class IDashboard {
  abstract getDashboard(): Promise<IDashboard.Result>
}

export namespace IDashboard {
  export interface Result {
    totalProperties: number
    totalHectares: number
    byState: {
      state: string
      count: number
    }[]
    byPlantation: {
      plantation: string
      count: number
    }[]
    landUsage: {
      agriculturalArea: number
      vegetationArea: number
    }
  }
}
