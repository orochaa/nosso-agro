import { ProducerControllerModule } from '#main/modules/controllers/producer-controller.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [ProducerControllerModule],
})
export class HttpModule {}
