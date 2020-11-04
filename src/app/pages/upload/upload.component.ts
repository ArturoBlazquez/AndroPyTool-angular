import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxDropzoneChangeEvent} from 'ngx-dropzone';
import {RejectedFile} from 'ngx-dropzone/lib/ngx-dropzone.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  file: File = null;
  maxFileSize = 20 * 1024 * 1024;

  virusTotalAPIKey = '';

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
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
}
