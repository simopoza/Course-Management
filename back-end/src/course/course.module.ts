import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './course.schema';
import { CourseService } from './course.service';
import { CourseController } from './couse.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    ],
    controllers: [CourseController],
    providers: [CourseService],
    exports: [CourseService],
})
export class CourseModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware) // Apply middleware
            .forRoutes(CourseController); // Apply to all routes in CourseController
    }

    constructor(private readonly courseService: CourseService) {}

    async onModuleInit() {
        await this.courseService.populateCourses();
    }
}
