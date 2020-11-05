import {Component, HostListener} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private readonly titleService: Title
  ) {
    titleService.setTitle('AndroPyTool');
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event): void {
    document.getElementsByTagName('body')[0].classList.remove('usingMouse');
  }

  @HostListener('window:mousedown', ['$event'])
  onMouseDown(event): void {
    document.getElementsByTagName('body')[0].classList.add('usingMouse');
  }
}
