import { ICreateFarm } from '#domain/usecases/farm/create-farm.js'
import { IDeleteFarm } from '#domain/usecases/farm/delete-farm.js'
import { IFindFarmById } from '#domain/usecases/farm/find-farm-by-id.js'
import { IUpdateFarm } from '#domain/usecases/farm/update-farm.js'
import { CreateFarmController } from '#presentation/controllers/farm/create-farm.controller.js'
import { DeleteFarmController } from '#presentation/controllers/farm/delete-farm.controller.js'
import { FindFarmByIdController } from '#presentation/controllers/farm/find-farm-by-id.controller.js'
import { UpdateFarmController } from '#presentation/controllers/farm/update-farm.controller.js'
import { IDeleteFarmRepository } from '#services/protocols/database/farm-repository.js'
import { CreateFarm } from '#services/usecases/farm/create-farm.service.js'
import { FindFarmById } from '#services/usecases/farm/find-farm-by-id.service.js'
import { UpdateFarm } from '#services/usecases/farm/update-farm.service.js'
import { FarmRepositoryModule } from '#main/modules/repositories/farm-repository.module.js'
import { ProducerRepositoryModule } from '#main/modules/repositories/producer-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [FarmRepositoryModule, ProducerRepositoryModule],
  controllers: [
    CreateFarmController,
    UpdateFarmController,
    FindFarmByIdController,
    DeleteFarmController,
  ],
  providers: [
    {
      provide: ICreateFarm,
      useClass: CreateFarm,
    },
    {
      provide: IUpdateFarm,
      useClass: UpdateFarm,
    },
    {
      provide: IFindFarmById,
      useClass: FindFarmById,
    },
    {
      provide: IDeleteFarm,
      useExisting: IDeleteFarmRepository,
    },
  ],
})
export class FarmControllerModule {}
