import { IListFarmsByProducerId } from '#domain/usecases/farm/list-farms-by-producer-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { FarmMapper, FarmSampleDto } from '#presentation/mappers/farm.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiBadGatewayResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('producer')
@Controller()
export class ListFarmsByProducerIdController {
  constructor(readonly listFarmsByProducerId: IListFarmsByProducerId) {}

  @Get('/producers/:producerId/farms')
  @ApiBadGatewayResponse({ type: HttpExceptionError })
  @ApiOkResponse({ type: FarmSampleDto, isArray: true })
  async handle(
    @Param('producerId', ParseUUIDPipe) producerId: string
  ): Promise<FarmSampleDto[]> {
    const data = await this.listFarmsByProducerId.listByProducerId(producerId)

    return FarmMapper.mapToSampleDto(data)
  }
}
