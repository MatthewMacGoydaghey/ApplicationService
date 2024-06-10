import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestDTO } from '../lib/dto/requestDTO';
import { CommentDTO } from '../lib/dto/commentDTO';
import { User } from '../lib/decorators/currentUser';
import { AuthGuard } from '../lib/guards/authGuard';
import { JWTpayload, StatusEnum } from '../lib/misc/types';
import { PositionGuard, RequiredPositions } from '../lib/guards/positionGuard';
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from '../lib/entities/requestEntity';

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
  constructor(
    private RequestService: RequestsService
  ) {}

  @ApiHeader({
    name: 'jwt',
    description: 'Ввести полученный после авторизации JWT-token'
  })
  @ApiQuery({
    name: 'status',
    description: "Active" || "Resolved",
    required: false
  })
  @ApiQuery({
    name: 'date',
    description: "Возвращает заявки в диапазоне указанных дат. Вводится в формате yyyy-mm-dd hh:mm:ss,yyyy-mm-dd hh:mm:ss, время вводить не обязательно",
    required: false
  })
  @ApiOperation({summary: "Возвращает массив заявок"})
  @ApiResponse({status: 200, type: [Request]})
  @RequiredPositions('Processor')
  @UseGuards(AuthGuard, PositionGuard)
  @Get()
  findRequests(@Query('status') status: StatusEnum, @Query('date') date: string) {
    return this.RequestService.findRequests(status, date)
  }

  @ApiOperation({summary: "Создаёт заявку"})
  @ApiResponse({status: 201, type: Request})
  @UseGuards(AuthGuard)
  @Post()
  sentRequest(@Body() body: RequestDTO, @User() user: JWTpayload) {
    return this.RequestService.sentRequest(body, user)
  }

  @ApiOperation({summary: "Отправляет ответ на заявку"})
  @ApiResponse({status: 200, type: Request})
  @RequiredPositions('Processor')
  @UseGuards(AuthGuard, PositionGuard)
  @Post(':id')
  sentAnswer(@Param('id') id: number, @Body() body: CommentDTO, @User() user: JWTpayload) {
    return this.RequestService.sentAnswer(id, body, user)
  }

}
