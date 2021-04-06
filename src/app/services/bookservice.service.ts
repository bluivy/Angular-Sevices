import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http"

import { bookDataInterface} from 'src/app/types/bookdata.interface'
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  
  wikiList: bookDataInterface[] = [];
  url : string = "http://localhost:3000/books"
  constructor(private http : HttpClient ) { }
 
 
  getUsers() :  Observable<bookDataInterface[]>
  {
      return this.http.get<bookDataInterface[]>(this.url)
      
  }
  getUserById(isbn : number) : Observable<bookDataInterface[]>
  {
    return this.http.get<bookDataInterface[]>(`http://localhost:3000/books/${isbn}`)
    //.pipe(
     // catchError(this.handleError<bookDataInterface[]>('getHeroes', []))
   // );
    //.pipe(map((data: any[]) => {return this.wikiList = data;
    //    }), catchError(error => {
    //    return throwError('Its a Trap!')
    //  })
    //);
    

  }
  getUserByParam(url : string) 
  {
    //const url ="http://localhost:3000/books/?publisher="
    //let t = url.concat(customParam.toString());
    //console.log(t)
    return this.http.get<bookDataInterface[]>(url)
  }
    addEntries (book : any) : any

  {
    console.log("@ the service ")
   
    return this.http.post('http://localhost:3000/books',book);
  }
  deleteById(id : number )
  {
    return this.http.delete(`http://localhost:3000/books/${id}`)
  }
 /* post request issa thing **/
 updateByISBN (hero : bookDataInterface) :Observable<bookDataInterface>

 {
   return this.http.put<bookDataInterface>(`http://localhost:3000/books/${hero.id}`,hero,{
     headers: new HttpHeaders ({
       'content-type' : 'application/json'
     })
   })
 }
 
}
