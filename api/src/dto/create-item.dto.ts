import { IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    private readonly name: string;

    @IsNotEmpty()
    @IsString()
    private readonly description: string;

    @IsBoolean()
    private readonly isDone: boolean = false;
}