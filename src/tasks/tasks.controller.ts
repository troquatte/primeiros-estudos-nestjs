import { Controller, Get, Body, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from "./tasks-status.enum";
import { CreateTasksDto } from './dto/create-tasks.dto';
import { FindAllDto } from './dto/find-all-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    public async allTasks(@Query(ValidationPipe) findAllDto: FindAllDto): Promise<Task[]>{
        return await this.tasksService.allTasks(findAllDto);
    }

    @Get("/:id")
    public getTaskId(@Param('id', ParseIntPipe) id: number):Promise<Task>{
        return this.tasksService.getTaskId(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public createTasks(
        @Body() createTasksDto: CreateTasksDto 
    ): Promise<Task>{
        return this.tasksService.createTasks(createTasksDto);
    }

    @Delete("/:id")
    public deleteTasks(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.tasksService.deleteTasks(id);
    }

    @Patch("/:id/status")
    public updateTasks(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task>{
        return this.tasksService.updateTasks(id, status)
    }
}
