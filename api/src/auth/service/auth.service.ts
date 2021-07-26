import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getConnection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  /**
   * @todo
   * This needs to be re-written with bcrypt
   *
   * @param email
   * @param password
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
        email
    });
    const users = await this.usersRepository.find();
    this.usersRepository.delete(5);
    if (!user) {
      throw new HttpException(
        'Your email or password does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    
    throw new HttpException(
      'Your email or password is not valid',
      HttpStatus.NOT_FOUND,
    );
  }

  async hashPassword(password: string): Promise<any> {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  }

  async login(user: any) {
    // get the private key from the config file -> environment variable
    const payload = { username: user.email, sub: user.id };
    user.password = null;
    
    return { 
        accessToken: this.jwtService.sign(payload), 
        user 
    };
  }
}
