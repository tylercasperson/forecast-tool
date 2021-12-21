# Forecast-Tool

## Here is the link to the live website: [Forecast Tool](https://forecast-tool.herokuapp.com/)

---

In the past I have used a lot of different forecasting techniques. The forecasting techniques were used to help predicts how much inventory to purchase. I would go into a inventoy system (enterprise resource planning system) and pull out a table similar to the salesData table. I would then apply different forecasting techniques and prepare purchase orders. This app would be a great add on to some of the software I have used. Forecasts can easily be added and modified. This app has some features like the sales history section intended for demonstration purposes. The sales history can be quickly changed to show different trends. Which will show why one forecasting technique is not always the best.

### Features

- Export data to Excel
- Randomize sales history to show trends
- Update data
- Delete outliers
- Adjustable periods used to group data
- Change colors used on chart
- Hover over an area on the chart to get the data
- Show and hide different forecasts on the chart
- Explination of different forecast techniques
- Entity Relationship Diagram explaining the database
- GDP as reported by alpha vantage
- Forecasts available:
  - Last Year
  - Moving Average
  - Weighted Average
  - Linear Regression

---

### Running development

- Git clone
- cd to the file location
- npm install
- cd client
- npm install
- cd ..

- add a env file with the env variables listed below
- change the database env variables to your connections

- npm run dev
- backend server will run on port 4000
- frontend server will run on port 3000

### env variables

- NODE_ENV = development
- PORT = 4000
- alphaVantageApiKey = your alpha vantage api key
- database = ForecastToolDB
- host = 127.0.0.1
- username = root
- dbPassword = root
