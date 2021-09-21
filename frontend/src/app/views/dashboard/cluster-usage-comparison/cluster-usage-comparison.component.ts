import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ClustersService } from 'src/app/core/services/clusters.service';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

@Component({
  selector: 'app-cluster-usage-comparison',
  templateUrl: './cluster-usage-comparison.component.html',
  styleUrls: ['./cluster-usage-comparison.component.scss']
})
export class ClusterUsageComparisonComponent implements OnInit {
  constructor(private clusterService: ClustersService){}

  public mainChartData: Array<any> = [
    {
      data:  [],
      label: 'CPU'
    },
    {
      data: [],
      label: 'RAM'
    }
  ];
  public mainChartLabels: string[] = [];
  public mainChartLegend = false;
  public mainChartType = 'line';
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit(): void {
    this.clusterService.result$
    .pipe(filter(res=> res != null))
    .subscribe(res=> {
      this.mainChartLabels = res.data.map(c=> c.name)
      this.mainChartData[0].data = res.data.map(c=> {
        return c.metrics.totalCpuUsage
      })

      this.mainChartData[1].data = res.data.map(c=> {
        return c.metrics.totalMemoryUsage
      })
    })
  }

}
