import { Repository, EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { FindAllDto } from "./dto/find-all-dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: FindAllDto): Promise<Task[]> {

        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if(status){
            query.andWhere('task.status = :status', { status });
        }

        if(search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
        }
 
        const tasks = await query.getMany();
        return tasks;
      }
      
}