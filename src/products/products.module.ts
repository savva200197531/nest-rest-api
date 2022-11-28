import { Module } from "@nestjs/common";
import { ProductsService } from "./dto/products.service";
import { ProductsController } from "./products.controller";

@Module({
  providers: [ProductsService],
  controllers: [ProductsController]
})

export class ProductsModule {}
