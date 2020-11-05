import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxDropzoneChangeEvent} from 'ngx-dropzone';
import {RejectedFile} from 'ngx-dropzone/lib/ngx-dropzone.service';
import {FileService} from '../../services/file/file.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit {
  file: File = null;
  maxFileSize = 20 * 1024 * 1024;

  virusTotalAPIKey = '';

  constructor(
    private snackBar: MatSnackBar,
    private readonly fileService: FileService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.getElementsByTagName('ngx-dropzone')[0].getElementsByTagName('input')[0].tabIndex = -1;
  }

  addFile(event: NgxDropzoneChangeEvent): void {
    let addFile = true;

    if (this.file != null || this.draggedMoreThanOneFile(event)) {
      this.snackBar.open('No se puede subir más de un archivo', 'Cerrar', {
        duration: 5000,
      });
      addFile = false;
    }

    if (this.uploadedOverSizedFile(event)) {
      this.snackBar.open('No se puede subir un archivo de más de 20MB', 'Cerrar', {
        duration: 5000,
      });
      addFile = false;
    }

    if (this.uploadedWrongType(event)) {
      this.snackBar.open('El único formato de archivo permitido es .apk', 'Cerrar', {
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
    this.fileService.postFile(this.file, this.virusTotalAPIKey).subscribe(
      response => {
        console.log(response);
        if (response.status === 200) {
          this.router.navigate(['/' + response.body.resource_uri]);
        } else if (response.status === 202) {
          this.snackBar.open('Se está analizando la aplicación. Tardará unos minutos', 'Cerrar', {
            duration: 5000,
          });
        }
      },
      error => {
        this.snackBar.open(JSON.stringify(error.error), 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }
}
