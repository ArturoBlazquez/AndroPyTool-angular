import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTitleService {
  currentTitle = '';

  constructor(
    private readonly titleService: Title,
    private readonly translate: TranslateService,
  ) {
  }

  setTitle(title: string = ''): void {
    this.currentTitle = title;

    if (title === '') {
      this.titleService.setTitle('AndroPyTool');
    } else {
      this.translate.get(title).subscribe(res => {
        this.titleService.setTitle('AndroPyTool - ' + res);
      });
    }
  }

  reloadTitle(): void {
    if (this.currentTitle === '') {
      this.titleService.setTitle('AndroPyTool');
    } else {
      this.translate.get(this.currentTitle).subscribe(res => {
        this.titleService.setTitle('AndroPyTool - ' + res);
      });
    }
  }
}
