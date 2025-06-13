import { ICreateFarm } from '#domain/usecases/farm/create-farm.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { FarmDto, FarmMapper } from '#presentation/mappers/farm.mapper.js'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator'

export class CreateFarmBodyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  producerId: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  city: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  state: string

  @ApiProperty()
  @Min(0, { message: 'Deve ser maior que 0' })
  @IsNumber()
  totalArea: number

  @ApiProperty()
  @Min(0, { message: 'Deve ser maior que 0' })
  @IsNumber()
  arableArea: number

  @ApiProperty()
  @Min(0, { message: 'Deve ser maior que 0' })
  @IsNumber()
  vegetationArea: number
}

@ApiTags('farm')
@Controller()
export class CreateFarmController {
  constructor(readonly createFarmService: ICreateFarm) {}

  @Post('/farm')
  @ApiOperation({ summary: 'Criar nova fazenda' })
  @ApiResponse({
    status: 201,
    description: 'Fazenda criada com sucesso',
    type: FarmDto,
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
  async handle(@Body() body: CreateFarmBodyDto): Promise<FarmDto> {
    const farm = await this.createFarmService.create(body)

    return FarmMapper.toDto(farm)
  }
}
