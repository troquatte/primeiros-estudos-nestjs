import { Injectable, NotFoundException, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
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

    public async allTasks(findAllDto: FindAllDto): Promise<Task[]>{
        return await this.taskRepository.getTasks(findAllDto);
    }

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

    public async deleteTasks( id: number ): Promise<void>{
        const found = await this.taskRepository.delete(id);

        if(!found.affected){
            throw new NotFoundException(`Task with ID ${id} not Found`);
        }

        throw new HttpException('Success', HttpStatus.OK);
    }

    public async updateTasks(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskId(id);
        
        task.status = status;
        task.save();

        return task;
    }
}
