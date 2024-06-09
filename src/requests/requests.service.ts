import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestDTO, StatusEnum } from '../lib/dto/requestDTO';
import { Request } from '../lib/entities/requestEntity';
import { CommentDTO } from '../lib/dto/commentDTO';
import { JWTpayload } from '../auth/auth.service';
import { User } from '../lib/entities/userEntity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request) private readonly RequestRepository: Repository<Request>,
    @InjectRepository(User) private readonly UserRepository: Repository<User>
  ) {}

  async findRequests(status: StatusEnum = 'Active', date: Date) {
    return this.RequestRepository.find({where: {status, created_at: date}, order: {created_at: 'DESC'}, select: {
      requester: {
        name: true,
        email: true
      }
    }, relations: {
      requester: true
    }})
  }

  async sentRequest(body: RequestDTO, user: JWTpayload) {
    const foundUser = await this.UserRepository.findOneBy({id: user.id})
    const newRequest = new Request()
    newRequest.message = body.message
    newRequest.status = 'Active'
    newRequest.requester = foundUser
    const requestObj = await this.RequestRepository.save(newRequest)
    delete requestObj.requester.id
    delete requestObj.requester.password
    delete requestObj.requester.position
    return requestObj
  }

  async sentAnswer(id: number, body: CommentDTO) {
    const foundRequest = await this.findRequest(id)
    foundRequest.comment = body.comment
    foundRequest.status = 'Resolved'
    return this.RequestRepository.save(foundRequest)
  }


  private async findRequest(id: number) {
    const foundRequest = await this.RequestRepository.findOneBy({id})
    if (!foundRequest) {
      throw new NotFoundException({message: `Request with id ${id} not found`})
    }
    return foundRequest
  }
}
