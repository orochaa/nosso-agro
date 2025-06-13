import { IFindPropertyById } from '#domain/usecases/property/find-property-by-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  PropertyDto,
  PropertyMapper,
} from '#presentation/mappers/property.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('property')
@Controller()
export class FindPropertyByIdController {
  constructor(readonly findPropertyById: IFindPropertyById) {}

  @Get('/properties/:propertyId')
  @ApiOperation({ summary: 'Buscar propriedade por ID' })
  @ApiResponse({
    status: 200,
    description: 'Propriedade encontrado com sucesso',
    type: PropertyDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Propriedade não encontrada',
    type: HttpExceptionError,
  })
  async handle(
    @Param('propertyId', ParseUUIDPipe) propertyId: string
  ): Promise<PropertyDto> {
    const data = await this.findPropertyById.findById(propertyId)

    return PropertyMapper.toDto(data)
  }
}
