export class Usuario {

    id: number;
    active : boolean;
    documentNumber: string;
    username: string;
    phoneNumber: string;
    password: String;

    constructor( id?: number, active? : boolean, documentNumber?: string, username?: string, phoneNumber?: string, password?: String) {
      this.id = id ||0;
      this.active = active || true;
      this.documentNumber = documentNumber || '';
      this.username = username || '';
      this.phoneNumber = phoneNumber || '';
      this.password = password || '';
    }
  }
