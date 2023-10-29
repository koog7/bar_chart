
import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./App.css"

// https://github.com/koog7/jsonplacegolder_db/blob/main/jsonplaceholder.json
// npm install --save react-apexcharts apexcharts


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "center",
            }
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
            gradientToColors: ["#8360c3", "#2ebf91"]
          }
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
  
        this.setState({
          itCompanies: data[0].it_companies,
          jobsCreated: data.map(item => item.jobs_created),
          taxes: data.map(item => item.taxes),
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
              width="500"
            />
          </div>
          <div className="info-section">
            <p id="info"><a id="info_a">{this.state.itCompanies.length}</a> It Companies</p>
            <p id="info"><a id="info_a">{this.state.jobsCreated.reduce((acc, val) => acc + val, 0)}</a> Jobs Created</p>
            <p id="info"><a id="info_a">{this.state.taxes.reduce((acc, val) => acc + val, 0)}</a> Taxes paid</p>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;




