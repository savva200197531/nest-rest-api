import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { TodoModule } from './todo/todo.module';
import ormConfig from "./ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ProductsModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
