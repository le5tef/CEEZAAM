import type { CreateServiceSchema, ServiceSchema, UpdateServiceSchema } from '@/client'
import type { IService } from '@/entities/services'
import { Service } from '@/entities/services'

export function serviceSchemaToEntity(schema: ServiceSchema): IService {
  return new Service({
    id: schema.id,
    name: schema.title,
    description: schema.description,
    duration: schema.duration,
    mastersAmount: schema.masters_count,
    offices: schema.offices,
    requiredTimeAfter: schema.duration_after,
    requiredTimeBefore: schema.duration_before,
  })
}

export function serviceEntityToUpdateSchema(entity: IService): UpdateServiceSchema {
  return {
    description: entity.description,
    duration: entity.duration,
    duration_after: entity.requiredTimeAfter,
    duration_before: entity.requiredTimeBefore,
    masters_count: entity.mastersAmount,
    offices: entity.offices,
    title: entity.name,
  }
}

export function serviceEntityToCreateSchema(entity: IService): CreateServiceSchema {
  if (!entity.companyId) {
    throw Error('Cannot create schema, companyId missing')
  }
  return {
    company_id: entity.companyId,
    description: entity.description || '',
    duration: entity.duration,
    duration_after: entity.requiredTimeAfter,
    duration_before: entity.requiredTimeBefore,
    masters_count: entity.mastersAmount || 0,
    offices: entity.offices,
    title: entity.name,
  }
}
