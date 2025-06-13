import { IUpdateProperty } from '#domain/usecases/property/update-property.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  PropertyDto,
  PropertyMapper,
} from '#presentation/mappers/property.mapper.js'
import { Body, Controller, Put } from '@nestjs/common'
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator'

export class UpdatePropertyBodyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  propertyId: string

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
  @IsNumber({}, { message: 'Campo obrigatório' })
  totalArea: number

  @ApiProperty()
  @Min(1, { message: 'Campo deve ser maior que 0' })
  @IsNumber({}, { message: 'Campo obrigatório' })
  agriculturalArea: number

  @ApiProperty()
  @Min(1, { message: 'Campo deve ser maior que 0' })
  @IsNumber({}, { message: 'Campo obrigatório' })
  vegetationArea: number
}

@ApiTags('property')
@Controller()
export class UpdatePropertyController {
  constructor(readonly updatePropertyService: IUpdateProperty) {}

  @Put('/property')
  @ApiOperation({ summary: 'Atualizar propriedade' })
  @ApiResponse({
    status: 200,
    description: 'Propriedade atualizada com sucesso',
    type: PropertyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: HttpExceptionError,
  })
  @ApiResponse({
    status: 404,
    description: 'Propriedade não encontrada',
    type: HttpExceptionError,
  })
  async handle(@Body() body: UpdatePropertyBodyDto): Promise<PropertyDto> {
    const property = await this.updatePropertyService.update(body)

    return PropertyMapper.toDto(property)
  }
}
