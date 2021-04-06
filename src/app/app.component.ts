import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookserviceService } from './services/bookservice.service';
import {bookDataInterface} from "src/app/types/bookdata.interface";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent {
  title = 'service-test';
  isbn:number=9781593275846;
  publisher:string =""
  ISBN : number = 0
  Title : string = ""
  subtitle : string = ""
  Publisher : string = ""
  published : string =""
  page : string = ""
  author :string = ""
  description : string = ""
  website : string = ""
  post:bookDataInterface[]=[]
  fetchBook : any = []
  bookCapture : bookDataInterface[] = [];
  url: string ="http://localhost:3000";
  constructor(private http : HttpClient, private serv : BookserviceService){}
  ngOnInit() : any 
  {
    //console.log("hello")
    this.serv.getUsers().subscribe((book : bookDataInterface[])=>{
        this.bookCapture = book;
        console.log("capt", this.bookCapture)
    })
    
    
    
  }
  
  fetchData(event : any ): void 
  {
    let t = event.target
    let isbn = t.value 
    let endpoint = "/books/" + isbn
    console.log(endpoint)
    this.serv.getUserById(this.isbn).subscribe((book : bookDataInterface[])=>
    {
      
      console.log(book)
        let FetchBook : any = []
        console.log(FetchBook)
        //this.fetchBook = FetchBook
        //FetchBook = Object.values(book)
        //console.log("fetch book",FetchBook) 
        this.fetchBook.push(book)
        
    }) 
    
   }
   fetchDataField(event : any) : void 
   {
    //let t = event.target
    console.log("publisher ngModel : ", this.publisher)
    //let customParam = t.value 
    //console.log("custom Parameter",customParam)
    let url  = `http://localhost:3000/books/?publisher=${this.publisher}`
    //let temp = url.concat(this.publisher.toString())
    console.log("app.component.ts", url)
    this.serv.getUserByParam(url).subscribe((book : bookDataInterface[])=>
    {
      
      console.log(book)
     this.post = book
       
        
    }) 
  }

  performAnUpdate() : void 
  {
    let  book  = 
      {
      id : 90,
      title : "network Analysis",
      subtitle : "networks",
      published : "2010",
      publisher : "orient black swan",
      pages : "24",
      description : "issa book",
      website :"issabook.com",
      author : "Nivedhitha"
      }
    //book.title = "hello"
    console.log("called for an update")
    this.serv.addEntries(book).subscribe((newEntry : bookDataInterface) =>
    {
      this.bookCapture.push(newEntry)
    })
   
  }
  update()
  {

    let temp : any = {}
  
   /*
    this.serv.deleteById(this.ISBN).subscribe(() =>
    {
        console.log("cleared for an update")
    }) **/
    temp ={
      id : this.ISBN,
      title : this.Title,
      subtitle : this.subtitle,
      published : this.published,
      publisher : this.Publisher,
      pages : this.page,
      description : this.description,
      website :this.website,
      author : this.author

    }
  /*
    this.serv.addEntries(temp).subscribe((newEntry : bookDataInterface) =>
    {
      this.bookCapture.push(newEntry)
      console.log("UpdationPerformed")
    }) **/
    this.serv.updateByISBN(temp).subscribe((newEntry : bookDataInterface) =>{
      this.bookCapture.push(newEntry)
      console.log("UpdationPerformed")
    } )

      
  }
}

/** 
 * to perform an update 
 * fetch the array object from the user then delete the original in the json file 
 * this will prevent the duplicate node exist error 
 * then from the fetched array object in app.component.ts file make any changes and then push it back 
 * using a push request 
 * 
 * methods : 
 * 
 * 
 *  use the fetchById method to fetch anf store in a var in app.component.ts
 *  then delete the entry of the id 
 *  then modify the var in app.component.ts 
 * and push it.
 * 
 * only have to create a method to delete 
 */
