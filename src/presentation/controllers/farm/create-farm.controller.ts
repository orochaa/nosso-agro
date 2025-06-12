import { ICreateFarm } from '#domain/usecases/farm/create-farm.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { FarmDto, FarmMapper } from '#presentation/mappers/farm.mapper.js'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
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
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiCreatedResponse({ type: FarmDto })
  async handle(@Body() body: CreateFarmBodyDto): Promise<FarmDto> {
    const farm = await this.createFarmService.create(body)

    return FarmMapper.toDto(farm)
  }
}
