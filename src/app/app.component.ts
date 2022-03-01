import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  data: Array<any>
  posData!: NewAnnouncement;
  messData!: Message;
  alertMsg: boolean = false;
  loadSpn: boolean = false;
  
  constructor(private task: TaskService) {
    this.data = new Array<any>();
  }
  
  ngOnInit(): void {
      this.getAll();
  }

  //HTTP.GET(ALL)
  getAll() {
    this.task.getData().subscribe((data) =>{
      this.data = data;
    });
  }

  //HTTP.POST
  createAnnouncement(title: string, message: string){
    this.posData = new NewAnnouncement();
    this.posData.title = title;
    this.posData.body = message;
    this.task.postAnnouncement(this.posData).subscribe((data) => {
      this.data.push(data);
    });
  }

  //HTTP.GET(With ID)
  selectAnnouncement(id: any){
    this.task.getAnnouncementData(id).subscribe((res: Message) => {
      this.messData = res;
    });
  }

  //HTTP.PATCH(UPDATE)
  editAnnouncement(id: any, title: string, message: string){
    this.messData.title = title;
    this.messData.body = message;
    this.task.patchAnnouncement(this.messData,id).subscribe((res:EditAnnouncement)=>{
      this.data.splice(id - 1, 1, res);
    });
  }

  //HTTP.REMOVE
  removeAnnouncement(id: any){
    this.showSpn();
    this.selectAnnouncement(id);
    this.task.deleteAnnouncement(id).subscribe(() => {
      this.data.splice(id, 1);
      this.hideSpn();
      this.showMsg();
    });
  }

  showMsg(){
      this.alertMsg = true;
  }

  hideMsg(){
    this.alertMsg = false;
  }

  showSpn(){
    this.loadSpn = true;
  }

  hideSpn(){
    this.loadSpn = false;
  }
}
  
export interface Message{
  id: any,
  title: string,
  body: string,
}

export class NewAnnouncement implements Message{
  id!: number;
  title!: string;
  body!: string;
}

export class EditAnnouncement implements Message{
  id!: number;
  title!: string;
  body!: string;
}