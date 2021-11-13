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
    if (props.data.length !== 0) {
      const margin = { top: 0, right: 30, bottom: 50, left: 30 };
      const graphWidth = width - margin.left - margin.right;
      const graphHeight = height - margin.top - margin.bottom;

      const nested = nest()
        .key((d) => d.dataType.abbreviation)
        .entries(props.data);

      console.log('nest: ', nested);

      const xScale = d3
        .scalePoint()
        .domain(data.map((d) => d.timePeriod.groupName))
        .range([0 + margin.right, graphWidth - margin.left]);

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, (d) => {
            return d.data;
          }),
        ])
        .range([graphHeight, margin.bottom]);

      const line = d3
        .line()
        .x((d) => xScale(d.timePeriod.groupName))
        .y((d) => yScale(d.data));

      const svg = d3
        .select(lineChart.current)
        .append('svg')
        .style('background-color', 'lightgrey')
        .style('width', graphWidth + margin.left + margin.right)
        .style('height', graphHeight + margin.top + margin.bottom);

      var color = d3
        .scaleOrdinal()
        .range([
          '#e41a1c',
          '#377eb8',
          '#4daf4a',
          '#984ea3',
          '#ff7f00',
          '#ffff33',
          '#a65628',
          '#f781bf',
          '#999999',
        ]);

      svg
        .selectAll('path')
        .data(nested)
        .enter()
        .append('path')
        .attr('d', (d) => line(d.values))
        .attr('fill', 'none')
        .attr('stroke', (d) => color([d]))
        .attr('stroke-width', 1.5);

      svg.exit().remove();

      const xAxis = d3
        .axisBottom(xScale)
        .tickFormat((interval, i) => {
          return i % 3 !== 0 ? ' ' : interval;
        })
        .tickSize(10);

      svg
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0,${graphHeight})`)
        .call(xAxis);

      svg.exit().remove();

      const yAxis = d3
        .axisLeft(yScale)
        .tickFormat((interval, i) => {
          return i % 2 !== 0 ? ' ' : interval;
        })
        .tickSize(8);

      svg.exit().remove();

      svg
        .append('g')
        .attr('class', 'yAxis')
        .attr('transform', `translate(30,0)`)
        .call(yAxis);
    }
  }, [data, height, width]);

  return <div ref={lineChart}></div>;
};

export default LineGraph;
