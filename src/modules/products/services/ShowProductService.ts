import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typerom/repositories/ProductRepository";
import { AppError } from "../../../shared/errors/AppError";

export class ShowProductService {
  public async show(id: string) {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    if (!product) { 
        throw new AppError('Produto nao encontrado')
    }
    return product
  }
}