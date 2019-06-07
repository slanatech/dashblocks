# dashblocks

> Note: under active development

![](https://img.shields.io/badge/vue-2.x-brightgreen.svg)

## Declarative Interactive Dashboards

[DEMO](https://slanatech.github.io/dashblocks)

Dashblocks enables easily creating complex interactive dashboards simply by declaring dashboard structure as json or javascript object.

Dashblocks uses popular charting libraries to render chars: d3, Chart.js, Dygraphs, Plotly.js ...

For example, this dashboard:

![dashboard](screenshots/dashboard.png?raw=true)


created by this dashboard declaration: 
```javascript
{
  layout: {
    type: 'grid'
  },
  widgets: [
    {
      id: 'w2',
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
      id: 'w3',
      type: 'DbChartjsPie',
      cspan: 4,
      height: 250
    },
    {
      id: 'w4',
      type: 'DbChartjsPie',
      cspan: 4,
      height: 250
    },
    {
      id: 'w6',
      type: 'DbChartjsHorizontalBar',
      cspan: 4,
      height: 250
    },
    {
      id: 'w7',
      type: 'DbChartjsBar',
      cspan: 4,
      height: 250
    }
  ]
}
```

## Roadmap 

Roadmap and plans roughly defined in [TODO](TODO.md)  

## License
 
[MIT](LICENSE)
