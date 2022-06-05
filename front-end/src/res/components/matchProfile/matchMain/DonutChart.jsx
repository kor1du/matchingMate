import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function DonutChart(props) {
    const {categoryLabelList, categoryDataList} = props;

    const data = {
        labels: categoryLabelList,
        datasets: [{
            label: '매칭 횟수',
            data: categoryDataList,
            borderWidth: 1,
            backgroundColor: [ '#a29bfe', '#ffeaa7', '#ff7675', '#81ecec', '#fd79a8', '#74b9ff', '#fab1a0', '#dfe6e9', '#55efc4', '#fdcb6e', '#00b894', '#e84393', '#636e72', '#e17055', '#0984e3' ],
            hoverOffset: 15,
            hoverBorderColor:"black",
            hoverBorderWidth: 5,

            datalabels: {
                labels: {
                  title: {
                    color: 'green'
                    }
                }
            },
        }],
        plugins: [ChartDataLabels],
    }

    const options = {
        responsive: true,
        rotation: Math.PI * -30,
        
        layout: {
            padding: {
                bottom: 10
            }
        },

        plugins:{
            
            title :{
                font: {
                  size: 30,
                  weight: 900,
                },
                padding : {
                  top: 10,
                  bottom: 20
                },
                display: true,
                text:"카테고리별 매칭 횟수"
            },
            
            legend: {
                
                display: true,
                position:"bottom",

                labels: {
                    font: {
                        size: 20,
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    },
                },
            },
            
            datalabels: {
                formatter: function(value, context) {
                    var idx = context.dataIndex;
                    if (Number(value) === 0) return null;
                    return context.chart.data.labels[idx] + "\n" + value + '회';
                },

                color: 'black',
                font: {
                    size: 20,
                    weight:700,
                },
                
                
            },
            
        },
        
    }

    return (
        <div style={{width:600}}>
            <Doughnut data={data} options={options}/>
        </div>
    );
}

export default DonutChart;