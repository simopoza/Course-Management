import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { PaginationDto } from './dto/paginationDto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get('')
    @UseGuards(JwtAuthGuard)
    async getCourses(@Query() paginationDto: PaginationDto) {
        console.log('data: ', paginationDto);
        return await this.courseService.findAll(paginationDto);
    }
    @Get('walo')
    wlo() {
        console.log('wlo');
        return ("walo");
    }
}