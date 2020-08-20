import { TaskStatus } from "../tasks.model";

export class FindAllDto{
    public status: TaskStatus;
    public search: string;
}