import { ICreateProperty } from '#domain/usecases/property/create-property.js'
import { IDeleteProperty } from '#domain/usecases/property/delete-property.js'
import { IFindPropertyById } from '#domain/usecases/property/find-property-by-id.js'
import { IUpdateProperty } from '#domain/usecases/property/update-property.js'
import { IListSafrasByPropertyId } from '#domain/usecases/safra/list-safras-by-property-id.js'
import { CreatePropertyController } from '#presentation/controllers/property/create-property.controller.js'
import { DeletePropertyController } from '#presentation/controllers/property/delete-property.controller.js'
import { FindPropertyByIdController } from '#presentation/controllers/property/find-property-by-id.controller.js'
import { ListSafrasByPropertyIdController } from '#presentation/controllers/property/list-safras-by-property-id.controller.js'
import { UpdatePropertyController } from '#presentation/controllers/property/update-property.controller.js'
import { IListSafrasByPropertyIdRepository } from '#services/protocols/database/safra-repository.js'
import { CreateProperty } from '#services/usecases/property/create-property.service.js'
import { DeleteProperty } from '#services/usecases/property/delete-property.service.js'
import { FindPropertyById } from '#services/usecases/property/find-property-by-id.service.js'
import { UpdateProperty } from '#services/usecases/property/update-property.service.js'
import { ProducerRepositoryModule } from '#main/modules/repositories/producer-repository.module.js'
import { PropertyRepositoryModule } from '#main/modules/repositories/property-repository.module.js'
import { SafraRepositoryModule } from '#main/modules/repositories/safra-repository.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    PropertyRepositoryModule,
    ProducerRepositoryModule,
    SafraRepositoryModule,
  ],
  controllers: [
    CreatePropertyController,
    UpdatePropertyController,
    FindPropertyByIdController,
    DeletePropertyController,
    ListSafrasByPropertyIdController,
  ],
  providers: [
    {
      provide: ICreateProperty,
      useClass: CreateProperty,
    },
    {
      provide: IUpdateProperty,
      useClass: UpdateProperty,
    },
    {
      provide: IFindPropertyById,
      useClass: FindPropertyById,
    },
    {
      provide: IDeleteProperty,
      useClass: DeleteProperty,
    },
    {
      provide: IListSafrasByPropertyId,
      useExisting: IListSafrasByPropertyIdRepository,
    },
  ],
})
export class PropertyControllerModule {}
