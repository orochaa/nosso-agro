import { HttpModule } from '#main/modules/http.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [HttpModule],
})
export class AppModule {}
