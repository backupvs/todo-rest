import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateItemDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsBoolean()
    @IsOptional()
    readonly isDone?: boolean;
}
