import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tutorial } from '../models/tutorial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private urlAPI = 'http://localhost:3000/tutorial';

  constructor(private http: HttpClient) { }

  /**
   * Add new tutorial into list
   * @param tutorial : Tutorial
   */
  addTutorial(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(`${this.urlAPI}`, tutorial);
  }

  /**
   * Update tutorial into list
   * @param tutorial : Tutorial
   */
  updateTutorial(id: number, tutorial: Tutorial): Observable<Tutorial> {
    return this.http.put<Tutorial>(`${this.urlAPI}/${id}`, tutorial);
  }

  /**
   * Get list tutorial from server
   */
  getTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${this.urlAPI}`);
  }

  /**
   * Delete one the tutorial follow id
   * @param id : number
   */
  deleteTutorial(id: number): Observable<{}> {
    return this.http.delete(`${this.urlAPI}/${id}`);
  }
}
