import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import moment from "moment";
import { EChartsOption } from 'echarts';

export interface IMoodLineValue{
  label: string
  value: number
}

interface IMoodValue{
  time: Date,
  lines: IMoodLineValue[]
}

@Component({
  selector: 'app-participant-mood-chart',
  templateUrl: './participant-mood-chart.component.html',
  styleUrls: ['./participant-mood-chart.component.scss']
})
export class ParticipantMoodChartComponent implements OnInit, OnDestroy {

  @Input() moodLineValues: {[key: string]: number} = {};
  @Input() maxValues: number = 30;
  private moodValues: IMoodValue[] = [];
  private moodTimer: NodeJS.Timeout|null = null;

  options: EChartsOption = {};
  updateOptions: EChartsOption = {};


  ngOnInit(): void {
    this.startInterval();
    this.options = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      legend: {
        data: []
      },
      yAxis: {
        type: 'value',
        min: -5,
        max: 5,
        interval: 1
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          return params.axisValueLabel+ ' : ' + params.data;
        },
        axisPointer: {
          animation: false
        }
      },
      series: []
    }

  }

  ngOnDestroy() {
    if(this.moodTimer !== null){
      clearInterval(this.moodTimer);
    }
  }

  private startInterval(){
    this.moodTimer = setInterval(() => {
      let moodValues: IMoodValue = {
        time: new Date(),
        lines: []
      };
      for (const label of Object.keys(this.moodLineValues)) {
        moodValues.lines.push({ label: label, value: this.moodLineValues[label] })
      }
      this.moodValues.push(moodValues);
      this.moodValues = this.moodValues.slice(Math.max(this.moodValues.length - this.maxValues, 0));
      this.updateOptions = this.buildOptionsByMoodValues(this.moodValues);
    }, 1000);
  }

  private hslToHex(h: number, s: number, l: number){
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  private buildOptionsByMoodValues(moodValues: IMoodValue[]){
    let series: any = {};
    let data: any = {
      xAxis: {
        data: []
      },
      legend: {
        data: []
      },
      series: []
    };
    for (const moodValue of moodValues) {
      data.xAxis.data.push(moment(moodValue.time).format("hh:mm:ss"));
      for (const line of moodValue.lines) {
        if (!series.hasOwnProperty(line.label)) series[line.label] = [];
        series[line.label].push(line.value);
      }
    }
    let labels = Object.keys(series);
    let hslHFactor = 100 / labels.length;

    for (let i = 0; i < labels.length; i++) {
       let label = labels[i];
       data.series.push({
         name: label,
         type: 'line',
         showSymbol: false,
         hoverAnimation: false,
         data: series[label],
         color: this.hslToHex(i*hslHFactor + 190, 67, 67)
       });
       data.legend.data.push(label)
    }
    return data;
  }

}
