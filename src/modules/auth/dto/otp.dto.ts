import { IsMobilePhone, IsString, Length } from "class-validator";
import { Column } from "typeorm";

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
  @Column()
  expires_in: Date;
}
