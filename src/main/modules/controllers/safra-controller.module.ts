import { ICreateSafra } from '#domain/usecases/safra/create-safra.js'
import { IDeleteSafra } from '#domain/usecases/safra/delete-safra.js'
import { IFindSafraById } from '#domain/usecases/safra/find-safra-by-id.js'
import { IUpdateSafra } from '#domain/usecases/safra/update-safra.js'
import { CreateSafraController } from '#presentation/controllers/safra/create-safra.controller.js'
import { DeleteSafraController } from '#presentation/controllers/safra/delete-safra.controller.js'
import { FindSafraByIdController } from '#presentation/controllers/safra/find-safra-by-id.controller.js'
import { UpdateSafraController } from '#presentation/controllers/safra/update-safra.controller.js'
import { IDeleteSafraRepository } from '#services/protocols/database/safra-repository.js'
import { CreateSafra } from '#services/usecases/safra/create-safra.service.js'
import { FindSafraById } from '#services/usecases/safra/find-safra-by-id.service.js'
import { UpdateSafra } from '#services/usecases/safra/update-safra.service.js'
import { SafraRepositoryModule } from '#main/modules/repositories/safra-repository.module.js'
import { FarmRepositoryModule } from '#main/modules/repositories/farm-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [SafraRepositoryModule, FarmRepositoryModule],
  controllers: [
    CreateSafraController,
    UpdateSafraController,
    FindSafraByIdController,
    DeleteSafraController,
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
      useExisting: IDeleteSafraRepository,
    },
  ],
})
export class SafraControllerModule {}
