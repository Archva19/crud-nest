import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
