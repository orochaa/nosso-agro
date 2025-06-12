import { IUpdateProducer } from '#domain/usecases/producer/update-producer.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  ProducerDto,
  ProducerMapper,
} from '#presentation/mappers/producer.mapper.js'
import { Body, Controller, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateProducerBodyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  producerId: string

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
export class UpdateProducerController {
  constructor(readonly updateProducerService: IUpdateProducer) {}

  @Put('/producer')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiOkResponse({ type: ProducerDto })
  async handle(@Body() body: UpdateProducerBodyDto): Promise<ProducerDto> {
    const producer = await this.updateProducerService.update(body)

    return ProducerMapper.toDto(producer)
  }
}
