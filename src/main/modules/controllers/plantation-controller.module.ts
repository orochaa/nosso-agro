import { ICreatePlantation } from '#domain/usecases/plantation/create-plantation.js'
import { IDeletePlantation } from '#domain/usecases/plantation/delete-plantation.js'
import { IUpdatePlantation } from '#domain/usecases/plantation/update-plantation.js'
import { CreatePlantationController } from '#presentation/controllers/plantation/create-plantation.controller.js'
import { DeletePlantationController } from '#presentation/controllers/plantation/delete-plantation.controller.js'
import { UpdatePlantationController } from '#presentation/controllers/plantation/update-plantation.controller.js'
import { CreatePlantation } from '#services/usecases/plantation/create-plantation.service.js'
import { DeletePlantation } from '#services/usecases/plantation/delete-plantation.service.js'
import { UpdatePlantation } from '#services/usecases/plantation/update-plantation.service.js'
import { PlantationRepositoryModule } from '#main/modules/repositories/plantation-repository.module.js'
import { SafraRepositoryModule } from '#main/modules/repositories/safra-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PlantationRepositoryModule, SafraRepositoryModule],
  controllers: [
    CreatePlantationController,
    UpdatePlantationController,
    DeletePlantationController,
  ],
  providers: [
    {
      provide: ICreatePlantation,
      useClass: CreatePlantation,
    },
    {
      provide: IUpdatePlantation,
      useClass: UpdatePlantation,
    },
    {
      provide: IDeletePlantation,
      useClass: DeletePlantation,
    },
  ],
})
export class PlantationControllerModule {}
