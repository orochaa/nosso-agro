import { ICreatePlantation } from '#domain/usecases/plantation/create-plantation.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  PlantationDto,
  PlantationMapper,
} from '#presentation/mappers/plantation.mapper.js'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator'

export class CreatePlantationBodyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  safraId: string

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
export class CreatePlantationController {
  constructor(readonly createPlantationService: ICreatePlantation) {}

  @Post('/plantation')
  @ApiOperation({ summary: 'Criar nova Plantação' })
  @ApiResponse({
    status: 201,
    description: 'Plantação criada com sucesso',
    type: PlantationDto,
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
  async handle(@Body() body: CreatePlantationBodyDto): Promise<PlantationDto> {
    const plantation = await this.createPlantationService.create(body)

    return PlantationMapper.toDto(plantation)
  }
}
