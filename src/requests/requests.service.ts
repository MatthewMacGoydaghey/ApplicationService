import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestDTO} from '../lib/dto/requestDTO';
import { Request } from '../lib/entities/requestEntity';
import { CommentDTO } from '../lib/dto/commentDTO';
import { User } from '../lib/entities/userEntity';
import { BetweenDates } from '../lib/misc/consts';
import { JWTpayload, StatusEnum } from '../lib/misc/types';
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request) private readonly RequestRepository: Repository<Request>,
    @InjectRepository(User) private readonly UserRepository: Repository<User>
  ) {}

  async findRequests(status: StatusEnum, date: string) {
    try {
      const requests = await this.RequestRepository.find({where: {status,
        created_at: BetweenDates(date)},
        order: {created_at: 'DESC'}, select: {
         requester: {
           name: true,
           email: true
         },
         processor: {
          name: true,
          email: true
         }
       }, relations: {
         requester: true,
         processor: true
       }})
       return requests
    } catch (err) {
      if (err.code == 22007 || 22008) {
        throw new BadRequestException({message: 'Incorrectly entered query parameters'})
      }
      return err
    }
  }

  async sentRequest(body: RequestDTO, user: JWTpayload) {
    const foundUser = await this.UserRepository.findOneBy({id: user.id})
    const newRequest = new Request()
    newRequest.message = body.message
    newRequest.status = 'Active'
    newRequest.requester = foundUser
    const request = await this.RequestRepository.save(newRequest)
    return this.filterRequest(request, 'requester')
  }


  async sentAnswer(id: number, body: CommentDTO, user: JWTpayload) {
    const foundUser = await this.UserRepository.findOneBy({id: user.id})
    const foundRequest = await this.findRequest(id)
    foundRequest.processor = foundUser
    foundRequest.comment = body.comment
    foundRequest.status = 'Resolved'
    this.createEmail(foundRequest)
    const request = await this.RequestRepository.save(foundRequest)
    return this.filterRequest(request, 'processor')
  }


  private createEmail(request: Request) {
    const filePath = path.resolve(__dirname, '..', 'emails')
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {recursive: true})
}
const date = new Date()
fs.writeFileSync(path.join(filePath, request.requester.email + ' ' + date.toDateString()
+ ' ' + date.getHours() + date.getMinutes() + date.getSeconds() + '.txt'),
 `from: server@gmail.com\n
to: ${request.requester.email}\n
subject: Answer to your request\n
text: ${request.comment}\n
processor: ${request.processor.name}`)
  }
  


  private filterRequest(requestObj: Request, position: 'processor' | 'requester') {
    delete requestObj[position].id
    delete requestObj[position].password
    delete requestObj[position].position
    return requestObj
  }


  private async findRequest(id: number) {
    const foundRequest = await this.RequestRepository.findOne({where: {id}, select: {
      requester: {
        name: true,
        email: true
      }
    }, relations: {
      requester: true
    }})
    if (!foundRequest) {
      throw new NotFoundException({message: `Request with id ${id} not found`})
    }
    return foundRequest
  }
}
