import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './course.schema';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    ],
    controllers: [CourseController],
    providers: [CourseService],
    exports: [CourseService],
})
export class CourseModule {
    constructor(private readonly courseService: CourseService) {}

    async onModuleInit() {
        await this.courseService.populateCourses();
    }
}
