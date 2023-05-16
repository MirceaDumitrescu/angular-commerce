export default interface IRegistration {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  address?: string;
  phone?: number;
  sex?: string;
  age?: number;
}
