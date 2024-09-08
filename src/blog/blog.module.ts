import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogEntity } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
