import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-booknow';

  apiUrl = environment.apiUrl;

  constructor() {
    console.log('API URL: ', this.apiUrl);
  }

}
