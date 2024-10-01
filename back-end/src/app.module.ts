import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/coursesDB'),
    AuthModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}