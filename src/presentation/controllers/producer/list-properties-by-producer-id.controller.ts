import { IListPropertiesByProducerId } from '#domain/usecases/property/list-properties-by-producer-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  PropertyMapper,
  PropertySampleDto,
} from '#presentation/mappers/property.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('producer')
@Controller()
export class ListPropertiesByProducerIdController {
  constructor(
    readonly listPropertiesByProducerId: IListPropertiesByProducerId
  ) {}

  @Get('/producers/:producerId/properties')
  @ApiOperation({ summary: 'Buscar propriedades por ID de produtor' })
  @ApiResponse({
    status: 200,
    description: 'Produtor encontrado com sucesso',
    type: [PropertySampleDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  async handle(
    @Param('producerId', ParseUUIDPipe) producerId: string
  ): Promise<PropertySampleDto[]> {
    const data =
      await this.listPropertiesByProducerId.listByProducerId(producerId)

    return PropertyMapper.mapToSampleDto(data)
  }
}
