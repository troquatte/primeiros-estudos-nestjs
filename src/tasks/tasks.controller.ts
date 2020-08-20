import { Controller, Get, Body, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks, TaskStatus } from './tasks.model';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { FindAllDto } from './dto/find-all-dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    public allTasks(@Query() findAllDto: FindAllDto): Tasks[]{
        if(Object.keys(findAllDto).length){
            return this.tasksService.findAllTasks(findAllDto);
        }else{
            return this.tasksService.getAllTasks();
        }
    }

    @Get("/:id")
    public getTaskId(@Param('id') id: string): Tasks{
        return this.tasksService.getTaskId(id);
    }

    @Post()
    public createTasks(
        @Body() createTasksDto: CreateTasksDto 
    ): Tasks{
        return this.tasksService.createTasks(createTasksDto);
    }

    @Delete("/:id")
    public deleteTasks(@Param('id') id: string): Tasks[]{
        return this.tasksService.deleteTasks(id);
    }

    @Patch("/:id/status")
    public updateTasks(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Tasks{
        return this.tasksService.updateTasks(id, status)
    }
}
