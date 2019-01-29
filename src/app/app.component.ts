import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  restItems: any;
  interval: any;
  restItemsUrl = 'https://newsapi.org/v2/everything?q=reactjs&apiKey=86bb9d6c95fe4e5faacb1d04a856b833&pageSize=10&page=1';
  now:number;

  constructor(private http: HttpClient) {
  setInterval(() => {
          this.now = Date.now();
        }, 1000);
  }



  ngOnInit() {
     this.getRestItems();
    this.refreshData();
    this.interval = setInterval(() => { 
        this.refreshData(); 

    }, 1000);
}

refreshData(){
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
           console.log('data refreshing');
        }
      )
}



  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }


  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }
}