// https://www.usps.com/business/web-tools-apis/address-information-api.htm#_Toc34052589
export interface Address {
  name?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip5: number;
  zip4?: number;
}

export interface Customer {
  id: string;
  billingAddress: Address;
  shippingAddress: Address;
}
