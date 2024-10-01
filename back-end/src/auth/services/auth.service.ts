import { Injectable, ConflictException, UnauthorizedException, Res } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerDto';
import * as bcrypt from 'bcryptjs';
import { EmailService } from './email.service';
import { LoginDto } from 'src/auth/dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../user/user.schema';


@Injectable()
export class AuthService {
  private readonly refreshTokenSecret = process.env.refresh_token_secret;
  private readonly refreshTokenExpiration = '7d';

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { secret: this.refreshTokenSecret, expiresIn: this.refreshTokenExpiration });

    const { password: _, ...userWithoutPassword } = user; // Exclude password

    res.cookie('accessToken', accessToken, {
      httpOnly: true, // Makes it inaccessible to JavaScript
      secure: true,   // Only sent over HTTPS
      sameSite: 'strict', // Prevents CSRF (cross-site request forgery) attacks
      maxAge: 1 * 60 * 1000, // time expiry
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      message: 'User logged in successfully',
      user: userWithoutPassword,
    };
  }

  async refreshToken(refreshToken: string, @Res({ passthrough: true }) res: Response) {
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: this.refreshTokenSecret });
      const { email, sub: userId } = decoded;

      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = this.jwtService.sign({ email, sub: userId });
      const newRefreshToken = this.jwtService.sign({ email, sub: userId }, { secret: this.refreshTokenSecret, expiresIn: this.refreshTokenExpiration });

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1 * 60 * 1000, // 15 minutes
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // console.log('access: ', newAccessToken);
      // console.log('refresh: ', newRefreshToken);

      return { message: 'Tokens refreshed successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }


  async validateUser(email: string, password: string){
    const user = await this.userModel.findOne({ email });
    
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { fullName, email, password } = registerDto;

    // Check if email already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newUser = new this.userModel({
        fullName,
        email,
        password: hashedPassword,
      });
  
      const confirmationLink = `https://localhost:3000/auth/confirm?token=${newUser._id}`;
      console.log('id: ', newUser._id);
      await this.emailService.sendConfirmationEmail(newUser.email, confirmationLink);

      return await newUser.save();
    } catch (error) {
      console.log("Error: ", error);

      if (this.isDatabaseError(error) && error.code === 'ER_DUP_ENTRY') { 
        throw new ConflictException('Email or phone number already used');
      }
      
      throw error;
    }
  }

  private isDatabaseError(error: any): error is { code: string } {
    return error && typeof error === 'object' && 'code' in error;
  }

  async activateUser(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId); // Use `userModel` to find by ID
    if (!user) {
      throw new Error('User not found');
    }
  
    user.isActive = true; // Assuming you have an `isActive` field in the schema
    console.log("user: ", user);
    await user.save(); // Save the updated user
  }
}

