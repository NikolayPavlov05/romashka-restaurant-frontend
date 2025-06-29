import type { OrderCreate, Order } from '@/api/models'
import { API_HOST } from '@/api/config.ts'

export class OrderService {

  public static async create({ dto }: {dto: OrderCreate}): Promise<string | null>{

    const response = await fetch(
      `${API_HOST}/orders/order/create/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(dto),
      }
    )

    if (response.ok) {
      const data = await response.json();
      return data.hash;
    } else {
      return null;
    }

  }

  public static async getOrders ( { hashList } : { hashList: string[] }): Promise<Order[]>{
    const response = await fetch(
      `${API_HOST}/orders/order/retrieve/?hash__in=${hashList.join(',')}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        }
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data as Order[];
    } else {
      return [] as Order[];
    }

  }
}
