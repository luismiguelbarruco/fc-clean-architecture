import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test update product integration use case", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const product = ProductFactory.create("a", "Produto a", 10);

        productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: 30
        };

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});