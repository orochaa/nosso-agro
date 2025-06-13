import { IUpdateSafra } from '#domain/usecases/safra/update-safra.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { SafraDto, SafraMapper } from '#presentation/mappers/safra.mapper.js'
import { Body, Controller, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateSafraBodyDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  safraId: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string
}

@ApiTags('safra')
@Controller()
export class UpdateSafraController {
  constructor(readonly updateSafraService: IUpdateSafra) {}

  @Put('/safra')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiOkResponse({ type: SafraDto })
  async handle(@Body() body: UpdateSafraBodyDto): Promise<SafraDto> {
    const safra = await this.updateSafraService.update(body)

    return SafraMapper.toDto(safra)
  }
}
