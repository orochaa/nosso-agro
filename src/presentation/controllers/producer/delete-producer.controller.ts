import { IDeleteProducer } from '#domain/usecases/producer/delete-producer.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('producer')
@Controller()
export class DeleteProducerController {
  constructor(readonly updateProducerService: IDeleteProducer) {}

  @Delete('/producers/:producerId')
  @ApiOperation({ summary: 'Remover produtor' })
  @ApiResponse({
    status: 200,
    description: 'Produtor removido com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  @ApiResponse({
    status: 404,
    description: 'Produtor não encontrado',
    type: HttpExceptionError,
  })
  async handle(@Param('producerId') producerId: string): Promise<void> {
    await this.updateProducerService.delete(producerId)
  }
}
