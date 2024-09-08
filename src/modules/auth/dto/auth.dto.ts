import { IsMobilePhone, IsString, Length } from "class-validator";

export class SendOtpDto {
  @IsMobilePhone("fa-IR", {}, { message: "mobile is not valid" })
  mobile: string;
}
export class CheckOtpDto {
  @IsMobilePhone("fa-IR", {}, { message: "mobile is not valid" })
  mobile: string;
  @IsString({ message: "otp is not valid" })
  @Length(5, 5, { message: "otp is not valid" })
  code: string;
}
