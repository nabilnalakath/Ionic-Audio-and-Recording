import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import * as HighCharts from 'highcharts';

/**
 * Generated class for the ChartpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MaximumBarWidth = 100;
@IonicPage()
@Component({
  selector: 'page-chartpage',
  templateUrl: 'chartpage.html',
})
export class ChartpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {


    
    var myChart = HighCharts.chart('container', {
      chart: {
        type: 'column',
        height: 400,
        width: 600,
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        min: 4,
        max: 14,
        title: {
          text: ''
        },
        categories: ['5d', '2d', '1d', '2hr', '5min', '5d', '2d', '1d', '2hr', '5min', '2d', '1d', '2hr', '5min','last'],
              },
      yAxis: {
        title: {
          text: ''
        },
        max: 2,
      },
      scrollbar: {
        enabled: true
      },
      series: [{
        data: [1, 2, 3, 1, 3, 2, 1, 1, 2, 5, 2, 1, 1, 2, 5]
      }],
      plotOptions: {
        series: {
          pointWidth: 50
        },
        column: {
          pointPadding: 0,
          borderWidth: 10
        }
      }
    });

 

  }


 
}
