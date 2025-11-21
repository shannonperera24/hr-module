import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo_id', {
      storage: diskStorage({
        destination: './uploads/employees',
        filename: (req, file, cb) => {
          const timestamp = Date.now();
          const ext = extname(file.originalname);
          const baseName = file.originalname
            .replace(ext, '')
            .replace(/\s+/g, '_')
            .toLowerCase();
          cb(null, `${baseName}_${timestamp}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(new BadRequestException('Only image files are allowed (jpg, jpeg, png)'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async create(
    @Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      createEmployeeDto.photo_id = `uploads/employees/${file.filename}`;
    }
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('photo_id', {
      storage: diskStorage({
        destination: './uploads/employees',
        filename: (req, file, cb) => {
          const timestamp = Date.now();
          const ext = extname(file.originalname);
          const baseName = file.originalname
            .replace(ext, '')
            .replace(/\s+/g, '_')
            .toLowerCase();
          cb(null, `${baseName}_${timestamp}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(new BadRequestException('Only image files are allowed (jpg, jpeg, png)'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      updateEmployeeDto.photo_id = `uploads/employees/${file.filename}`;
    }
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.softDelete(id);
  }

  //dashboard
  @Get('stats/total-personnel')
  async getTotalPersonnel() {
    const total = await this.employeesService.getTotalPersonnel();
    return { total };
  }
}
