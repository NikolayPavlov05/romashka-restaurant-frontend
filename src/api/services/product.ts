import type { Product } from '@/api/models'

export class ProductService {

  public static async retrieve({ search, categoryId } : {
    search: string;
    categoryId: number | null;
  }): Promise<Product[]>{

    const urlSearchParams = new URLSearchParams({
      search: search,
      ...(categoryId ? {category_id: categoryId.toString()} : null),
    });

    const response = await fetch(
      `/api/products/product/search?${urlSearchParams.toString()}`,
      {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data as Product[];
    } else {
      return [] as Product[];
    }
  }

}
