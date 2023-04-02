import { ProductViewModel } from "../../product/view-models/product.model"

export class OrderViewModel {
  OrderId: number
  OrderDate: string
  UserId: number
  PaymentType: String
  Products: ProductViewModel[] = []
}

export class OrderUserViewModel {

  Id: number
  Name: string
  Email: string
  Phone: string
  Address: string
  RegisterDate: string
}
