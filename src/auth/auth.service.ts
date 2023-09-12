import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService
      ){}
      
    async signIn(username: string, pass: string): Promise<any> {
        const user:any = await this.userService.findOne({username});
        if(!user) throw new HttpException("User is not exist", HttpStatus.NOT_FOUND)
        const { password, ...result } = user;
      
        const isComparePass = await bcrypt.compare(pass, password)
      if(!isComparePass) throw new HttpException("Passwords do not match", HttpStatus.NOT_FOUND)

      const payload = {
        id: user._id,
        roles: user.role
      }

        return {
          token: await this.jwtService.signAsync(payload)
        };
      }
}
