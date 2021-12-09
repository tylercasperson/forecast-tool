import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { nest } from 'd3-collection';

const LineChart = (props) => {
  const lineChart = useRef();

  const getFromState = useSelector((state) => state);
  const { success } = getFromState.groupedData;
  const { movingPeriods, weightedPeriods } = getFromState.periods;
  const { colors } = getFromState.colors;

  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;
  const [width, setWidth] = useState(0.8 * documentWidth);
  const [height, setHeight] = useState(0.3 * documentHeight);

  const [scrollXlabel, setScrollXlabel] = useState('w1');
  const [hoverInfo, setHoverInfo] = useState(' ');
  const [widthRatio, setWidthRatio] = useState(0);
  const [textPosition, setTextPosition] = useState(0);

  useEffect(() => {
    if (lineChart.current.childNodes.length > 0) {
      d3.select(lineChart.current).select('svg').remove();
    }

    window.addEventListener('resize', () => {
      setWidth(0.8 * document.documentElement.clientWidth);
      setHeight(0.3 * document.documentElement.clientHeight);
    });

    const margin = { top: 0, right: 45, bottom: 50, left: 30 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const forecastColor = { ui: 0, sh: 1, ly: 2, ma: 3, wa: 4, lr: 5 };

    const data = nest()
      .key((d) => d.dataType.abbreviation)
      .entries(props.data);

    const xScale = d3
      .scalePoint()
      .domain(props.data.map((d) => d.timePeriod.groupName))
      .range([0 + margin.right, chartWidth - margin.left]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(props.data, (d) => {
          return d.data;
        }),
      ])
      .range([chartHeight, margin.bottom]);

    const line = d3
      .line()
      .x((d) => xScale(d.timePeriod.groupName))
      .y((d) => yScale(d.data));

    const svg = d3
      .select(lineChart.current)
      .append('svg')
      .style('background-color', 'lightgrey')
      .style('padding-left', '5vw')
      .attr('width', chartWidth + margin.left + margin.right)
      .attr('height', chartHeight + margin.top + margin.bottom);

    let color = d3.scaleOrdinal().range(colors);
    let colorArr = [];

    svg
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', (d) => line(d.values))
      .attr('fill', 'none')
      .attr('stroke', (d) => color([d]))
      .attr('class', (d) => colorArr.push(color([d])))
      .attr('name', (d) => d.key)
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
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);

    let heightPerTick = Math.round(height / 120) - 4;

    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat((interval, i) => {
        return i % heightPerTick !== 0 ? ' ' : d3.format(',')(interval);
      })
      .tickSize(8);

    svg.append('g').attr('class', 'yAxis').attr('transform', `translate(45,0)`).call(yAxis);

    svg
      .append('rect')
      .attr('class', 'invisibleRect')
      .attr('width', d3.select('.xAxis').node().getBBox().width - 5)
      .attr('height', d3.select('.yAxis').node().getBBox().height)
      .attr('transform', 'translate(' + (margin.right - 0) + ',' + (margin.bottom - 7) + ')')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', (e) => {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let positionRatio = x / e.target.getBoundingClientRect().width;
        setWidthRatio(positionRatio);
        let indexToBeUsed =
          Math.round(positionRatio * data[0].values.length) === data[0].values.length
            ? Math.round(positionRatio * data[0].values.length - 1)
            : Math.round(positionRatio * data[0].values.length);

        setScrollXlabel(data[0].values[indexToBeUsed].timePeriod.groupName);

        let needPeriodInfo = (name, periodType, data) => {
          if (name === 'Moving Average') {
            return (
              movingPeriods + ' ' + periodType + ' ' + name + ' ' + d3.format(',')(data) + ';'[0]
            );
          } else if (name === 'Weighted Average') {
            return (
              weightedPeriods + ' ' + periodType + ' ' + name + ' ' + d3.format(',')(data) + ';'[0]
            );
          } else {
            return name + ' ' + d3.format(',')(data) + ';'[0];
          }
        };

        let sameGroupName = data.map((i) =>
          i.values
            .filter((j) => j.timePeriod.groupName === scrollXlabel)
            .map((k) => needPeriodInfo(k.dataType.name, k.timePeriod.timePeriodType.type, k.data))
        );

        setHoverInfo(scrollXlabel + ';' + sameGroupName);
      });

    const hoverLabels = () => {
      svg
        .append('line')
        .attr('class', 'hoverLine')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('x1', xScale(scrollXlabel))
        .attr('x2', xScale(scrollXlabel))
        .attr('y1', margin.top + margin.bottom)
        .attr('y2', d3.select('.yAxis').node().getBBox().height + margin.top + margin.bottom);

      const forecastWrap = (words) => {
        let wordsArr = words.split(';');
        wordsArr.pop();

        let forecastUsed = [];

        for (let i = 0; i < data.length; i++) {
          forecastUsed.push(data[i].key);
        }

        let y = 5;
        let j = 0;
        let positionX = 1 - widthRatio * 220;

        for (let i = 1; i < wordsArr.length; i++) {
          let x = i > 3 ? 180 : 0;
          j++;
          let periodInfo = hoverInfo.split(';')[i];

          let text =
            hoverInfo.split(';')[i].charAt(0) === ','
              ? hoverInfo.split(';')[i].slice(1, periodInfo.length)
              : hoverInfo.split(';')[i];

          setTextPosition(xScale(scrollXlabel) + x + positionX);

          let textAnchor = x === 0 ? 'end' : 'start';
          let textGroup = x === 0 ? 40 : 130;

          const legendData = (option) => {
            let nameInQuestion;
            if (text.split(' ').length === 3) {
              nameInQuestion =
                text.split(' ')[0].charAt(0).toLowerCase() +
                text.split(' ')[1].charAt(0).toLowerCase();
            } else if (text.split(' ').length === 5) {
              nameInQuestion =
                text.split(' ')[2].charAt(0).toLowerCase() +
                text.split(' ')[3].charAt(0).toLowerCase();
            }
            if (option === 'nameOnly') {
              return forecastColor[nameInQuestion];
            } else {
              return !forecastUsed.includes(nameInQuestion);
            }
          };

          svg
            .append('text')
            .attr('text-anchor', textAnchor)
            .attr('display', legendData() ? 'none' : 'flex')
            .attr('font-size', '1.3vh')
            .attr('x', data.length === 0 ? 0 : xScale(scrollXlabel) + x + positionX - textGroup)
            .attr('y', 0 + margin.bottom - y)
            .text(text);

          let chartToWindow = chartWidth / documentWidth;

          let textVariable =
            text.length > 19 ? (x === 180 ? 0 : text.length * -0.7) : text.length * 0.0037;
          let colorLabelGroup =
            x === 0 ? -80 - text.length * 6 * chartToWindow : -200 * chartToWindow;

          svg
            .append('rect')
            .attr('width', legendData() ? '0vh' : '1vh')
            .attr('height', '1vh')
            .attr('fill', colors[legendData('nameOnly')])
            .attr(
              'x',
              data.length === 0
                ? 0
                : xScale(scrollXlabel) + textVariable + x + positionX + colorLabelGroup
            )
            .attr('y', 0 + margin.bottom - y - 8);

          if (j > 2) {
            y = -10;
            j = 0;
          }
          y += 15;

          let textTimePeriod = data.length !== 0 ? xScale(scrollXlabel) + x + positionX - 20 : 0;

          if (x === 0) {
            svg
              .append('text')
              .attr('font-size', '2vh')
              .attr('font-weight', 'bold')
              .attr('x', textTimePeriod)
              .attr('y', 0 + margin.bottom - 20)
              .attr('border', '1pt solid black')
              .text(scrollXlabel);
          }
        }
      };

      forecastWrap(hoverInfo);
    };
    if (props.showHoverLabels) {
      hoverLabels();
    }
  }, [
    colors,
    props.data,
    props.showHoverLabels,
    height,
    width,
    documentWidth,
    documentHeight,
    success,
    scrollXlabel,
    hoverInfo,
    widthRatio,
    textPosition,
    movingPeriods,
    weightedPeriods,
  ]);

  return <div ref={lineChart}></div>;
};

export default LineChart;
