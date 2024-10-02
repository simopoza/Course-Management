import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';
import { promises as fs } from 'fs';
import { PaginationDto } from './dto/paginationDto';
import { CreateCourseDto } from './dto/createCourse.dto'; // Import the DTO

@Injectable()
export class CourseService {
	constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

	// Search and Pagination logic
	async findAll(query: string, searchType: string, paginationDto: PaginationDto): Promise<{ data: Course[]; total: number }> {
		const { page, limit } = paginationDto;
		const skip = (page - 1) * limit;
		const regex = new RegExp(query, 'i'); // Case-insensitive search

		let searchCriteria = {};
		if (searchType === 'title') {
			searchCriteria = { title: regex };
		} else if (searchType === 'instructor') {
			searchCriteria = { instructor: regex };
		} else {
			searchCriteria = {
				$or: [
					{ title: regex },
					{ instructor: regex },
				],
			};
		}

		const [data, total] = await Promise.all([
			this.courseModel
					.find(searchCriteria) 
					.skip(skip)
					.limit(limit)
					.exec(),
			this.courseModel.countDocuments(searchCriteria).exec(), 
		]);

		return { data, total };
	}

	// Populating courses
	async populateCourses() {
		try {
			const count = await this.courseModel.countDocuments();
			if (count === 0) {
				console.log('Courses collection is empty. Populating with data from JSON file...');

				const data = await fs.readFile('data/courses_data.json', 'utf-8');
				const courses = JSON.parse(data);

				const batchSize = 100; // Batch insert
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

	// Create a new course
	async create(createCourseDto: CreateCourseDto): Promise<Course> {
		const newCourse = new this.courseModel(createCourseDto);
		return await newCourse.save(); // Save the new course in the database
	}

}
