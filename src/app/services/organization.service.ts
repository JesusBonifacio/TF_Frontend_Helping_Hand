import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  ruta_servidor: string = "http://localhost:8080/helpinghands";
  private apiUrl = 'http://localhost:8080/helpinghands';
  constructor(private http: HttpClient) { }


  getOrgs(){
    return this.http.get<Organization[]>(this.ruta_servidor + '/orgs');
  }

  deleteOrgs(id:number){
    return this.http.delete<Organization>(this.ruta_servidor + "/orgs/" + id.toString())
  }
}
