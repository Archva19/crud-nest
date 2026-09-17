import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { signUpDto } from './dto/sign-up.dto.js';
import { signInDto } from './dto/sign-in.dto.js';
import { AuthGuard } from './guards/auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'მომხმარებლის რეგისტრაცია' })
  @ApiResponse({ status: 201, description: 'მომხმარებელი წარმატებით შეიქმნა' })
  @ApiResponse({ status: 400, description: 'მომხმარებელი უკვე არსებობს ან არასწორი მონაცემები' })
  signUp(@Body() signUpDto: signUpDto) {
    return this.authService.SignUp(signUpDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'მომხმარებლის ავტორიზაცია (შესვლა)' })
  @ApiResponse({ status: 200, description: 'აბრუნებს JWT ტოკენს' })
  @ApiResponse({ status: 400, description: 'არასწორი მეილი ან პაროლი' })
  signIn(@Body() signInDto: signInDto) {
    return this.authService.SignIn(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/current-user')
  @ApiOperation({ summary: 'ავტორიზებული მომხმარებლის მიღება' })
  @ApiResponse({ status: 200, description: 'აბრუნებს მიმდინარე მომხმარებლის მონაცემებს' })
  @ApiResponse({ status: 401, description: 'არავალიდური ან დაკარგული ტოკენი' })
  currentUser(@Req() request:any) {
    const userId = request.userId;
     return this.authService.currentUser(userId);
  }

}
