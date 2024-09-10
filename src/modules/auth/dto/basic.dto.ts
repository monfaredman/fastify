import { IsEmail, IsMobilePhone, IsString, Length } from "class-validator";
import { ConfirmPassword } from "src/common/decorators/password.decorators";

export class SignupDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsMobilePhone(
    "fa-IR",
    {},
    { message: "Please enter a valid mobile phone number" }
  )
  mobile: string;
  @IsString()
  @IsEmail({
    host_whitelist: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"],
  })
  email: string;
  @IsString()
  @Length(6, 20, {
    message: "Password must be between 6 and 20 characters long",
  })
  password: string;
  @IsString()
  @ConfirmPassword("password")
  confirmed_password: string;
}

export class LoginDto {
  @IsString()
  @IsEmail({
    host_whitelist: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"],
  })
  email: string;
  @IsString()
  @Length(6, 20, {
    message: "Password must be between 6 and 20 characters long",
  })
  password: string;
}
