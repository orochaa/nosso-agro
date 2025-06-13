import { ICreateSafra } from '#domain/usecases/safra/create-safra.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { SafraDto, SafraMapper } from '#presentation/mappers/safra.mapper.js'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateSafraBodyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  farmId: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string
}

@ApiTags('safra')
@Controller()
export class CreateSafraController {
  constructor(readonly createSafraService: ICreateSafra) {}

  @Post('/safra')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiCreatedResponse({ type: SafraDto })
  async handle(@Body() body: CreateSafraBodyDto): Promise<SafraDto> {
    const safra = await this.createSafraService.create(body)

    return SafraMapper.toDto(safra)
  }
}
