import { IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsBoolean()
    readonly isDone: boolean = false;
}