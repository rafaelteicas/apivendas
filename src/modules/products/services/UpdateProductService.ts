import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typerom/repositories/ProductRepository';
import { AppError } from '../../../shared/errors/AppError';
import { Product } from '../typerom/entities/Product';

type IRequest = {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async update({id, name, price, quantity} : IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id)

    if (!product) {
      throw new AppError('Produto nao encotrado');
    }

    const productExists = await productRepository.findByName(product.name);

    if (productExists) {
      throw new AppError('Nome ja usado')
    }

    name = product.name;
    price = product.price;
    quantity = product.quantity;

    await productRepository.save(product);

    return product;
  }
}
