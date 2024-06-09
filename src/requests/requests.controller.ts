import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestDTO, StatusEnum } from '../lib/dto/requestDTO';
import { CommentDTO } from '../lib/dto/commentDTO';
import { User } from '../lib/decorators/currentUser';
import { JWTpayload } from '../auth/auth.service';
import { AuthGuard } from '../lib/guards/authGuard';

@Controller('requests')
export class RequestsController {
  constructor(
    private RequestService: RequestsService
  ) {}


  @Get()
  findRequests(@Query('status') status: StatusEnum, @Query('date') date: Date) {
    return this.RequestService.findRequests(status, date)
  }

  @UseGuards(AuthGuard)
  @Post()
  sentRequest(@Body() body: RequestDTO, @User() user: JWTpayload) {
    return this.RequestService.sentRequest(body, user)
  }

  @Post(':id')
  sentAnswer(@Param('id') id: number, @Body() body: CommentDTO) {
    return this.RequestService.sentAnswer(id, body)
  }

}
