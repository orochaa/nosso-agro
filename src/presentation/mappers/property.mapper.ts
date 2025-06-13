import type { Property } from '#domain/entities/property.js'
import { ApiProperty } from '@nestjs/swagger'

export class PropertySampleDto {
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

export class PropertyDto {
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

export const PropertyMapper = {
  toSampleDto(data: Property): PropertySampleDto {
    return {
      id: data.id,
      name: data.name,
      city: data.city,
      state: data.state,
      createdAt: data.createdAt.toISOString(),
    }
  },
  mapToSampleDto(data: Property[]): PropertySampleDto[] {
    return data.map(d => PropertyMapper.toSampleDto(d))
  },
  toDto(data: Property): PropertyDto {
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
