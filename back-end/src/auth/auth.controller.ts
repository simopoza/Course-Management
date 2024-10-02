import { Controller, Post, Get, Body, HttpException, HttpStatus, Query, Res, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { RegisterDto } from 'src/auth/dto/registerDto';
import { Request, Response } from 'express';
import { LoginDto } from 'src/auth/dto/loginDto';
import { JwtAuthGuard } from './guard/jwt.guard';

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
      res.redirect('https://localhost:5173/');
    } catch (error) {
      res.status(400).send('Invalid or expired confirmation token.');
    }
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  checkAuth(@Req() req, @Res() res: Response) {
    return res.status(200).json({ message: 'Authenticated' });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    try {
      // Logic for logout (clearing tokens, etc.)
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
