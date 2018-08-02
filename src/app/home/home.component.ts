/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

import { UserService } from '../user.service';
import { StockApiDataService } from '../stock-api-data.service';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private _userService: UserService, 
    private _stockApiService: StockApiDataService,
    private router: Router) { }
  
  user: any;
  
  //symbol: string;

  ngOnInit() {
    // the service.getUser() method returns an Observable
    // ALL http calls require SUBSCRIBE
    this._userService.getUser(window.sessionStorage.getItem('userId'), window.sessionStorage.getItem('token')).subscribe(
      (res) => {
        console.log(res);
        this.user = res;
      }
    );
  };
  
  status: string = 'daily';
  stockDailyData: any;
  stockWeeklyData: any;
  stockMonthlyData: any;
  
  stockSymbol: any = {
    ticker: ''
  };

  closeArray: Array<any> = [
    { data : [], label: 'close'}
  ];
  
  closeArrayWeekly: Array<any> = [
    { data : [], label: 'close'}
  ];
  
  closeArrayMonthly: Array<any> = [
    { data: [], label: 'close'}
  ];
  
  labelArray:Array<any> = [];
  
  goDaily(symbol) {
    this.status = 'daily';
    this.displayData(symbol);
  };
  
  goWeekly(symbol) {
    this.status = 'weekly';
    this.displayData(symbol);
  };
  
  goMonthly(symbol) {
    this.status = 'monthly';
    this.displayData(symbol);
  };

  displayData(symbol) {
    if(this.status === 'daily'){
      console.log("daily data");
      this._stockApiService.getDailyData(symbol).subscribe(
        (res) => {
          console.log(res);
          this.stockDailyData = res;
          console.log(this.stockDailyData["Time Series (Daily)"]);
          let dates = this.stockDailyData["Time Series (Daily)"];
          this.closeArray[0].data = [];
          this.lineChartLabels = [];
          //this.labelArray = [];
          for (let date in dates) {
            //console.log(date, this.stockDailyData["Time Series (Daily)"][date]);
            let date1 = this.stockDailyData["Time Series (Daily)"][date];
            this.lineChartLabels.push(date);
            let closePoint = Number(date1["4. close"]);
            this.closeArray[0].data.push(closePoint);
            //console.log(parseFloat(date1["4. close"]).toFixed(2));
            //console.log(this.lineChartLabels);
          }
          this.closeArray[0].data = this.closeArray[0].data.slice(0, 14);
          this.lineChartLabels = this.lineChartLabels.reverse().slice(0, 14);
        }
      ); 
    } else if( this.status === 'weekly'){
      this._stockApiService.getWeeklyData(symbol).subscribe(
        (res) => {
          console.log(res);
          this.stockWeeklyData = res;
          console.log(this.stockWeeklyData["Weekly Time Series"]);
          let dates = this.stockWeeklyData["Weekly Time Series"];
          this.closeArrayWeekly[0].data = [];
          this.lineChartLabels = [];
          //this.labelArray = [];
          for (let date in dates) {
            //console.log(date, this.stockDailyData["Time Series (Daily)"][date]);
            let date1 = this.stockWeeklyData["Weekly Time Series"][date];
            this.lineChartLabels.push(date);
            let closePoint = Number(date1["4. close"]);
            this.closeArrayWeekly[0].data.push(closePoint);
            //console.log(parseFloat(date1["4. close"]).toFixed(2));
            //console.log(this.lineChartLabels);
          }
          this.closeArray = this.closeArrayWeekly;
          this.lineChartLabels = this.lineChartLabels.slice(0,14);
        }
      );
    } else if( this.status === 'monthly'){
      this._stockApiService.getMonthlyData(symbol).subscribe(
        (res) => {
          console.log(res);
          this.stockMonthlyData = res;
          console.log(this.stockMonthlyData["Monthly Time Series"]);
          let dates = this.stockMonthlyData["Monthly Time Series"];
          this.closeArrayMonthly[0].data = [];
          this.lineChartLabels = [];
          //this.labelArray = [];
          for (let date in dates) {
            //console.log(date, this.stockDailyData["Time Series (Daily)"][date]);
            let date1 = this.stockMonthlyData["Monthly Time Series"][date];
            this.lineChartLabels.push(date);
            let closePoint = Number(date1["4. close"]);
            this.closeArrayMonthly[0].data.push(closePoint);
            //console.log(parseFloat(date1["4. close"]).toFixed(2));
            //console.log(this.lineChartLabels);
          }
          this.closeArray = this.closeArrayMonthly;
          this.lineChartLabels = this.lineChartLabels.slice(0,13);
        }
      );
    }
  };
  
  addToFavorites(symbol){
    this.stockSymbol.ticker = symbol;
    this._stockApiService.addSymbol(this.stockSymbol).subscribe(
      (res) => {
        console.log(this.stockSymbol);
        console.log(res);
      }
      
    );
  };
  
  // displayDailyData(symbol) {
  //   console.log("daily data");
  //   this._stockApiService.getDailyData(symbol).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.stockDailyData = res;
  //       console.log(this.stockDailyData["Time Series (Daily)"]);
  //       let dates = this.stockDailyData["Time Series (Daily)"];
  //       this.closeArray[0].data = [];
  //       this.lineChartLabels = [];
  //       //this.labelArray = [];
  //       for (let date in dates) {
  //         //console.log(date, this.stockDailyData["Time Series (Daily)"][date]);
  //         let date1 = this.stockDailyData["Time Series (Daily)"][date];
  //         this.lineChartLabels.push(date);
  //         let closePoint = Number(date1["4. close"]);
  //         this.closeArray[0].data.push(closePoint);
  //         //console.log(parseFloat(date1["4. close"]).toFixed(2));
  //         //console.log(this.lineChartLabels);
  //       }
  //       this.closeArray[0].data = this.closeArray[0].data.slice(0, 14);
  //       this.lineChartLabels = this.lineChartLabels.reverse().slice(0, 14);
  //     }
  //   );
  // };

  
  // displayWeeklyData(symbol) {
  //   this._stockApiService.getWeeklyData(symbol).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.stockWeeklyData = res;
  //       console.log(this.stockWeeklyData["Weekly Time Series"]);
  //       let dates = this.stockWeeklyData["Weekly Time Series"];
  //       this.closeArrayWeekly[0].data = [];
  //       this.lineChartLabels = [];
  //       //this.labelArray = [];
  //       for (let date in dates) {
  //         //console.log(date, this.stockDailyData["Time Series (Daily)"][date]);
  //         let date1 = this.stockWeeklyData["Weekly Time Series"][date];
  //         this.lineChartLabels.push(date);
  //         let closePoint = Number(date1["4. close"]);
  //         this.closeArrayWeekly[0].data.push(closePoint);
  //         //console.log(parseFloat(date1["4. close"]).toFixed(2));
  //         //console.log(this.lineChartLabels);
  //       }
  //       this.closeArray = this.closeArrayWeekly;
  //       this.lineChartLabels = this.lineChartLabels.slice(0,14);
  //     }
  //   );
  // };
  
  
  
  // lineChart
  // For stock, the data points will be the CLOSE numbers.
  public lineChartData:Array<any> = this.closeArray;
  
  public lineChartLabels:Array<any> = ['July', 'June', 'May', 'April', 'March'];
  public lineChartOptions:any = {
    responsive: true
  };
  
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  
  
}
