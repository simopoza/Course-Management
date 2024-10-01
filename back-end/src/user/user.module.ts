import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema'; // Adjust the import path as needed

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User model
  ],
  exports: [MongooseModule], // Export MongooseModule to make User model available to other modules
})
export class UserModule {}