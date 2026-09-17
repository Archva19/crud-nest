import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { signUpDto } from './dto/sign-up.dto.js';
import * as bcrypt from 'bcrypt';
import { signInDto } from './dto/sign-in.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService:JwtService) {}

  async SignUp(signUpDto: signUpDto) {
    const existingUser = await this.usersService.findOneByEmail(
      signUpDto.email,
    );
    if (existingUser) throw new BadRequestException('User already exists');
    const hashedPass = await bcrypt.hash(signUpDto.password, 10);
    await this.usersService.create({ ...signUpDto, password: hashedPass });
    return 'მომხმარებელი წარმატებით შეიქმნა';
  }

  async SignIn(signInDto: signInDto) {
    const existingUser = await this.usersService.findOneByEmail(
      signInDto.email,
    );
    if (!existingUser) throw new BadRequestException("User doesn't exist");
    const isEqualPass = await bcrypt.compare(
      signInDto.password,
      existingUser.password,
    );
    const payload = {
        userId:existingUser._id
    }
    const token = await this.jwtService.sign(payload, {expiresIn: "1h"});
    return token;
  }

  async currentUser(userId:string){
    const user = await this.usersService.findOne(userId);
    return user;
  }
}
