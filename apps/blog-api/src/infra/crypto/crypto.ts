import { createHmac, randomBytes, randomUUID } from 'node:crypto'

export function generatePasswordHash(password: string, salt: string): string {
  const hash = createHmac('sha512', salt).update(password).digest('hex')
  return hash
}

export function generateSalt(length: number = 16): string {
  return randomBytes(length).toString('hex')
}

export function comparePassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const passwordHash = generatePasswordHash(password, salt)
  return passwordHash === hash
}

export function genUUID(): string {
  return randomUUID().toString()
}
