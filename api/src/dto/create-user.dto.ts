import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Matches(
        /^[a-zA-Z][a-zA-Z0-9_]{3,20}[a-zA-Z0-9]$/g,
        {
            message:
                `Username must start with a letter (uppercase or lowercase), ` +
                `be between 4 and 20 characters long, and only contain letters, numbers, and underscores. ` +
                `Must end with a letter or number.`
        }
    )
    readonly username: string;

    // @IsStrongPassword()
    @IsString()
    @MinLength(8)
    readonly password: string;
}