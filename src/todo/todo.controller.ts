import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  NotFoundException
} from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { Todo } from "./entities/todo.entity";
import { UpdateDto } from "./dto/update.dto";
import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  getAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async getOne(
    @Param('id') id: number,
    @Query('search') search: string
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id)
    if (!todo) {
      throw new NotFoundException('Not found')
    }

    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() { title, isCompleted = false }: CreateDto): Promise<Todo> {
    const todo = new Todo()
    todo.title = title
    todo.isCompleted = isCompleted
    return this.todoService.create(todo)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() { title, isCompleted = false }: UpdateDto
  ): Promise<Todo | { error: string }> {
    const todo = await this.todoService.findOne(id)
    if (!todo) {
      throw new NotFoundException('Not found')
    }
    todo.title = title
    todo.isCompleted = isCompleted
    return this.todoService.update(todo)
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const todo = await this.todoService.findOne(id)
    if (!todo) {
      throw new NotFoundException('Not found')
    }
    await this.todoService.remove(id);
  }
}
