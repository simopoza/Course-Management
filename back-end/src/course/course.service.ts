import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';
import { promises as fs } from 'fs';
import { PaginationDto } from './dto/paginationDto';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

    async findAll(paginationDto: PaginationDto): Promise<{ data: Course[]; total: number }> {
        console.log("pagination: ", paginationDto);
        const { page, limit } = paginationDto;

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.courseModel.find().skip(skip).limit(limit).exec(),
            this.courseModel.countDocuments().exec(),
        ]);

        return { data, total };
    }

    async populateCourses() {
        try {
            // Check if the courses collection is empty
            const count = await this.courseModel.countDocuments();
            if (count === 0) {
                console.log('Courses collection is empty. Populating with data from JSON file...');

                // Read the JSON file
                const data = await fs.readFile('data/courses_data.json', 'utf-8');
                const courses = JSON.parse(data);

                // Insert data into the courses collection with pagination
                const batchSize = 100; // Number of documents to insert at a time
                for (let i = 0; i < courses.length; i += batchSize) {
                    const batch = courses.slice(i, i + batchSize);
                    await this.courseModel.insertMany(batch);
                    console.log(`Inserted batch ${Math.ceil(i / batchSize) + 1}`);
                }
                console.log('All courses have been added to the database.');
            } else {
                console.log('Courses collection is already populated.');
            }
        } catch (error) {
            console.error('Error populating courses:', error);
        }
    }
}
