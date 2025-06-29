import type { Category } from '@/api/models'
import { API_HOST } from '@/api/config.ts'

export class CategoriesService {

  public static async retrieve(): Promise<Category[]>{

    const response = await fetch(
      `${API_HOST}/categories/category/retrieve`,
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
