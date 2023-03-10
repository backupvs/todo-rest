import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateItemDto {
    @IsString()
    @IsOptional()
    private readonly description: string;

    @IsBoolean()
    @IsOptional()
    private readonly status: boolean;
}
