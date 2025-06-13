import { IDeleteSafra } from '#domain/usecases/safra/delete-safra.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('safra')
@Controller()
export class DeleteSafraController {
  constructor(readonly updateSafraService: IDeleteSafra) {}

  @Delete('/safras/:safraId')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiOkResponse()
  async handle(@Param('safraId') safraId: string): Promise<void> {
    await this.updateSafraService.delete(safraId)
  }
}
