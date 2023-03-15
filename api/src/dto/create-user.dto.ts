import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    // @IsStrongPassword()
    @IsString()
    @MinLength(8)
    readonly password: string;
}