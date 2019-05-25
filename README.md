# dashblocks

> Note: under active development

## Declarative Interactive Dashboards

Dashblocks enables easily creating complex interactive dashboards simply by declaring dashboard structure as json or javascript object.

Dashblocks uses popular charting libraries to render various kinds of chars: d3, Chart.js, Dygraphs, Plotly.js ...

For example, this dashboard specification: 
```javascript
{
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: '2',
            name: 'w2',
            type: 'DbDygraphsBar',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                stackedGraph: true,
                title: 'Traffic over time',
                ylabel: 'Requests, Mil.',
                labels: ['Date', 'Success', 'Error'],
                legend: 'always'
              }
            }
          },
          {
            id: '3',
            name: 'w3',
            type: 'DbChartjsPie',
            cspan: 4,
            height: 250
          },
          {
            id: '4',
            name: 'w4',
            type: 'DbChartjsPie',
            cspan: 4,
            height: 250
          },
          {
            id: '6',
            name: 'w6',
            type: 'DbChartjsHorizontalBar',
            cspan: 4,
            height: 250
          },
          {
            id: '7',
            name: 'w7',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 250
          }
        ]
      }
```
   
Creates this dashboard:

![dashboard](screenshots/dashboard.png?raw=true)



## License
 
MIT
