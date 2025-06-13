import { IListPlantationsBySafraId } from '#domain/usecases/plantation/list-plantations-by-safra-id.js'
import { ICreateSafra } from '#domain/usecases/safra/create-safra.js'
import { IDeleteSafra } from '#domain/usecases/safra/delete-safra.js'
import { IFindSafraById } from '#domain/usecases/safra/find-safra-by-id.js'
import { IUpdateSafra } from '#domain/usecases/safra/update-safra.js'
import { CreateSafraController } from '#presentation/controllers/safra/create-safra.controller.js'
import { DeleteSafraController } from '#presentation/controllers/safra/delete-safra.controller.js'
import { FindSafraByIdController } from '#presentation/controllers/safra/find-safra-by-id.controller.js'
import { ListPlantationsBySafraIdController } from '#presentation/controllers/safra/list-plantations-by-safra-id.controller.js'
import { UpdateSafraController } from '#presentation/controllers/safra/update-safra.controller.js'
import { IListPlantationsBySafraIdRepository } from '#services/protocols/database/plantation-repository.js'
import { CreateSafra } from '#services/usecases/safra/create-safra.service.js'
import { DeleteSafra } from '#services/usecases/safra/delete-safra.service.js'
import { FindSafraById } from '#services/usecases/safra/find-safra-by-id.service.js'
import { UpdateSafra } from '#services/usecases/safra/update-safra.service.js'
import { PlantationRepositoryModule } from '#main/modules/repositories/plantation-repository.module.js'
import { PropertyRepositoryModule } from '#main/modules/repositories/property-repository.module.js'
import { SafraRepositoryModule } from '#main/modules/repositories/safra-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    SafraRepositoryModule,
    PropertyRepositoryModule,
    PlantationRepositoryModule,
  ],
  controllers: [
    CreateSafraController,
    UpdateSafraController,
    FindSafraByIdController,
    DeleteSafraController,
    ListPlantationsBySafraIdController,
  ],
  providers: [
    {
      provide: ICreateSafra,
      useClass: CreateSafra,
    },
    {
      provide: IUpdateSafra,
      useClass: UpdateSafra,
    },
    {
      provide: IFindSafraById,
      useClass: FindSafraById,
    },
    {
      provide: IDeleteSafra,
      useClass: DeleteSafra,
    },
    {
      provide: IListPlantationsBySafraId,
      useExisting: IListPlantationsBySafraIdRepository,
    },
  ],
})
export class SafraControllerModule {}
