import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test create product integration use case", () => {
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

    it("should create a customer", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input = new Product("123", "Produto a", 10);

        const output = await createProductUseCase.execute(input);
  
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
  
    it("should thrown an error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        
        const input = {
            name: "",
            price: 100.0
        };
  
      await expect(createProductUseCase.execute(input)).rejects.toThrow(
        "Name is required"
      );
    });
  
    it("should thrown an error when price is not greater than zero", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        const input = {
            name: "Produto 1",
            price: -1
        };

        await expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
  });
  