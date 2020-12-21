import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';
import { CategoryProduct } from '../models/CategoryProduct';
import { CategoryProductRepository } from '../repositories/CategoryProductRepository';

class CreateCategoryService {
  public async execute(name: string): Promise<CategoryProduct> {
    const categoryProductRepository = new CategoryProductRepository(
      connection(),
    );

    const categoryExists = await categoryProductRepository.findByName(name);

    if (categoryExists) {
      throw new AppError('category already exists');
    }

    const category = await categoryProductRepository.create({
      categoria: name,
    });

    return category;
  }
}

export { CreateCategoryService };
