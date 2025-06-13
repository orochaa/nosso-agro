import { IDeleteProperty } from '#domain/usecases/property/delete-property.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('property')
@Controller()
export class DeletePropertyController {
  constructor(readonly updatePropertyService: IDeleteProperty) {}

  @Delete('/properties/:propertyId')
  @ApiOperation({ summary: 'Remover propriedade' })
  @ApiResponse({
    status: 200,
    description: 'Propriedade removida com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  @ApiResponse({
    status: 404,
    description: 'Propriedade não encontrada',
    type: HttpExceptionError,
  })
  async handle(@Param('propertyId') propertyId: string): Promise<void> {
    await this.updatePropertyService.delete(propertyId)
  }
}
