import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTitleService {

  constructor(
    private readonly titleService: Title,
    private readonly translate: TranslateService,
  ) {
  }

  setTitle(title: string = ''): void {
    if (title === '') {
      this.titleService.setTitle('AndroPyTool');
    } else {
      this.titleService.setTitle('AndroPyTool - ' + this.translate.instant(title));
    }
  }
}
