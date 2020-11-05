import {Component, HostListener} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event): void {
    document.getElementsByTagName('body')[0].classList.remove('usingMouse');
  }

  @HostListener('window:mousedown', ['$event'])
  onMouseDown(event): void {
    document.getElementsByTagName('body')[0].classList.add('usingMouse');
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
  }
}
