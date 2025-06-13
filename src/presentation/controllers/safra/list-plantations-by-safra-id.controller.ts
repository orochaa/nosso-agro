import { IListPlantationsBySafraId } from '#domain/usecases/plantation/list-plantations-by-safra-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  PlantationMapper,
  PlantationSampleDto,
} from '#presentation/mappers/plantation.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('safra')
@Controller()
export class ListPlantationsBySafraIdController {
  constructor(readonly listPlantationsBySafraId: IListPlantationsBySafraId) {}

  @Get('/safras/:safraId/plantations')
  @ApiOperation({ summary: 'Listar plantações por ID da safra' })
  @ApiResponse({
    status: 200,
    description: 'Plantações encontradas com sucesso',
    type: [PlantationSampleDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  async handle(
    @Param('safraId', ParseUUIDPipe) safraId: string
  ): Promise<PlantationSampleDto[]> {
    const data = await this.listPlantationsBySafraId.listBySafraId(safraId)

    return PlantationMapper.mapToSampleDto(data)
  }
}
