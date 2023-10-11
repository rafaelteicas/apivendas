import {Request, Response} from 'express'
import { CreateProductService } from "../services/CreateProductService";
import { ListProductService } from "../services/ListProductService";
import { ShowProductService } from '../services/ShowProductService';

export class ProductsController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response | unknown> {
    const listProducts = new ListProductService();
    const products = await listProducts.list();

    return response.json(products);
  }
  public async show(
    request: Request,
    response: Response,
  ): Promise<Response | unknown> {
    const { id } = request.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.show(id);

    return response.json(product);
  }
  public async create(request: Request, response: Response) {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.create({ name, price, quantity });
  }
}