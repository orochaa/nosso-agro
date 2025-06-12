import type { Farm } from '#domain/entities/farm.js'
import { ApiProperty } from '@nestjs/swagger'

export class FarmSampleDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  city: string
  @ApiProperty()
  state: string
  @ApiProperty()
  createdAt: string
}

export class FarmDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  city: string
  @ApiProperty()
  state: string
  @ApiProperty()
  totalArea: number
  @ApiProperty()
  arableArea: number
  @ApiProperty()
  vegetationArea: number
  @ApiProperty()
  createdAt: string
  @ApiProperty()
  updatedAt: string
}

export const FarmMapper = {
  toSampleDto(data: Farm): FarmSampleDto {
    return {
      id: data.id,
      name: data.name,
      city: data.city,
      state: data.state,
      createdAt: data.createdAt.toISOString(),
    }
  },
  mapToSampleDto(data: Farm[]): FarmSampleDto[] {
    return data.map(d => FarmMapper.toSampleDto(d))
  },
  toDto(data: Farm): FarmDto {
    return {
      id: data.id,
      name: data.name,
      city: data.city,
      state: data.state,
      totalArea: data.totalArea,
      arableArea: data.arableArea,
      vegetationArea: data.vegetationArea,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    }
  },
}
