import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserProfileDto } from "./dto/create-user-profile.dto";
import { CreateUserPostDto } from "./dto/create-user-post.dto";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Get()
  getUsers() {
    return this.usersService.findUsers();
  }

  @Get(":id")
  getUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(":id")
  async updateUserById(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  async deleteUserById(@Param("id", ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }

  @Post(":id/profiles")
  createUserProfile(
    @Param("id", ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto
  ) {
    return this.usersService.createUserProfile(id, createUserProfileDto);
  }

  @Post(":id/posts")
  createUserPost(
    @Param("id", ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto
  ) {
    return this.usersService.createUserPost(id, createUserPostDto);
  }
}
