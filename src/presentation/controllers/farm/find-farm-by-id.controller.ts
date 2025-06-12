import { IFindFarmById } from '#domain/usecases/farm/find-farm-by-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  FarmDto,
  FarmMapper,
} from '#presentation/mappers/farm.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('farm')
@Controller()
export class FindFarmByIdController {
  constructor(readonly findFarmById: IFindFarmById) {}

  @Get('/farms/:farmId')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiNotFoundResponse({ type: HttpExceptionError })
  @ApiOkResponse({ type: FarmDto, isArray: true })
  async handle(
    @Param('farmId', ParseUUIDPipe) farmId: string
  ): Promise<FarmDto> {
    const data = await this.findFarmById.findById(farmId)

    return FarmMapper.toDto(data)
  }
}
