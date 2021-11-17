import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { nest } from 'd3-collection';

const LineGraph = (props) => {
  const lineChart = useRef();

  const groupedDataUpdate = useSelector((state) => state.groupedDataUpdate);
  const { success } = groupedDataUpdate;

  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;
  const [width, setWidth] = useState(0.8 * documentWidth);
  const [height, setHeight] = useState(0.3 * documentHeight);

  useEffect(() => {
    if (lineChart.current.childNodes.length > 0) {
      d3.select(lineChart.current).select('svg').remove();
    }

    window.addEventListener('resize', () => {
      setWidth(0.8 * document.documentElement.clientWidth);
      setHeight(0.3 * document.documentElement.clientHeight);
    });

    const margin = { top: 0, right: 30, bottom: 50, left: 30 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const data = nest()
      .key((d) => d.dataType.abbreviation)
      .entries(props.data);

    const xScale = d3
      .scalePoint()
      .domain(props.data.map((d) => d.timePeriod.groupName))
      .range([0 + margin.right, graphWidth - margin.left]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(props.data, (d) => {
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
      .attr('width', graphWidth + margin.left + margin.right)
      .attr('height', graphHeight + margin.top + margin.bottom);

    var color = d3.scaleOrdinal().range(props.color);

    svg
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', (d) => line(d.values))
      .attr('fill', 'none')
      .attr('stroke', (d) => color([d]))
      .attr('stroke-width', 1.5);

    let widthPerTick = Math.round(width / 100) - 13;

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((interval, i) => {
        return i % widthPerTick !== 0 ? ' ' : interval;
      })
      .tickSize(10);

    svg
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0,${graphHeight})`)
      .call(xAxis);

    let heightPerTick = Math.round(height / 120) - 4;

    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat((interval, i) => {
        return i % heightPerTick !== 0 ? ' ' : interval;
      })
      .tickSize(8);

    svg
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(30,0)`)
      .call(yAxis);
  }, [
    props.data,
    height,
    width,
    documentWidth,
    documentHeight,
    props.color,
    success,
  ]);

  return <div ref={lineChart}></div>;
};

export default LineGraph;
