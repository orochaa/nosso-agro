import { IDashboard } from '#domain/usecases/dashboard/dashboard.js'
import { DashboardController } from '#presentation/controllers/dashboard/dashboard.controller.js'
import { Dashboard } from '#services/usecases/dashboard/dashboard.service.js'
import { PrismaGatewayModule } from '#main/modules/gateways/prisma-gateway.module.js'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaGatewayModule],
  controllers: [DashboardController],
  providers: [
    {
      provide: IDashboard,
      useClass: Dashboard,
    },
  ],
})
export class DashboardControllerModule {}
