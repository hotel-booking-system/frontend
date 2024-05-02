export class Users {

    id: number;
    active : boolean;
    documentNumber: string;
    email : string;
    username: string;
    phoneNumber: string;
    password: String;

    constructor( id?: number, active? : boolean, documentNumber?: string, email?: string , username?: string, phoneNumber?: string, password?: String) {
      this.id = id ||0;
      this.active = active || true;
      this.documentNumber = documentNumber || '';
      this.username = username || '';
      this.email = email || '';
      this.phoneNumber = phoneNumber || '';
      this.password = password || '';
    }
  }
