import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/singup')
  public singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.singUp(authCredentialsDto);
  }
}
