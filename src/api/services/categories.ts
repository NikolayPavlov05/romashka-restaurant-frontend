import type { Category } from '@/api/models'

export class CategoriesService {

  public static async retrieve(): Promise<Category[]>{

    const response = await fetch(
      `/api/categories/category/retrieve`,
      {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data as Category[];
    } else {
      return [] as Category[];
    }
  }

}
