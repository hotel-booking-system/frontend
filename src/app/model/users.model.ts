export interface Usuario {

  id?: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  documentNumber: string;
  active : boolean;
  createAt?: Date;
  updatedAt?: Date;

}