export interface Usuario {

  id?: bigint;

  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  documentNumber: string;

  createAt?: Date;
  updatedAt?: Date;

}
