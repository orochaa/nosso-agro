import { IFindSafraById } from '#domain/usecases/safra/find-safra-by-id.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import {
  SafraDto,
  SafraMapper,
} from '#presentation/mappers/safra.mapper.js'
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('safra')
@Controller()
export class FindSafraByIdController {
  constructor(readonly findSafraById: IFindSafraById) {}

  @Get('/safras/:safraId')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiNotFoundResponse({ type: HttpExceptionError })
  @ApiOkResponse({ type: SafraDto, isArray: true })
  async handle(
    @Param('safraId', ParseUUIDPipe) safraId: string
  ): Promise<SafraDto> {
    const data = await this.findSafraById.findById(safraId)

    return SafraMapper.toDto(data)
  }
}
