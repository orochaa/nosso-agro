import { FarmControllerModule } from '#main/modules/controllers/farm-controller.module.js'
import { PlantationControllerModule } from '#main/modules/controllers/plantation-controller.module.js'
import { ProducerControllerModule } from '#main/modules/controllers/producer-controller.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    ProducerControllerModule,
    FarmControllerModule,
    PlantationControllerModule,
  ],
})
export class HttpModule {}
