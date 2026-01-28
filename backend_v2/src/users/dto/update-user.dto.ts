import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @MaxLength(50)
    @IsOptional()
    slogan?: string;
    
    @IsString()
    @MaxLength(255)
    @IsOptional()
    about?: string;
    
    @IsString()
    @MaxLength(15)
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    occupation?: string;

    @IsOptional()
    @IsString()
    livesIn?: string;   

}
