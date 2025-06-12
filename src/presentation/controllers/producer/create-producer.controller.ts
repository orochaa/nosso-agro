import { ICreateProducer } from '#domain/usecases/producer/create-producer.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  ProducerDto,
  ProducerMapper,
} from '#presentation/mappers/producer.mapper.js'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateProducerBodyDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  firstName: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  lastName: string

  @ApiProperty()
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Campo obrigatório' })
  email: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  document: string
}

@ApiTags('producer')
@Controller()
export class CreateProducerController {
  constructor(readonly createProducerService: ICreateProducer) {}

  @Post('/producer')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiCreatedResponse({ type: ProducerDto })
  async handle(@Body() body: CreateProducerBodyDto): Promise<ProducerDto> {
    const producer = await this.createProducerService.create(body)

    return ProducerMapper.toDto(producer)
  }
}
