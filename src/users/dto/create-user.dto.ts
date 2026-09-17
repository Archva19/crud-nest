import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'გიორგი ბერიძე', description: 'მომხმარებლის სრული სახელი' })
  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({ example: 'giorgi@example.com', description: 'ელ-ფოსტა' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'securePassword123', description: 'პაროლი' })
  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  password!: string;
}
