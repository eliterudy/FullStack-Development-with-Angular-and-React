import { Component } from '@angular/core';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

import {} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faCoffee = faBookmark;
}
