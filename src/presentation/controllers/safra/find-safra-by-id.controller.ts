import { IFindSafraById } from '#domain/usecases/safra/find-safra-by-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { SafraDto, SafraMapper } from '#presentation/mappers/safra.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('safra')
@Controller()
export class FindSafraByIdController {
  constructor(readonly findSafraById: IFindSafraById) {}

  @Get('/safras/:safraId')
  @ApiOperation({ summary: 'Buscar safra por ID' })
  @ApiResponse({
    status: 200,
    description: 'Safra encontrada com sucesso',
    type: SafraDto,
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
  ): Promise<SafraDto> {
    const data = await this.findSafraById.findById(safraId)

    return SafraMapper.toDto(data)
  }
}
