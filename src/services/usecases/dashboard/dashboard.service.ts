import type { IDashboard } from '#domain/usecases/dashboard/dashboard.js'
import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class Dashboard implements IDashboard {
  constructor(readonly prisma: PrismaService) {}

  async getDashboard(): Promise<IDashboard.Result> {
    const [totalProperties, totalHectares, byState, byPlantation, landUsage] =
      await Promise.all([
        this.prisma.property.count(),

        this.prisma.property.aggregate({
          _sum: { totalArea: true },
        }),

        this.prisma.property.groupBy({
          by: ['state'],
          _count: { _all: true },
        }),

        this.prisma.plantation.groupBy({
          by: ['name'],
          _count: { _all: true },
        }),

        this.prisma.property.aggregate({
          _sum: {
            agriculturalArea: true,
            vegetationArea: true,
          },
        }),
      ])

    return {
      totalProperties,
      totalHectares: totalHectares._sum.totalArea ?? 0,

      byState: byState.map(item => ({
        state: item.state,
        count: item._count._all,
      })),

      byPlantation: byPlantation.map(item => ({
        plantation: item.name,
        count: item._count._all,
      })),

      landUsage: {
        agriculturalArea: landUsage._sum.agriculturalArea ?? 0,
        vegetationArea: landUsage._sum.vegetationArea ?? 0,
      },
    }
  }
}
