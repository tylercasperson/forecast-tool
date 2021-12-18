import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { nest } from 'd3-collection';
import { format } from 'date-fns';
import {
  select,
  line as d3line,
  format as d3format,
  scalePoint,
  scaleLinear,
  max,
  scaleOrdinal,
  axisBottom,
  axisLeft,
} from 'd3';

import { dateFormat } from '../data/formulas/dateFormulas';

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
  const [chartSpot, setChartSpot] = useState(0);

  useEffect(() => {
    if (lineChart.current.childNodes.length > 0) {
      select(lineChart.current).select('svg').remove();
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

    let xLabelOption = props.xLabelOption
      ? props.data.map((d) => d.timePeriod.groupName)
      : props.data.map((d) => format(new Date(dateFormat(d.timePeriod.startDate)), 'M/d/yyyy'));

    const xScale = scalePoint()
      .domain(xLabelOption)
      .range([0 + margin.right, chartWidth - margin.left]);

    const yScale = scaleLinear()
      .domain([
        0,
        max(props.data, (d) => {
          return d.data;
        }),
      ])
      .range([chartHeight, margin.bottom]);

    let xLabelLineOption = props.xLabelOption
      ? (d) => xScale(d.timePeriod.groupName)
      : (d) => xScale(format(new Date(dateFormat(d.timePeriod.startDate)), 'M/d/yyyy'));

    const line = d3line()
      .x(xLabelLineOption)
      .y((d) => yScale(isNaN(d.data) ? 0 : d.data));

    const svg = select(lineChart.current)
      .append('svg')
      .style('background-color', 'lightgrey')
      .style('padding-left', '5vw')
      .attr('width', chartWidth + margin.left + margin.right)
      .attr('height', chartHeight + margin.top + margin.bottom);

    let color = scaleOrdinal().range(props.colors);
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

    let dataLength = data[0] !== undefined ? data[0].values.length : 0;
    let ticksPerDataPoints = Math.floor((dataLength / chartWidth) * 100);
    let widthPerTick = ticksPerDataPoints === 0 ? 1 : ticksPerDataPoints;

    const xAxis = axisBottom(xScale)
      .tickSize(10)
      .ticks(3)
      .tickFormat((interval, i) => {
        return i % widthPerTick !== 0 ? ' ' : interval;
      });

    svg
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);

    let xTickMarks = svg.select('g.xAxis').selectAll('g.tick')._groups[0];

    Array.from(xTickMarks).map((i, index) =>
      index % widthPerTick !== 0 ? (i.children[0].attributes.stroke.value = 'none') : ''
    );

    let heightPerTick = Math.round(height / 120) - 4;

    const yAxis = axisLeft(yScale)
      .tickFormat((interval, i) => {
        return i % heightPerTick !== 0 ? ' ' : d3format(',')(interval);
      })
      .tickSize(8);

    svg.append('g').attr('class', 'yAxis').attr('transform', `translate(45,0)`).call(yAxis);

    if (props.data.length !== 0) {
      svg
        .append('rect')
        .attr('class', 'invisibleRect')
        .attr('width', select('.xAxis').node().getBBox().width - 5)
        .attr('height', select('.yAxis').node().getBBox().height)
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

          setScrollXlabel(data[0].values[indexToBeUsed].timePeriod);

          let xLabel = props.xLabelOption
            ? scrollXlabel.groupName
            : scrollXlabel.startDate &&
              format(new Date(dateFormat(scrollXlabel.startDate)), 'M/d/yyyy').toString();

          let needPeriodInfo = (name, periodType, data) => {
            if (name === 'Moving Average') {
              return (
                movingPeriods + ' ' + periodType + ' ' + name + ' ' + d3format(',')(data) + ';'[0]
              );
            } else if (name === 'Weighted Average') {
              return (
                weightedPeriods + ' ' + periodType + ' ' + name + ' ' + d3format(',')(data) + ';'[0]
              );
            } else {
              return name + ' ' + d3format(',')(data) + ';'[0];
            }
          };

          let sameGroupName = data.map((i) =>
            i.values
              .filter((j) =>
                props.xLabelOption
                  ? j.timePeriod.groupName === xLabel
                  : format(new Date(dateFormat(j.timePeriod.startDate)), 'M/d/yyyy') === xLabel
              )
              .map((k) => needPeriodInfo(k.dataType.name, k.timePeriod.timePeriodType.type, k.data))
          );

          setHoverInfo(xLabel + ';' + sameGroupName);
        });
    }

    const hoverLabels = () => {
      svg
        .append('line')
        .attr('class', 'hoverLine')
        .attr('stroke', chartSpot === 0 ? 'none' : 'black')
        .attr('stroke-width', 2)
        .attr('x1', chartSpot)
        .attr('x2', chartSpot)
        .attr('y1', margin.top + margin.bottom)
        .attr('y2', select('.yAxis').node().getBBox().height + margin.top + margin.bottom);

      const forecastWrap = (words, xLabel) => {
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

          setTextPosition(xScale(xLabel) + x + positionX);

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

          let widthAdjustment = chartWidth < 450 ? 100 : 0;

          if (xScale(xLabel) !== undefined) {
            setChartSpot(xScale(xLabel));
          }

          svg
            .append('text')
            .attr('text-anchor', textAnchor)
            .attr('display', legendData() ? 'none' : 'flex')
            .attr('font-size', '1.3vmin')
            .attr(
              'x',
              data.length === 0 ? 0 : widthAdjustment + chartSpot + x + positionX - textGroup
            )
            .attr('y', 0 + margin.bottom - y)
            .text(text);

          let chartToWindow = chartWidth / documentWidth;

          let textWindowAdjustment = chartWidth < 450 ? 0.2 : -0.7;

          let textVariable =
            text.length > 19
              ? x === 180
                ? 0
                : text.length * textWindowAdjustment
              : text.length * 0.0037;

          let colorLabelGroup =
            x === 0
              ? widthAdjustment * 1.5 - 80 - text.length * 6 * chartToWindow
              : widthAdjustment * 0.9 + -200 * chartToWindow;

          let colorYadjustment = chartWidth < 450 ? 4 : 0;

          svg
            .append('rect')
            .attr('width', legendData() ? '0vh' : '1vmin')
            .attr('height', '1vmin')
            .attr('fill', colors[legendData('nameOnly')])
            .attr(
              'x',
              data.length === 0 ? 0 : chartSpot + textVariable + x + positionX + colorLabelGroup
            )
            .attr('y', colorYadjustment + 0 + margin.bottom - y - 8);

          if (j > 2) {
            y = -10;
            j = 0;
          }
          y += chartWidth < 450 ? 10 : 15;

          let textTimePeriod = data.length !== 0 ? chartSpot + x + positionX - 20 : 0;

          if (x === 0) {
            if (props.xLabelOption) {
              svg
                .append('text')
                .attr('font-size', '2vmin')
                .attr('font-weight', 'bold')
                .attr('x', widthAdjustment + textTimePeriod)
                .attr('y', 0 + margin.bottom - 20)
                .attr('border', '1pt solid black')
                .text(xLabel);
            } else {
              let yAdjustment = 0;

              for (let i = 0; i < 3; i++) {
                let textAdjustment =
                  xLabel.split('/')[i] &&
                  (xLabel.split('/')[i].length === 1
                    ? 5
                    : xLabel.split('/')[i].length === 2
                    ? 0
                    : xLabel.split('/')[i].length === 4
                    ? -5
                    : 0);

                svg
                  .append('text')
                  .attr('font-size', '1.8vmin')
                  .attr('font-weight', 'bold')
                  .attr(
                    'x',
                    isNaN(textTimePeriod) || textAdjustment === undefined
                      ? 0
                      : widthAdjustment + textTimePeriod + textAdjustment
                  )
                  .attr('y', 0 + margin.bottom - 32 + yAdjustment)
                  .attr('border', '1pt solid black')
                  .text(xLabel.split('/')[i]);

                yAdjustment += 20;
              }
            }
          }
        }
      };

      let xLabel = props.xLabelOption
        ? scrollXlabel.groupName
        : scrollXlabel.startDate &&
          format(new Date(dateFormat(scrollXlabel.startDate)), 'M/d/yyyy').toString();

      forecastWrap(hoverInfo, xLabel);
    };
    if (props.showHoverLabels) {
      hoverLabels();
    }
  }, [
    colors,
    props.colors,
    props.data,
    props.showHoverLabels,
    props.xLabelOption,
    chartSpot,
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
