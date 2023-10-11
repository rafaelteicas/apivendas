import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typerom/repositories/ProductRepository";
import { Product } from "../typerom/entities/Product";

export class ListProductService {
  public async list(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    const products = await productRepository.find();
    return products;
  }
}