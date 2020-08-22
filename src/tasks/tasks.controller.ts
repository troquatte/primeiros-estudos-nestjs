import { Controller, Get, Body, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from "./tasks-status.enum";
import { CreateTasksDto } from './dto/create-tasks.dto';
import { FindAllDto } from './dto/find-all-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    // constructor(private tasksService: TasksService){}

    // @Get()
    // public allTasks(@Query(ValidationPipe) findAllDto: FindAllDto): Tasks[]{
    //     if(Object.keys(findAllDto).length){
    //         return this.tasksService.findAllTasks(findAllDto);
    //     }else{
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    // @Get("/:id")
    // public getTaskId(@Param('id') id: string): Tasks{
    //     return this.tasksService.getTaskId(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // public createTasks(
    //     @Body() createTasksDto: CreateTasksDto 
    // ): Tasks{
    //     return this.tasksService.createTasks(createTasksDto);
    // }

    // @Delete("/:id")
    // public deleteTasks(@Param('id') id: string): Tasks[]{
    //     return this.tasksService.deleteTasks(id);
    // }

    // @Patch("/:id/status")
    // public updateTasks(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ): Tasks{
    //     return this.tasksService.updateTasks(id, status)
    // }
}
