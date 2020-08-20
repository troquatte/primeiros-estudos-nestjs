import { Injectable } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { FindAllDto } from './dto/find-all-dto';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    public getAllTasks(): Tasks[]{
        return this.tasks;
    }

    public findAllTasks(findAllDto: FindAllDto): Tasks[]{
        const {status, search } = findAllDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status)
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    public getTaskId(id: string): Tasks{
        return this.tasks.find( task => {
            return task.id === id;
        });
    }

    public createTasks( createTasksDto: CreateTasksDto ): Tasks{
        const {title, description} = createTasksDto;

        const task: Tasks = {
            id: uuid.v1(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        
        this.tasks.push(task);

        return task;
    }

    public deleteTasks( id: string ): Tasks[]{
        return this.tasks = this.tasks.filter( task => {
            return task.id !== id;
        });
    }

    public updateTasks(id: string, status: TaskStatus): Tasks{
        const task = this.getTaskId(id);
        task.status = status;

        return task;
    }
}
