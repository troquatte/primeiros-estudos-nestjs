import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/singup')
  public singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ status: string } | string> {
    return this.authService.singUp(authCredentialsDto);
  }

  @Post('/singin')
  public singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string } | string> {
    return this.authService.singIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  public test(@GetUser() user: User) {
    console.log(user)
    return user;
  }
}
