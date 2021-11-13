import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { nest } from 'd3-collection';

const LineGraph = (props) => {
  const lineChart = useRef();

  // const [data, setData] = useState(props.data);
  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;
  const [width, setWidth] = useState(0.8 * documentWidth);
  const [height, setHeight] = useState(0.3 * documentHeight);
  // const [data, setData] = useState(props.data);

  let data = props.data;

  useEffect(() => {
    const margin = { top: 0, right: 30, bottom: 50, left: 30 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // const nested = nest()
    //   .key((d) => d.timePeriod.groupName)
    //   .entries(props.data);

    // console.log('nest: ', nested);

    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.key))
      .range([0 + margin.right, graphWidth - margin.left]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => {
          return d.m3wa;
        }),
      ])
      .range([graphHeight, margin.bottom]);

    const line = d3
      .line()
      .x((d) => xScale(d.timePeriod.groupName))
      .y((d) => yScale(d.m3wa));

    const svg = d3
      .select(lineChart.current)
      .append('svg')
      .style('background-color', 'lightgrey')
      .style('width', graphWidth + margin.left + margin.right)
      .style('height', graphHeight + margin.top + margin.bottom);

    svg
      .append('path')
      .attr('d', () => line(data))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    let xTicks = Math.ceil(data.length / (graphWidth / data.length));

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((interval, i) => {
        return i % xTicks !== 0 ? ' ' : interval;
      })
      .tickSize(10);

    svg
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0,${graphHeight})`)
      .call(xAxis);

    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat((interval, i) => {
        return i % 2 !== 0 ? ' ' : interval;
      })
      .tickSize(8);

    svg
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(30,0)`)
      .call(yAxis);
  }, [data, height, width]);

  return <div ref={lineChart}></div>;
};

export default LineGraph;
