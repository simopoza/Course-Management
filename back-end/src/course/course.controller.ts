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
    async getCourses(
        @Query() paginationDto: PaginationDto,
        @Query('query') query: string, 
        @Query('searchType') searchType: string
    ) {
        return await this.courseService.findAll(query, searchType, paginationDto);
    }
}