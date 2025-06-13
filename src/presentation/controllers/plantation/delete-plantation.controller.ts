import { IDeletePlantation } from '#domain/usecases/plantation/delete-plantation.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('plantation')
@Controller()
export class DeletePlantationController {
  constructor(readonly updatePlantationService: IDeletePlantation) {}

  @Delete('/plantation/:plantationId')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiOkResponse()
  async handle(@Param('plantationId') plantationId: string): Promise<void> {
    await this.updatePlantationService.delete(plantationId)
  }
}
