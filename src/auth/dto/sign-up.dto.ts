import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class signUpDto {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  password!: string;
}
