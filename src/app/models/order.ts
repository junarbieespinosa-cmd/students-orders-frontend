export type OrderStatus = "pending" | "paid";

export interface Order {
  orderId: number;
  studentId: number;
  total: number;
  status: OrderStatus;
  creationDateTime?: string;
}
