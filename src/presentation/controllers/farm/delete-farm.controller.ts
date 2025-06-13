import { IDeleteFarm } from '#domain/usecases/farm/delete-farm.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('farm')
@Controller()
export class DeleteFarmController {
  constructor(readonly updateFarmService: IDeleteFarm) {}

  @Delete('/farms/:farmId')
  @ApiOperation({ summary: 'Remover fazenda' })
  @ApiResponse({
    status: 200,
    description: 'Fazenda removida com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  @ApiResponse({
    status: 404,
    description: 'Fazenda não encontrada',
    type: HttpExceptionError,
  })
  async handle(@Param('farmId') farmId: string): Promise<void> {
    await this.updateFarmService.delete(farmId)
  }
}
