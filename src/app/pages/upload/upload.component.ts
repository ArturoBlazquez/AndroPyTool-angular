import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxDropzoneChangeEvent} from 'ngx-dropzone';
import {RejectedFile} from 'ngx-dropzone/lib/ngx-dropzone.service';
import {FileService} from '../../services/file/file.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {finalize} from 'rxjs/operators';
import {MyTitleService} from '../../services/title/my-title.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit {
  file: File = null;
  maxFileSize = 32 * 1024 * 1024;

  virusTotalAPIKey = '';

  analyzingApk = false;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly fileService: FileService,
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly title: MyTitleService
  ) {
    this.title.setTitle();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.getElementsByTagName('ngx-dropzone')[0].getElementsByTagName('input')[0].tabIndex = -1;
  }

  addFile(event: NgxDropzoneChangeEvent): void {
    let addFile = true;
    if (this.file != null || this.draggedMoreThanOneFile(event)) {
      this.snackBar.open(this.translate.instant('only.one.file'), this.translate.instant('close'), {
        duration: 5000,
      });
      addFile = false;
    }

    if (this.uploadedOverSizedFile(event)) {
      this.snackBar.open(this.translate.instant('oversized.file'), this.translate.instant('close'), {
        duration: 5000,
      });
      addFile = false;
    }

    if (this.uploadedWrongType(event)) {
      this.snackBar.open(this.translate.instant('apk.file'), this.translate.instant('close'), {
        duration: 5000,
      });
      addFile = false;
    }

    if (addFile) {
      this.file = event.addedFiles[0];
    }
  }

  removeFile(): void {
    this.file = null;
  }

  draggedMoreThanOneFile(event: NgxDropzoneChangeEvent): boolean {
    return event.rejectedFiles.some((file: RejectedFile) => file.reason === 'no_multiple');
  }

  uploadedOverSizedFile(event: NgxDropzoneChangeEvent): boolean {
    return event.rejectedFiles.some((file: RejectedFile) => file.reason === 'size');
  }

  uploadedWrongType(event: NgxDropzoneChangeEvent): boolean {
    return event.rejectedFiles.some((file: RejectedFile) => file.reason === 'type');
  }

  uploadFile(): void {
    this.analyzingApk = true;

    this.fileService.postFile(this.file, this.virusTotalAPIKey).pipe(
      finalize(() => this.analyzingApk = false)
    ).subscribe(
      response => {
        this.router.navigate(['/' + response.body.resource_uri]);
      },
      error => {
        this.snackBar.open(JSON.stringify(error.error), this.translate.instant('close'), {
          duration: 5000,
        });
      }
    );
  }
}
