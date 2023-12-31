import { Component, Injector, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  userCards: any[] = [];

  // HighCharts configuration for Number of Reviews chart
  chartOptionsReviews: any = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'User Card Reviews Statistics',
    },
    xAxis: {
      title: {
        text: 'Number of Reviews',
      },
    },
    yAxis: {
      title: {
        text: 'Number of Cards',
      },
    },
    series: [
      {
        name: 'Number of Cards',
        data: [],
      },
    ],
  };

  // HighCharts configuration for Cards Due in a Certain Number of Days chart
  chartOptionsDueInDays: any = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'User Cards Due in Certain Number of Days',
    },
    xAxis: {
      title: {
        text: 'Number of Days',
      },
    },
    yAxis: {
      title: {
        text: 'Number of Cards',
      },
    },
    series: [
      {
        name: 'Number of Cards',
        data: [],
      },
    ],
  };

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {

  }

  ngAfterViewInit(): void { 
    // Fetch user cards from the API
    this.apiService.getAllUserCards().subscribe((userCards: any[]) => {
      this.userCards = userCards;

      // Update HighCharts data for Number of Reviews chart
      const numberOfReviewsData = this.calculateNumberOfReviewsData();

      this.chartOptionsReviews.series[0].data = numberOfReviewsData;

      // Update HighCharts data for Cards Due in a Certain Number of Days chart
      const dueInDaysData = this.calculateCardsDueInDays();

      this.chartOptionsDueInDays.series[0].data = dueInDaysData;

      // Redraw the charts
      Highcharts.chart('reviewsChart', this.chartOptionsReviews);
      Highcharts.chart('dueInDaysChart', this.chartOptionsDueInDays);

    }); 

    
  }

  // Helper method to calculate the number of cards for each review count
  private calculateNumberOfReviewsData(): number[] {
    const numberOfReviewsData: number[] = [];

    this.userCards.forEach((userCard) => {
      const numberOfReviews = userCard.numberOfTimesReviewed;

      // Ensure the array is long enough
    while (numberOfReviewsData.length <= numberOfReviews) {
      numberOfReviewsData.push(0);
    }

    // Increment the count
    numberOfReviewsData[numberOfReviews]++;
    });

    return numberOfReviewsData;
  }

  // Helper method to calculate the number of cards due in a certain number of days
private calculateCardsDueInDays(): number[] {
  const today = new Date();
  const dueInDaysData: number[] = []; 

  this.userCards.forEach((userCard) => {
    if (userCard.nextReviewDate) {
      const nextReviewDate = new Date(userCard.nextReviewDate);

      // Calculate the difference in days
      const timeDifference = nextReviewDate.getTime() - today.getTime();
      const daysUntilDue = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      console.log(daysUntilDue);

      // Ensure the array is long enough
      while (dueInDaysData.length <= daysUntilDue) {
       dueInDaysData.push(0);
      }

      // Increment the count
      dueInDaysData[daysUntilDue]++;
    }
  });

  return dueInDaysData;
}
}
