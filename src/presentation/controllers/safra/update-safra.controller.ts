import { IUpdateSafra } from '#domain/usecases/safra/update-safra.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { SafraDto, SafraMapper } from '#presentation/mappers/safra.mapper.js'
import { Body, Controller, Put } from '@nestjs/common'
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
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
  @ApiOperation({ summary: 'Atualizar safra' })
  @ApiResponse({
    status: 200,
    description: 'Safra atualizada com sucesso',
    type: SafraDto,
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
  async handle(@Body() body: UpdateSafraBodyDto): Promise<SafraDto> {
    const safra = await this.updateSafraService.update(body)

    return SafraMapper.toDto(safra)
  }
}
