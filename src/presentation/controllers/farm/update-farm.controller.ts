import { IUpdateFarm } from '#domain/usecases/farm/update-farm.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { FarmDto, FarmMapper } from '#presentation/mappers/farm.mapper.js'
import { Body, Controller, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator'

export class UpdateFarmBodyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  farmId: string

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
  @Min(1, { message: 'Campo deve ser maior que 0' })
  @IsNumber()
  totalArea: number

  @ApiProperty()
  @Min(1, { message: 'Campo deve ser maior que 0' })
  @IsNumber()
  arableArea: number

  @ApiProperty()
  @Min(1, { message: 'Campo deve ser maior que 0' })
  @IsNumber()
  vegetationArea: number
}

@ApiTags('farm')
@Controller()
export class UpdateFarmController {
  constructor(readonly updateFarmService: IUpdateFarm) {}

  @Put('/farm')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiOkResponse({ type: FarmDto })
  async handle(@Body() body: UpdateFarmBodyDto): Promise<FarmDto> {
    const farm = await this.updateFarmService.update(body)

    return FarmMapper.toDto(farm)
  }
}
