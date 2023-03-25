import CategoryService from './category';
import { categoryRepo } from '../../adapters/repositories';
import { createInjector } from 'typed-inject';

const categoryServiceInjector = createInjector().provideValue('categoryRepo', categoryRepo);

const categoryService = categoryServiceInjector.injectClass(CategoryService);

export { categoryService };
