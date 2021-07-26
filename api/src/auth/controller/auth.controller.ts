import {
  Get,
  Post,
  Controller,
  Req,
  Res,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../service/auth.service';

export class NewAccountData {
  readonly password: string;
  readonly email: string;
}

export class LoginData {
  readonly username: string;
  readonly password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  /**
   * Registers a new user
   * @param accountData: NewAccountData
   * @throws HttpException
   * @returns Promise<HttpResponse>
   */
  @Post('register')
  async register(@Body() accountData: NewAccountData, @Req() req) {
    const { password, email } = accountData;
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException('This user already exists', HttpStatus.CONFLICT);
    } else {
      const hash: string = await this.authService.hashPassword(password);

      const user: User = await this.usersRepository.create({
        email,
        password: hash,
      });

      await this.usersRepository.save(user);

      return {
          message: "Account created"
      };
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    const validatedUser = req.user;
    const response = await this.authService.login(validatedUser);

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    req.logout();
    return {
        message: 'Successfully logged out'
    };
  }

}
