import { ConfigService } from "@nestjs/config";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { OTPEntity } from "../user/entities/otp.entity";
import { CheckOtpDto, SendOtpDto } from "./dto/otp.dto";
import { randomInt } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { TokenPayload } from "./dto/types/payload";
import { LoginDto, SignupDto } from "./dto/basic.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OTPEntity) private otpRepository: Repository<OTPEntity>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async sendOtp(otpDto: SendOtpDto) {
    const { mobile } = otpDto;
    let user = await this.userRepository.findOneBy({ mobile });
    if (!user) {
      user = this.userRepository.create({
        mobile,
      });
      user = await this.userRepository.save(user);
    }
    await this.createOtpForUser(user);
    return {
      message: "otp sent successfully",
    };
  }

  async createOtpForUser(user: UserEntity) {
    const code = randomInt(10000, 99999).toString();
    const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2);
    let otp = await this.otpRepository.findOneBy({ userId: user.id });
    if (otp) {
      if (otp.expires_in > new Date()) {
        throw new BadRequestException("otp is not expired yet");
      }
      otp.code = +code;
      otp.expires_in = expiresIn;
    } else {
      otp = this.otpRepository.create({
        code: +code,
        expires_in: expiresIn,
        userId: user.id,
      });
    }
    otp = await this.otpRepository.save(otp);
    user.otpId = otp.id;
    await this.userRepository.save(user);
  }

  async checkOtp(otpDto: CheckOtpDto) {
    const { code, mobile } = otpDto;
    const now = new Date();
    const user = await this.userRepository.findOne({
      where: { mobile },
      relations: ["otp"],
    });
    if (!user || !user?.otp) {
      throw new UnauthorizedException("user not found");
    }
    const otp = user?.otp;
    if (otp?.code !== +code) {
      throw new UnauthorizedException("code is not valid");
    }
    if (otpDto.expires_in < now) {
      throw new UnauthorizedException("otp is expired");
    }
    if (!user.mobile_verify) {
      await this.userRepository.update(
        { id: user.id },
        { mobile_verify: true }
      );
    }
    const { accessToken, refreshToken } = this.generateTokenOfUser({
      id: user.id,
      mobile: +mobile,
    });
    return {
      accessToken,
      refreshToken,
      messagage: "user is verified successfully",
    };
  }

  generateTokenOfUser(payload: TokenPayload) {
    const accessToken = this.jwtService.sign(
      {
        id: payload.id,
        mobile: payload.mobile,
      },
      {
        secret: this.configService.get("Jwt.accessTokenSecret"),
        expiresIn: "30d",
      }
    );
    const refreshToken = this.jwtService.sign(
      {
        id: payload.id,
        mobile: payload.mobile,
      },
      {
        secret: this.configService.get("Jwt.refreshTokenSecret"),
        expiresIn: "1y",
      }
    );
    return { accessToken, refreshToken };
  }

  async validateAccessToken(token: string | boolean) {
    try {
      if (typeof token === "string") {
        const payload = this.jwtService.verify<TokenPayload>(token, {
          secret: this.configService.get("Jwt.accessTokenSecret"),
        });
        if (typeof payload === "object" && payload.hasOwnProperty("id")) {
          const user = await this.userRepository.findOneBy({ id: payload.id });
          if (!user) {
            throw new UnauthorizedException("user not found");
          }
          return user;
        }
      }
      throw new UnauthorizedException("invalid token");
    } catch (e) {
      throw new UnauthorizedException("invalid token");
    }
  }

  async signup(signupDto: SignupDto) {
    const { email, first_name, last_name, password, mobile } = signupDto;

    await this.checkEmailIsExist(email);
    await this.checkMobileIsExist(mobile);

    const hashedPassword = await this.hashPasswrod(password);

    const user = this.userRepository.create({
      first_name,
      last_name,
      mobile,
      email,
      password: hashedPassword,
      mobile_verify: false,
    });
    await this.userRepository.save(user);
    return {
      message: "User registered successfully",
    };
  }

  async hashPasswrod(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async checkEmailIsExist(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) throw new ConflictException("Email already exists");
  }

  async checkMobileIsExist(mobile: string) {
    const user = await this.userRepository.findOneBy({ mobile });
    if (user) throw new ConflictException("Mobile already exists");
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException("Invalid email or password");
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException("Invalid email or password");
    }
    const { accessToken, refreshToken } = this.generateTokenOfUser({
      id: user.id,
      mobile: +user.mobile,
    });
    return {
      accessToken,
      refreshToken,
      message: "User logged-in successfully",
    };
  }
}
