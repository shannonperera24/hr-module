import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PostingService } from './posting.service';
import { CreatePostingDto } from './dto/create-posting.dto';
import { UpdatePostingDto } from './dto/update-posting.dto';

@Controller('posting')
export class PostingController {
  constructor(private readonly postingService: PostingService) {}

  @Post()
  create(@Body(ValidationPipe) createPostingDto: CreatePostingDto) {
    return this.postingService.create(createPostingDto);
  }

  @Get()
  findAll() {
    return this.postingService.findAll();
  }

  //dashboard
  @Get('stats/current-by-rank')
  getCurrentByRank() {
    return this.postingService.getCurrentPersonnelByRank();
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updatePostingDto: UpdatePostingDto) {
    return this.postingService.update(id, updatePostingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postingService.remove(id);
  }
}
