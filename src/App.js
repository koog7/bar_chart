import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./App.css"

// https://github.com/koog7/jsonplacegolder_db/blob/main/jsonplaceholder.json
// npm install --save react-apexcharts apexcharts

const chartData = [
  {
    category: "Category -1",
    value: 10,
    color: "blue" // Устанавливаем цвет для этого столбца
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          width: 300,
        },
        xaxis: {
          categories: []
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "center",
            },
            columnWidth: "50%",
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          labels: {
            rotate: -90
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            opacityFrom: 0.4,
            opacityTo: 1,
            colorStops: 
            [
              {
                offset: 10,
                color: "#000080",
                opacity: 1
              },
              {
                offset: 80,
                color: "#00CFBC",
                opacity: 1
              },
            ]
          }
        },
        grid: {
          show: false // Этот параметр скроет сетку графика
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + "K";
              } else {
                return value;
              }
            }
          }
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: undefined,
          width: 1,
          dashArray: 0, 
      },
        responsive: [
          {
            breakpoint: 700,
            options: {
              chart: {
                width: "100%" 
              },
              legend: {
                position: "bottom"
              }
              // Другие настройки по вашему желанию
            }
          }
        ]
      },
      
      itCompanies: [],
      jobsCreated: [],
      taxes: []
    };
    
  }
  
  componentDidMount() {
    fetch("https://raw.githubusercontent.com/koog7/db_json/main/jsonplaceholder.json")
      .then(response => response.json())
      .then(data => {
        const categories = data.map(item => item.year);
        const originalTaxes = data.map(item => item.taxes);
        
        // Уменьшите последний элемент в данных только для отображения
        const lastYearIndex = originalTaxes.length - 1;
        const modifiedTaxes = [...originalTaxes];
        modifiedTaxes[lastYearIndex] /= 2;
        
        // Обновите данные только для последнего столбца
        data[lastYearIndex].taxes = modifiedTaxes[lastYearIndex];
  
        this.setState({
          itCompanies: data[0].it_companies,
          jobsCreated: data.map(item => item.jobs_created),
          taxes: originalTaxes,
          originalTaxes: originalTaxes,
          options: {
            ...this.state.options,
            xaxis: {
              categories: categories
            }
          }
        });
      })
      .catch(error => console.error("Ошибка запроса:", error));
  }
  
  
  

  render() {
    return (
      <div className="app">
        <div className="top-section">
          <h2 className="gradient-text">HTP KEY METRICS</h2>
          <p className="text-proceeds">Proceeds</p>
        </div>
        <div className="row">
          <div className="usd-label">
          <p>USD</p>
          </div>
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={[
                {
                  name: "Taxes",
                  data: this.state.taxes
                }
              ]}
              type="bar"
              // width="1000"
            />
          </div>
          <div className="info-section">
            <p id="info"><a id="info_a">{this.state.itCompanies.reduce((total, companiesArray) => total + companiesArray.length, 0)}</a> It Companies</p>
            <p id="info"><a id="info_a">{this.state.jobsCreated.reduce((acc, val) => acc + val, 0)}</a> Jobs Created</p>
            <p id="info"><a id="info_a" >{this.state.taxes.reduce((acc, val) => acc + val, 0) >= 1000000
                                        ? (this.state.taxes.reduce((acc, val) => acc + val, 0) / 1000000).toFixed(1) + " m"
                                        : this.state.taxes.reduce((acc, val) => acc + val, 0) + " Taxes paid"
                                        }</a> Taxes paid</p>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;




