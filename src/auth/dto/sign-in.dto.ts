import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class signInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  password!: string;
}
