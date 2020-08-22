import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from "./tasks-status.enum";

import { CreateTasksDto } from './dto/create-tasks.dto';
import { FindAllDto } from './dto/find-all-dto';

@Injectable()
export class TasksService {
    // private tasks: Tasks[] = [];

    // public getAllTasks(): Tasks[]{
    //     return this.tasks;
    // }

    // public findAllTasks(findAllDto: FindAllDto): Tasks[]{
    //     const {status, search } = findAllDto;

    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    //     }

    //     return tasks;
    // }

    // public getTaskId(id: string): Tasks{
        
    //     const found =  this.tasks.find( task => {
    //         return task.id === id;
    //     });

    //     if(!found){
    //         throw new NotFoundException(`Task with ID ${id} not Found`);
    //     }

    //     return found;
    // }

    // public createTasks( createTasksDto: CreateTasksDto ): Tasks{
    //     const {title, description} = createTasksDto;

    //     const task: Tasks = {
    //         id: uuid.v1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
        
    //     this.tasks.push(task);

    //     return task;
    // }

    // public deleteTasks( id: string ): Tasks[]{
    //     const found = this.getTaskId(id);

    //     return this.tasks = this.tasks.filter( task => {
    //         return task.id !== found.id;
    //     });
    // }

    // public updateTasks(id: string, status: TaskStatus): Tasks{
    //     const task = this.getTaskId(id);
    //     task.status = status;

    //     return task;
    // }
}
