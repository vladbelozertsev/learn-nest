import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrivateService } from './private.service';
import { Request, Response } from 'express';
import { Token } from '../auth/types/token.type';
import { resolve } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('private')
export class PrivateController {
  constructor(
    private readonly $private: PrivateService,
    private readonly $jwt: JwtService,
  ) {}
  @Get(':file')
  @UseGuards(JwtAuthGuard)
  async getImage(@Param('file') file: string, @Req() req: Request, @Res() res: Response) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const userId = this.$jwt.decode<Token>(token!).id;
    const foundFile = await this.$private.findFile({ userId, file });
    if (!foundFile) throw new HttpException('FILE_NOT_FOUND', HttpStatus.NOT_FOUND);
    res.sendFile(resolve(__dirname, '..', '..', '..', 'private', file));
  }
}
