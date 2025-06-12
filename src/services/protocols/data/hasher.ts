export abstract class IHashGenerator {
  abstract generate(data: string): Promise<string>
}

export abstract class IHashComparator {
  abstract compare(data: string, hash: string): Promise<boolean>
}
