import { IsEmail, IsNotEmpty } from 'class-validator';

export class createUser {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
