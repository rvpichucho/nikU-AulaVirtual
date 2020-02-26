import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { UploadTaskComponent} from "./upload-task/upload-task.component";
import { MatDialog } from '@angular/material';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { FormControl } from '@angular/forms';
//
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({

  selector: 'vex-deber',
  templateUrl: './deber.component.html',
  styleUrls: ['./deber.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInUp400ms]
})
export class DeberComponent implements OnInit {
  //
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL : Observable<String>;
  isHovering: boolean;
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  constructor(private storage: AngularFireStorage,private db: AngularFirestore) { }
  ngOnInit() {}
  startUpload(event : FileList ) {
    const file= event.item(0);

    if(file.type.split('/')[0] !=='image'){
      console.error('archivo no valido');
    }
    const path = `test/${new Date().getTime()}_{file.name}`;  
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path,file);
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  
}
