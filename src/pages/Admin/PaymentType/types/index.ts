export type TPaymentTypeHttp = {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    idPaymentType: number;
    name: string;
    active: boolean;
  };
  
  export type TPaymentTypeData = {
    idPaymentType: number;
    name: string;
    active: boolean;
  };
  
  export type TPaymentTypeFormValues = {
    name: string;
  };
  