import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockApiDataService {

  constructor(private http: HttpClient) { }
  
  // change symbol later (use ngmodel)
  
//   queryUrl: string = 'https://www.alphavantage.co/query?';
//   dailyUrl: string = `function=TIME_SERIES_DAILY&symbol=${this.stockSymbol}&outputsize=compact&apikey=BPP71N0IQ7U56SPJ`;

    apiKey: string = 'BPP71N0IQ7U56SPJ';

    dailyUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
    weeklyUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=';
    url: string = '&outputsize=compact&apikey=';
    //microsfot: msft. apple: aapl. 
    stockSymbol: string = '';
    
  
  getDailyData(symbol){
      console.log(this.dailyUrl + symbol + this.url + this.apiKey);
      console.log("HELLOOOO");
      return this.http.get(this.dailyUrl + symbol + this.url + this.apiKey);
  };
  
  getWeeklyData(symbol){
    //   return this.http.get(this.weeklyUrl + symbol + '&apikey='+ this.apiKey);
    return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&apikey=' + this.apiKey);
  };
  
  getMonthlyData(symbol){
    return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + symbol + '&apikey=' + this.apiKey);
  };
  
  addSymbol(ticker){
    let userId = window.sessionStorage.getItem('userId');
    let token = window.sessionStorage.getItem('token');
    console.log("TICKER!!! " + JSON.stringify(ticker));
    return this.http.post("http://summer-jamie-2018-phortonssf.c9users.io:8080/api/appUsers/" + userId + "/stocks?access_token=" + token, ticker);
  };
  
  removeSymbol(ticker){
    let userId = window.sessionStorage.getItem('userId');
    let token = window.sessionStorage.getItem('token');
    console.log("TICKER!!! " + JSON.stringify(ticker));
    return this.http.delete("http://summer-jamie-2018-phortonssf.c9users.io:8080/api/appUsers/" + userId + "/stocks?access_token=" + token, ticker);
  };

}

