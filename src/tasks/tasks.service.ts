import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.entity';

import { TaskStatus } from "./tasks-status.enum";

import { CreateTasksDto } from './dto/create-tasks.dto';
import { FindAllDto } from './dto/find-all-dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

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

    public async getTaskId(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID ${id} not Found`);
        } 
        return found;
    }

    public async createTasks(createTasksDto: CreateTasksDto): Promise<Task>{
        const { title, description } = createTasksDto;

        const createTask = await this.taskRepository.create({
            title, 
            description, 
            'status': TaskStatus.OPEN,
        }).save();

        return createTask;
    }
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
