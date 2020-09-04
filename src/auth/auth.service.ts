import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }


  public async singUp(authCredentialsDto: AuthCredentialsDto): Promise<{ status: string } | string> {
    let { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();

    try {
      await this.userRepository.create({
        username,
        password: await this.hashPassword(password, salt),
        salt
      }).save();

      return { status: "User created with succes!" };
    } catch (error) {

      if (error.code === '23505') {
        throw new ConflictException('Username already axists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string } | string> {
    let { username, password } = authCredentialsDto;

    //Find User
    const user = await this.userRepository.findOne({ username });

    //Validate User
    if (user) {
      //Validate Password
      const validatePassword = await bcrypt.hash(password, user.salt);

      //Validate User and Password
      if (validatePassword == user.password) {
        //Jwt Payload
        const payload: JwtPayload = { username: user.username };
        //Create payload
        const accessToken = await this.jwtService.sign(payload);
        //Return payload
        return { accessToken };
      }
    }

    //Invalid Credentials
    throw new UnauthorizedException('Invalid Credentials');
  }

  private async hashPassword(password, salt): Promise<string> {
    return await bcrypt.hash(password, salt)
  }
}
