export interface Product {
  id: number;
  productName: string;
  purchaseDate: string;
  productCode: string;
  quantity: number;
  receiverEmail: string;
  signatureNeeded?: boolean;
  signatureImg: string;
}
