import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./dto/products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  // @Get()
  // // @Redirect('https://google.com')
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(201).end('Poki')
  //   return 'getAll';
  // }

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header("Cache-Control", "none")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return "Remove " + id;
  }

  @Put(":id")
  update(@Body() updateProductDto: UpdateProductDto, @Param("id") id: string) {
    return "Update " + id;
  }
}
