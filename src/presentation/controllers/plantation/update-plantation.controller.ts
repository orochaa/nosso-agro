import { IUpdatePlantation } from '#domain/usecases/plantation/update-plantation.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  PlantationDto,
  PlantationMapper,
} from '#presentation/mappers/plantation.mapper.js'
import { Body, Controller, Put } from '@nestjs/common'
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator'

export class UpdatePlantationBodyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  plantationId: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string

  @ApiProperty()
  @Min(1, { message: 'Área deve ser maior que 0' })
  @IsNumber()
  area: number
}

@ApiTags('plantation')
@Controller()
export class UpdatePlantationController {
  constructor(readonly updatePlantationService: IUpdatePlantation) {}

  @Put('/plantation')
  @ApiOperation({ summary: 'Atualizar Plantação' })
  @ApiResponse({
    status: 200,
    description: 'Plantação atualizada com sucesso',
    type: PlantationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  @ApiResponse({
    status: 404,
    description: 'Plantação não encontrada',
    type: HttpExceptionError,
  })
  async handle(@Body() body: UpdatePlantationBodyDto): Promise<PlantationDto> {
    const plantation = await this.updatePlantationService.update(body)

    return PlantationMapper.toDto(plantation)
  }
}
