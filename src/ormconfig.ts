require("dotenv").config();

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { User } from "./users/entities/user.entity";
import { Profile } from "./users/entities/profile.entity";
import { Post } from "./users/entities/posts.entity";

export default {
  type: "mysql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Profile, Post],
  // "dist/**/*.entity{.ts,.js}"
  synchronize: true
} as TypeOrmModuleOptions;
