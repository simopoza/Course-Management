import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { PaginationDto } from './dto/paginationDto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateCourseDto } from './dto/createCourse.dto'; // Import the new DTO

@ApiTags('courses')
@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
    
    @Get('')
    @UseGuards(JwtAuthGuard)
    async getCourses(
        @Query() paginationDto: PaginationDto,
        @Query('query') query: string, 
        @Query('searchType') searchType: string
    ) {
        return await this.courseService.findAll(query, searchType, paginationDto);
    }

    @Post() // Add the POST decorator
    @UseGuards(JwtAuthGuard) // Ensure the user is authenticated
    async createCourse(@Body() createCourseDto: CreateCourseDto) {
        return await this.courseService.create(createCourseDto);
    }
}
