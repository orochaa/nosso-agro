import { IDeleteFarm } from '#domain/usecases/farm/delete-farm.js'
import { HttpExceptionError } from '#presentation/mappers/error.mapper.js'
import { Controller, Delete, Param } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('farm')
@Controller()
export class DeleteFarmController {
  constructor(readonly updateFarmService: IDeleteFarm) {}

  @Delete('/farm/:farmId')
  @ApiBadRequestResponse({ type: HttpExceptionError })
  @ApiOkResponse()
  async handle(@Param('farmId') farmId: string): Promise<void> {
    await this.updateFarmService.delete(farmId)
  }
}
