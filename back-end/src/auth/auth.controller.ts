import { Controller, Post, Get, Body, HttpException, HttpStatus, Query, Res, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { RegisterDto } from 'src/auth/dto/registerDto';
import { Request, Response } from 'express';
import { LoginDto } from 'src/auth/dto/loginDto';
import { JwtAuthGuard } from './guard/jwt.guard';
import { IpValidationGuard } from './guard/ipValidation.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log("data: ", registerDto);
    try {
      const user = await this.authService.register(registerDto);
      if (user) {
        return true;
      } else {
        throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('confirm')
  async confirm(@Query('token') token: string, @Res() res: Response): Promise<void> {
    try {
      await this.authService.activateUser(token); // Ensure this method is implemented correctly
      res.redirect('http://localhost:5173/');
    } catch (error) {
      console.error('Error confirming user:', error);
      res.status(400).send('Invalid or expired confirmation token.');
    }
  }

  @Post('refresh-token')
  @UseGuards(IpValidationGuard)
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken']; // Read the refresh token from the cookies

    console.log('refresh token');

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not provided' });
    }
    return this.authService.refreshToken(refreshToken, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  test() {
    console.log('im in');
    return ('data');
  }

}
