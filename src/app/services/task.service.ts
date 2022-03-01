import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditAnnouncement, Message, NewAnnouncement } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly URL;

  constructor(private http: HttpClient) { 
    this.URL = "https://jsonplaceholder.typicode.com/posts/"
  }

  //HTTP Requests
  getData(): Observable<any> {
    return this.http.get(this.URL);
  }

  getAnnouncementData(id: any): Observable<any> {
    return this.http.get<Message>(this.URL + id.id);
  }

  postAnnouncement(post: NewAnnouncement): Observable<any>{
    return this.http.post(this.URL, post);
  }

  patchAnnouncement(patch: EditAnnouncement, id: any): Observable<any>{
    return this.http.patch(this.URL + id, patch);
  }

  deleteAnnouncement(msg: Message){
    return this.http.delete(this.URL + msg.id);
  }
}