import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class signInDto {
  @ApiProperty({ example: 'giorgi@example.com', description: 'მომხმარებლის ელ-ფოსტა' })
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
