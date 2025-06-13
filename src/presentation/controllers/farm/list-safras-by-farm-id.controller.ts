import { IListSafrasByFarmId } from '#domain/usecases/safra/list-safras-by-farm-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  SafraMapper,
  SafraSampleDto,
} from '#presentation/mappers/safra.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiBadGatewayResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('farm')
@Controller()
export class ListSafrasByFarmIdController {
  constructor(readonly listSafrasByFarmId: IListSafrasByFarmId) {}

  @Get('/farms/:farmId/safras')
  @ApiBadGatewayResponse({ type: HttpExceptionError })
  @ApiOkResponse({ type: SafraSampleDto, isArray: true })
  async handle(
    @Param('farmId', ParseUUIDPipe) farmId: string
  ): Promise<SafraSampleDto[]> {
    const data = await this.listSafrasByFarmId.listByFarmId(farmId)

    return SafraMapper.mapToSampleDto(data)
  }
}
