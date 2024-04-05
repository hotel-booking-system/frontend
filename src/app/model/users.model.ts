export class Usuario {

    // id: number;
    // active
    // 
    documentNumber: string;
    email: string;
    phoneNumber: string;
    password: String;

    constructor( documentNumber: string, email: string, phoneNumber: string, password: String) {

      this.documentNumber = documentNumber;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.password = password;
    }
  }
