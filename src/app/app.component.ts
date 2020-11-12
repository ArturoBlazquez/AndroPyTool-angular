import {Component, HostListener} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MyTitleService} from './services/title/my-title.service';
import {UploadComponent} from './pages/upload/upload.component';
import {ReportsComponent} from './pages/reports/reports.component';
import {ReportDetailComponent} from './pages/report-detail/report-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  goBackUrl = null;

  constructor(
    private readonly translate: TranslateService,
    private readonly title: MyTitleService
  ) {
    translate.addLangs(['en', 'es']);
    const browserLang = translate.getBrowserLang();
    if (browserLang !== 'en' && browserLang !== 'es') {
      translate.setDefaultLang('es');
    } else {
      translate.setDefaultLang(browserLang);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event): void {
    document.getElementsByTagName('body')[0].classList.remove('usingMouse');
  }

  @HostListener('window:mousedown', ['$event'])
  onMouseDown(event): void {
    document.getElementsByTagName('body')[0].classList.add('usingMouse');
  }

  updateGoBackUrl(event): void {
    if (event instanceof UploadComponent) {
      this.goBackUrl = null;
    } else if (event instanceof ReportsComponent) {
      this.goBackUrl = '';
    } else if (event instanceof ReportDetailComponent) {
      this.goBackUrl = 'reports';
    }
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    this.title.reloadTitle();
  }
}
