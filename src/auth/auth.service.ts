import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { create } from 'domain';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }


  public async singUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;


    try {
      const createTask = await this.userRepository.create({
        username,
        password
      }).save();

      return createTask;
    } catch (error) {

      if (error.code === '23505') {
        throw new ConflictException('Username already axists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
