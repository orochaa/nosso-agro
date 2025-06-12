import { IDeleteProducer } from '#domain/usecases/producer/delete-producer.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('producer')
@Controller()
export class DeleteProducerController {
  constructor(readonly updateProducerService: IDeleteProducer) {}

  @Delete('/producers/:producerId')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiOkResponse()
  async handle(@Param('producerId') producerId: string): Promise<void> {
    await this.updateProducerService.delete(producerId)
  }
}
