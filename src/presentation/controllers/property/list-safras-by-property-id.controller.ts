import { IListSafrasByPropertyId } from '#domain/usecases/safra/list-safras-by-property-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  SafraMapper,
  SafraSampleDto,
} from '#presentation/mappers/safra.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('property')
@Controller()
export class ListSafrasByPropertyIdController {
  constructor(readonly listSafrasByPropertyId: IListSafrasByPropertyId) {}

  @Get('/properties/:propertyId/safras')
  @ApiOperation({ summary: 'Listar safras por propriedade' })
  @ApiResponse({
    status: 200,
    description: 'Lista de safras',
    type: [SafraSampleDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  async handle(
    @Param('propertyId', ParseUUIDPipe) propertyId: string
  ): Promise<SafraSampleDto[]> {
    const data = await this.listSafrasByPropertyId.listByPropertyId(propertyId)

    return SafraMapper.mapToSampleDto(data)
  }
}
