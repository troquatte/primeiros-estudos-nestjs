import { TaskStatus } from "../tasks-status.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class FindAllDto{
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    public status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    public search: string;
}