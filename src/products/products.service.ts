import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly _products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción de Producto 1',
      price: 300,
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Descripción de Producto 2',
      price: 400,
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'Descripción de Producto 3',
      price: 500,
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción de Producto 4',
      price: 800,
    },
  ];

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      ...createProductDto,
      id: this._products.length,
    };

    this._products.push(newProduct);

    return newProduct;
  }

  findAll(): Product[] {
    return this._products;
  }

  findOne(id: number): Product {
    const product: Product | undefined = this._products.find(
      (p: Product) => p.id === id,
    );

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    const index = this._products.findIndex((p: Product) => p.id === product.id);

    this._products[index] = {
      ...product,
      ...updateProductDto,
    };

    return this._products[index];
  }

  remove(id: number): boolean {
    const product = this.findOne(id);
    const index = this._products.findIndex((p: Product) => p.id === product.id);

    this._products.splice(index, 1);

    return true;
  }
}
