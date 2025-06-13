import { IDeleteSafra } from '#domain/usecases/safra/delete-safra.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('safra')
@Controller()
export class DeleteSafraController {
  constructor(readonly updateSafraService: IDeleteSafra) {}

  @Delete('/safras/:safraId')
  @ApiOperation({ summary: 'Criar nova safra' })
  @ApiResponse({
    status: 200,
    description: 'Safra removida com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  @ApiResponse({
    status: 404,
    description: 'Safra não encontrada',
    type: HttpExceptionError,
  })
  async handle(
    @Param('safraId', ParseUUIDPipe) safraId: string
  ): Promise<void> {
    await this.updateSafraService.delete(safraId)
  }
}
