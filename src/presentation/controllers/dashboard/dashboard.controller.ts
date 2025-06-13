import { IDashboard } from '#domain/usecases/dashboard/dashboard.js'
import { Controller, Get } from '@nestjs/common'
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

class DashboardState {
  @ApiProperty()
  state: string
  @ApiProperty()
  count: number
}

class DashboardPlantation {
  @ApiProperty()
  plantation: string
  @ApiProperty()
  count: number
}

class DashboardLand {
  @ApiProperty()
  agriculturalArea: number
  @ApiProperty()
  vegetationArea: number
}

export class DashboardDto {
  @ApiProperty()
  totalProperties: number

  @ApiProperty()
  totalHectares: number

  @ApiProperty({ type: [DashboardState] })
  byState: DashboardState[]

  @ApiProperty({ type: [DashboardPlantation] })
  byPlantation: DashboardPlantation[]

  @ApiProperty()
  landUsage: DashboardLand
}

@ApiTags('dashboard')
@Controller()
export class DashboardController {
  constructor(readonly dashboardService: IDashboard) {}

  @Get('/dashboard')
  @ApiOperation({ summary: 'Busca dados do dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Dados do dashboard',
    type: DashboardDto,
  })
  async getDashboard(): Promise<DashboardDto> {
    return this.dashboardService.getDashboard()
  }
}
