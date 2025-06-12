import { IFindProducerById } from '#domain/usecases/producer/find-producer-by-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  ProducerDto,
  ProducerMapper,
} from '#presentation/mappers/producer.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('producer')
@Controller()
export class FindProducerByIdController {
  constructor(readonly findProducerById: IFindProducerById) {}

  @Get('/producers/:producerId')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiNotFoundResponse({ type: HttpExceptionError })
  @ApiOkResponse({ type: ProducerDto, isArray: true })
  async handle(
    @Param('producerId', ParseUUIDPipe) producerId: string
  ): Promise<ProducerDto> {
    const data = await this.findProducerById.findById(producerId)

    return ProducerMapper.toDto(data)
  }
}
