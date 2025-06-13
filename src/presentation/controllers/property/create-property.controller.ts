import { ICreateProperty } from '#domain/usecases/property/create-property.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  PropertyDto,
  PropertyMapper,
} from '#presentation/mappers/property.mapper.js'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator'

export class CreatePropertyBodyDto {
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
  @IsNumber({}, { message: 'Campo obrigatório' })
  totalArea: number

  @ApiProperty()
  @Min(0, { message: 'Deve ser maior que 0' })
  @IsNumber({}, { message: 'Campo obrigatório' })
  arableArea: number

  @ApiProperty()
  @Min(0, { message: 'Deve ser maior que 0' })
  @IsNumber({}, { message: 'Campo obrigatório' })
  vegetationArea: number
}

@ApiTags('property')
@Controller()
export class CreatePropertyController {
  constructor(readonly createPropertyService: ICreateProperty) {}

  @Post('/property')
  @ApiOperation({ summary: 'Criar nova propriedade' })
  @ApiResponse({
    status: 201,
    description: 'Propriedade criada com sucesso',
    type: PropertyDto,
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
  async handle(@Body() body: CreatePropertyBodyDto): Promise<PropertyDto> {
    const property = await this.createPropertyService.create(body)

    return PropertyMapper.toDto(property)
  }
}
