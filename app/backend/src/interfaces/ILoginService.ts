import { JwtPayload } from 'jsonwebtoken';

export default interface ILoginService {
  valid(email: string, password: string): void
  getByRole(role: string | null | JwtPayload): void
}
