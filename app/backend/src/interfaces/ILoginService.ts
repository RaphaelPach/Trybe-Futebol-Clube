export default interface ILoginService {
  valid(email: string, password: string): void
}
