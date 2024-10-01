import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page?: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    limit?: number;
}