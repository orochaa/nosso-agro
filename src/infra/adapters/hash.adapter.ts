import type {
  IHashComparator,
  IHashGenerator,
} from '#services/protocols/data/hasher'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

@Injectable()
export class HashAdapter implements IHashGenerator, IHashComparator {
  async generate(data: string): Promise<string> {
    return hash(data, 12)
  }

  async compare(data: string, dataHash: string): Promise<boolean> {
    return compare(data, dataHash)
  }
}
