import { IDeletePlantation } from '#domain/usecases/plantation/delete-plantation.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('plantation')
@Controller()
export class DeletePlantationController {
  constructor(readonly updatePlantationService: IDeletePlantation) {}

  @Delete('/plantations/:plantationId')
  @ApiOperation({ summary: 'Remover Plantação' })
  @ApiResponse({
    status: 200,
    description: 'Plantação removida com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  @ApiResponse({
    status: 404,
    description: 'Plantação não encontrada',
    type: HttpExceptionError,
  })
  async handle(@Param('plantationId', ParseUUIDPipe) plantationId: string): Promise<void> {
    await this.updatePlantationService.delete(plantationId)
  }
}
