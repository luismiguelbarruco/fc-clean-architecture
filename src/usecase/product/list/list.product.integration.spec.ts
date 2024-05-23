import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.dto";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";

describe("Test for listing product integration use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

    it("should list a product", async () => {
      const productRepository = new ProductRepository();
      const useCase = new ListProductUseCase(productRepository);

      const product1 = new Product("123", "Produto 1", 10);
      const product2 = new Product("456", "Produto 2", 20);
  
      productRepository.create(product1);
      productRepository.create(product2);

      const output = await useCase.execute({});
  
      expect(output.products.length).toBe(2);
      expect(output.products[0].id).toBe(product1.id);
      expect(output.products[0].name).toBe(product1.name);
      expect(output.products[1].id).toBe(product2.id);
      expect(output.products[1].name).toBe(product2.name);
    });
});