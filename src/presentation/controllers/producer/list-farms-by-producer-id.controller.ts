import { IListFarmsByProducerId } from '#domain/usecases/farm/list-farms-by-producer-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { FarmMapper, FarmSampleDto } from '#presentation/mappers/farm.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('producer')
@Controller()
export class ListFarmsByProducerIdController {
  constructor(readonly listFarmsByProducerId: IListFarmsByProducerId) {}

  @Get('/producers/:producerId/farms')
  @ApiOperation({ summary: 'Buscar fazendas por ID de produtor' })
  @ApiResponse({
    status: 200,
    description: 'Produtor encontrado com sucesso',
    type: [FarmSampleDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  async handle(
    @Param('producerId', ParseUUIDPipe) producerId: string
  ): Promise<FarmSampleDto[]> {
    const data = await this.listFarmsByProducerId.listByProducerId(producerId)

    return FarmMapper.mapToSampleDto(data)
  }
}
