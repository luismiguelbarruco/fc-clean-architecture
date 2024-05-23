import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private ProductRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
      this.ProductRepository = productRepository;
    }
  
    async execute(
      input: InputUpdateProductDto
    ): Promise<OutputUpdateProductDto> {
      const productInterface = await this.ProductRepository.find(input.id);
      const product = productInterface as Product;

      product.changeName(input.name);
      product.changePrice(input.price);
      
      await this.ProductRepository.update(product);
  
      return {
        id: product.id,
        name: product.name,
        price: product.price
      };
    }
  }