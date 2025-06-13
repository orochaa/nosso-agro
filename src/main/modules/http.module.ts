import { DashboardControllerModule } from '#main/modules/controllers/dashboard-controller.module.js'
import { PlantationControllerModule } from '#main/modules/controllers/plantation-controller.module.js'
import { ProducerControllerModule } from '#main/modules/controllers/producer-controller.module.js'
import { PropertyControllerModule } from '#main/modules/controllers/property-controller.module.js'
import { SafraControllerModule } from '#main/modules/controllers/safra-controller.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    ProducerControllerModule,
    PropertyControllerModule,
    SafraControllerModule,
    PlantationControllerModule,
    DashboardControllerModule,
  ],
})
export class HttpModule {}
