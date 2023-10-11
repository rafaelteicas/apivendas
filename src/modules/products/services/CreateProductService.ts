import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typerom/repositories/ProductRepository";
import { AppError } from "../../../shared/errors/AppError";
import { Product } from "../typerom/entities/Product";

interface ProductI {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async create({ name, price, quantity }: ProductI): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(name)

    if (productExists !== null) {
      throw new AppError('Esse produto ja existe')
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}