import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from "../utils/types";
import { Profile } from "./entities/profile.entity";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { Post } from "./entities/posts.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {
  }

  findUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ["profile", "posts"] });
  }

  findUser(id: number): Promise<User> {
    return this.userRepository.findOne(
      {
        where: { id },
        relations: ["profile", "posts"]
      }
    );
  }

  createUser(userDetails: CreateUserParams): Promise<User> {
    const newUser = this.userRepository.create({ ...userDetails, createdAt: new Date() });

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, userDetails: UpdateUserParams): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(id: number, userProfileDetails: CreateUserProfileParams): Promise<User> {
    const user = await this.findUser(id);

    if (!user) {
      throw new HttpException("User not found. Cannot create profile", HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create(userProfileDetails);
    user.profile = await this.profileRepository.save(newProfile);

    return this.userRepository.save(user);
  }

  async createUserPost(id: number, userPostDetails: CreateUserPostParams): Promise<Post> {
    const user = await this.findUser(id);

    if (!user) {
      throw new HttpException("User not found. Cannot create profile", HttpStatus.BAD_REQUEST);
    }

    const newPost = this.postRepository.create({
      ...userPostDetails,
      user
    });

    return this.postRepository.save(newPost);
  }
}
