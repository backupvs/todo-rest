import { IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    private readonly description: string;

    @IsBoolean()
    private readonly status: boolean = false;
}