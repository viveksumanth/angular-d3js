import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Scale from 'd3-scale';
@Component({
  selector: 'app-d3js',
  templateUrl: './d3js.component.html',
  styleUrls: ['./d3js.component.css']
})
export class D3jsComponent implements OnInit {
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 100, left: 100};

   x: any;
   y: any;
  private svg: any;
  private g: any;
  private xaxisGroup: any;
  private yaxisGroup:any;
  value;
  flag = true ;
  ylabel;
  label;
  xlabel;
  bardata;

  starbucksData=[
    {
      "month": "January",
      "revenue": 23432,
      "profit": 8342
    },
    {
      "month": "February",
      "revenue": 19342,
      "profit": 50342
    },
    {
      "month": "March",
      "revenue": 17443,
      "profit": 35423
    },
    {
      "month": "April",
      "revenue": 26342,
      "profit": 18432
    },
    {
      "month": "May",
      "revenue": 34213,
      "profit": 29434
    },
    {
      "month": "June",
      "revenue": 50321,
      "profit": 45343
    },
    {
      "month": "July",
      "revenue": 54273,
      "profit": 47452
    }
  ]

  constructor() { }

  ngOnInit() {
    this.initsvg();
    this.initdrawAxis();
    this.initAxis();
    this.axisLabel()
    // this.drawbars()
    this.d3update()
  }
initsvg(){
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')'); 
  }

  initAxis(){

    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.2);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);

  }

  //non repetable code.
  initdrawAxis(){

    this.xaxisGroup=this.g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height +")")



    this.yaxisGroup=this.g.append("g")
        .attr("class", "y axis")

        }
      
  axisLabel(){
    this.ylabel =this.g.append("text")
                        .attr("class","y axis-label")
                        .attr("x", -(this.height/2))
                        .attr("y", -60)
                        .attr("font-size" , "20px")
                        .attr("text-anchor", "middle")
                        .attr("transform", "rotate(-90)")
                           

    this.xlabel=this.g.append("text")
                    .attr("class","x axis-label")
                    .attr("x", 190)
                    .attr("y", 330)
                    .attr("font-size" , "20px")
                    .attr("text-anchor", "middle")
                    .text("month"); 
  }

  drawbars(){

    this.bardata = this.g.selectAll('.bar')
                      .data(this.starbucksData)

    this.bardata.exit().remove()

    this.bardata

      .attr('x',  (d) => this.x(d.month))
      .attr('y', (d) => this.y(d[this.value]))
      .attr('width', this.x.bandwidth)
      .attr('height', (d) => this.height - this.y(d[this.value]) )
      .attr('fill','blue')
    console.log(this.value)


    this.bardata
      .enter()
      .append("rect")
      .attr('x',  (d) => this.x(d.month))
      .attr('y', (d) => this.y(d[this.value]))
      .attr('width', this.x.bandwidth)
      .attr('height', (d) => this.height - this.y(d[this.value]) )
      .attr('fill','grey')

 
    }

  d3update(){
    d3.interval((d)=>{
      this.updatabledata()
      this.flag = !(this.flag)
      console.log(this.flag)
    }, 1000);
    this.updatabledata()
    
  }

  updatabledata(){

    this.value = this.flag ? "revenue" : "profit"
    
    console.log(this.value)
    this.x.domain(this.starbucksData.map(function(d){ return d.month }));
    this.y.domain([0, d3Array.max(this.starbucksData, (d) => d[this.value])]);

    var xAxisCall = d3.axisBottom(this.x)
    this.xaxisGroup.call(xAxisCall);

    var yAxisCall = d3.axisLeft(this.y)
      .tickFormat(function(d){ return "$" + d; })
    this.yaxisGroup.call(yAxisCall);

    this.drawbars()
    this.label = this.flag ? this.ylabel.text("profit") : this.ylabel.text("revenue")



  }
}