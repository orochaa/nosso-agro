import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaGatewayModule {}
