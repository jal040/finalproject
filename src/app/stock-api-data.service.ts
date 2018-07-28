import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockApiDataService {

  constructor(private http: HttpClient) { }
  
  // change symbol later (use ngmodel)
  
//   queryUrl: string = 'https://www.alphavantage.co/query?';
//   dailyUrl: string = `function=TIME_SERIES_DAILY&symbol=${this.stockSymbol}&outputsize=compact&apikey=BPP71N0IQ7U56SPJ`;

    apiKey: string = 'BPP71N0IQ7U56SPJ';

    url: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&apikey=';
  
  stockSymbol: string = 'MSFT';
  getDailyData(){
      return this.http.get(this.url+this.apiKey);
  }

}