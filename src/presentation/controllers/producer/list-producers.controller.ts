import { IListProducers } from '#domain/usecases/producer/list-producers.js'
import {
  ProducerMapper,
  ProducerSampleDto,
} from '#presentation/mappers/producer.mapper.js'
import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('producer')
@Controller()
export class ListProducersController {
  constructor(readonly listProducers: IListProducers) {}

  @Get('/producers')
  @ApiOkResponse({ type: ProducerSampleDto, isArray: true })
  async handle(): Promise<ProducerSampleDto[]> {
    const data = await this.listProducers.list()

    return ProducerMapper.mapToSampleDto(data)
  }
}
