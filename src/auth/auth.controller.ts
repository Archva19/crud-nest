import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { signUpDto } from './dto/sign-up.dto.js';
import { signInDto } from './dto/sign-in.dto.js';
import { AuthGuard } from './guards/auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() signUpDto: signUpDto) {
    return this.authService.SignUp(signUpDto);
  }

  @Post('/sign-in')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.SignIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('/current-user')
  currentUser(@Req() request:any) {
    const userId = request.userId;
     return this.authService.currentUser(userId);
  }
}
