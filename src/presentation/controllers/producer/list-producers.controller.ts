import { IListProducers } from '#domain/usecases/producer/list-producers.js'
import {
  ProducerMapper,
  ProducerSampleDto,
} from '#presentation/mappers/producer.mapper.js'
import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('producer')
@Controller()
export class ListProducersController {
  constructor(readonly listProducers: IListProducers) {}

  @Get('/producers')
  @ApiOperation({ summary: 'Listar todos os produtores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtores retornada com sucesso',
    type: [ProducerSampleDto],
  })
  async handle(): Promise<ProducerSampleDto[]> {
    const data = await this.listProducers.list()

    return ProducerMapper.mapToSampleDto(data)
  }
}
