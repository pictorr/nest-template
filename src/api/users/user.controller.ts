import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  public async getUsers() {
    return this.userService.findAll();
  }

  @Post('')
  public async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
