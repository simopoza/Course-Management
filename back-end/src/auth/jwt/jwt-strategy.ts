import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req.cookies ? req.cookies['accessToken'] : null;
          return token;
        },
      ]),
      ignoreExpiration: false,
    });
  }

  async validate(payload: { email: string; sub: string }) {
    const user = await this.userModel.findById(payload.sub).exec();

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('You need to confirm your account');
    }

    return user;
  }
}
