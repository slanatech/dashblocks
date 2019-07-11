<template>
  <div>
    <div style="position: relative;width: 90%;">
      <div>Light Mode</div>
      <db-horizon :data="chartData" :dark="false"></db-horizon>
    </div>
    <div style="position: relative;width: 90%;">
      <div>Dark mode. TODO Font color in DbHorizon</div>
      <db-horizon :data="chartData" :dark="true"></db-horizon>
    </div>
  </div>
</template>

<script>
import DbHorizon from '../../../components/d3/DbHorizon';

export default {
  name: 'about',
  components: {
    DbHorizon
  },
  data() {
    return {
      show: false,
      hData: null,
      chartData: [
        {
          key: 'Unna',
          values: [
            {
              name: 'Unna',
              date: new Date('2016-01-04T00:00:00.000Z'),
              value: 2035
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T01:00:00.000Z'),
              value: 1429
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T02:00:00.000Z'),
              value: 942
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T03:00:00.000Z'),
              value: 704
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T04:00:00.000Z'),
              value: 893
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T05:00:00.000Z'),
              value: 1545
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T06:00:00.000Z'),
              value: 3506
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T07:00:00.000Z'),
              value: 5583
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T08:00:00.000Z'),
              value: 7035
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T09:00:00.000Z'),
              value: 5802
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T10:00:00.000Z'),
              value: 5469
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T11:00:00.000Z'),
              value: 5633
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T12:00:00.000Z'),
              value: 5906
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T13:00:00.000Z'),
              value: 6331
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T14:00:00.000Z'),
              value: 6477
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T15:00:00.000Z'),
              value: 7047
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T16:00:00.000Z'),
              value: 7355
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T17:00:00.000Z'),
              value: 7700
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T18:00:00.000Z'),
              value: 7197
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T19:00:00.000Z'),
              value: 5791
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T20:00:00.000Z'),
              value: 4043
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T21:00:00.000Z'),
              value: 3041
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T22:00:00.000Z'),
              value: 2381
            },
            {
              name: 'Unna',
              date: new Date('2016-01-04T23:00:00.000Z'),
              value: 1971
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T00:00:00.000Z'),
              value: 1272
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T01:00:00.000Z'),
              value: 895
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T02:00:00.000Z'),
              value: 802
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T03:00:00.000Z'),
              value: 763
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T04:00:00.000Z'),
              value: 871
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T05:00:00.000Z'),
              value: 1361
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T06:00:00.000Z'),
              value: 3140
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T07:00:00.000Z'),
              value: 5154
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T08:00:00.000Z'),
              value: 6795
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T09:00:00.000Z'),
              value: 5884
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T10:00:00.000Z'),
              value: 5252
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T11:00:00.000Z'),
              value: 5186
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T12:00:00.000Z'),
              value: 5503
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T13:00:00.000Z'),
              value: 5759
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T14:00:00.000Z'),
              value: 6056
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T15:00:00.000Z'),
              value: 6800
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T16:00:00.000Z'),
              value: 7478
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T17:00:00.000Z'),
              value: 8139
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T18:00:00.000Z'),
              value: 7487
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T19:00:00.000Z'),
              value: 5736
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T20:00:00.000Z'),
              value: 4238
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T21:00:00.000Z'),
              value: 3178
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T22:00:00.000Z'),
              value: 2556
            },
            {
              name: 'Unna',
              date: new Date('2016-01-05T23:00:00.000Z'),
              value: 2059
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T00:00:00.000Z'),
              value: 1292
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T01:00:00.000Z'),
              value: 994
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T02:00:00.000Z'),
              value: 971
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T03:00:00.000Z'),
              value: 834
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T04:00:00.000Z'),
              value: 897
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T05:00:00.000Z'),
              value: 1355
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T06:00:00.000Z'),
              value: 2765
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T07:00:00.000Z'),
              value: 5319
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T08:00:00.000Z'),
              value: 6553
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T09:00:00.000Z'),
              value: 6209
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T10:00:00.000Z'),
              value: 5626
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T11:00:00.000Z'),
              value: 5419
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T12:00:00.000Z'),
              value: 6015
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T13:00:00.000Z'),
              value: 6378
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T14:00:00.000Z'),
              value: 6939
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T15:00:00.000Z'),
              value: 7369
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T16:00:00.000Z'),
              value: 7903
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T17:00:00.000Z'),
              value: 8510
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T18:00:00.000Z'),
              value: 8265
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T19:00:00.000Z'),
              value: 6165
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T20:00:00.000Z'),
              value: 4240
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T21:00:00.000Z'),
              value: 3049
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T22:00:00.000Z'),
              value: 2347
            },
            {
              name: 'Unna',
              date: new Date('2016-01-06T23:00:00.000Z'),
              value: 2003
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T00:00:00.000Z'),
              value: 1244
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T01:00:00.000Z'),
              value: 841
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T02:00:00.000Z'),
              value: 682
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T03:00:00.000Z'),
              value: 727
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T04:00:00.000Z'),
              value: 873
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T05:00:00.000Z'),
              value: 1271
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T06:00:00.000Z'),
              value: 3147
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T07:00:00.000Z'),
              value: 5392
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T08:00:00.000Z'),
              value: 7635
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T09:00:00.000Z'),
              value: 6649
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T10:00:00.000Z'),
              value: 5551
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T11:00:00.000Z'),
              value: 5048
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T12:00:00.000Z'),
              value: 5124
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T13:00:00.000Z'),
              value: 5352
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T14:00:00.000Z'),
              value: 6172
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T15:00:00.000Z'),
              value: 6590
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T16:00:00.000Z'),
              value: 7021
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T17:00:00.000Z'),
              value: 7333
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T18:00:00.000Z'),
              value: 7181
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T19:00:00.000Z'),
              value: 6293
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T20:00:00.000Z'),
              value: 4261
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T21:00:00.000Z'),
              value: 3065
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T22:00:00.000Z'),
              value: 2352
            },
            {
              name: 'Unna',
              date: new Date('2016-01-07T23:00:00.000Z'),
              value: 1920
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T00:00:00.000Z'),
              value: 1282
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T01:00:00.000Z'),
              value: 822
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T02:00:00.000Z'),
              value: 715
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T03:00:00.000Z'),
              value: 727
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T04:00:00.000Z'),
              value: 835
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T05:00:00.000Z'),
              value: 1373
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T06:00:00.000Z'),
              value: 3000
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T07:00:00.000Z'),
              value: 5021
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T08:00:00.000Z'),
              value: 6885
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T09:00:00.000Z'),
              value: 6003
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T10:00:00.000Z'),
              value: 5357
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T11:00:00.000Z'),
              value: 5433
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T12:00:00.000Z'),
              value: 6258
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T13:00:00.000Z'),
              value: 7640
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T14:00:00.000Z'),
              value: 8647
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T15:00:00.000Z'),
              value: 8124
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T16:00:00.000Z'),
              value: 8312
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T17:00:00.000Z'),
              value: 7837
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T18:00:00.000Z'),
              value: 7682
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T19:00:00.000Z'),
              value: 6668
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T20:00:00.000Z'),
              value: 5210
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T21:00:00.000Z'),
              value: 3951
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T22:00:00.000Z'),
              value: 2757
            },
            {
              name: 'Unna',
              date: new Date('2016-01-08T23:00:00.000Z'),
              value: 2628
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T00:00:00.000Z'),
              value: 1715
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T01:00:00.000Z'),
              value: 1464
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T02:00:00.000Z'),
              value: 1041
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T03:00:00.000Z'),
              value: 757
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T04:00:00.000Z'),
              value: 726
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T05:00:00.000Z'),
              value: 776
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T06:00:00.000Z'),
              value: 1138
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T07:00:00.000Z'),
              value: 1580
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T08:00:00.000Z'),
              value: 2490
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T09:00:00.000Z'),
              value: 3638
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T10:00:00.000Z'),
              value: 4888
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T11:00:00.000Z'),
              value: 5790
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T12:00:00.000Z'),
              value: 6245
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T13:00:00.000Z'),
              value: 6705
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T14:00:00.000Z'),
              value: 6952
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T15:00:00.000Z'),
              value: 7199
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T16:00:00.000Z'),
              value: 6656
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T17:00:00.000Z'),
              value: 6414
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T18:00:00.000Z'),
              value: 5985
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T19:00:00.000Z'),
              value: 5444
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T20:00:00.000Z'),
              value: 4064
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T21:00:00.000Z'),
              value: 3119
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T22:00:00.000Z'),
              value: 2275
            },
            {
              name: 'Unna',
              date: new Date('2016-01-09T23:00:00.000Z'),
              value: 1948
            }
          ],
          sum: 619497
        },
        {
          key: 'HB-Weserbrücke',
          values: [
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T00:00:00.000Z'),
              value: 1520
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T01:00:00.000Z'),
              value: 966
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T02:00:00.000Z'),
              value: 718
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T03:00:00.000Z'),
              value: 690
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T04:00:00.000Z'),
              value: 828
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T05:00:00.000Z'),
              value: 1434
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T06:00:00.000Z'),
              value: 3945
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T07:00:00.000Z'),
              value: 5799
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T08:00:00.000Z'),
              value: 6711
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T09:00:00.000Z'),
              value: 5546
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T10:00:00.000Z'),
              value: 4938
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T11:00:00.000Z'),
              value: 4858
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T12:00:00.000Z'),
              value: 5691
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T13:00:00.000Z'),
              value: 6376
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T14:00:00.000Z'),
              value: 6910
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T15:00:00.000Z'),
              value: 7219
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T16:00:00.000Z'),
              value: 7231
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T17:00:00.000Z'),
              value: 7429
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T18:00:00.000Z'),
              value: 6739
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T19:00:00.000Z'),
              value: 4814
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T20:00:00.000Z'),
              value: 3523
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T21:00:00.000Z'),
              value: 2823
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T22:00:00.000Z'),
              value: 2501
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-04T23:00:00.000Z'),
              value: 2099
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T00:00:00.000Z'),
              value: 1223
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T01:00:00.000Z'),
              value: 848
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T02:00:00.000Z'),
              value: 717
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T03:00:00.000Z'),
              value: 686
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T04:00:00.000Z'),
              value: 825
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T05:00:00.000Z'),
              value: 1241
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T06:00:00.000Z'),
              value: 3430
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T07:00:00.000Z'),
              value: 4748
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T08:00:00.000Z'),
              value: 5488
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T09:00:00.000Z'),
              value: 4653
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T10:00:00.000Z'),
              value: 4011
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T11:00:00.000Z'),
              value: 3937
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T12:00:00.000Z'),
              value: 3893
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T13:00:00.000Z'),
              value: 4803
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T14:00:00.000Z'),
              value: 5358
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T15:00:00.000Z'),
              value: 6250
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T16:00:00.000Z'),
              value: 6332
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T17:00:00.000Z'),
              value: 6631
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T18:00:00.000Z'),
              value: 6465
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T19:00:00.000Z'),
              value: 4939
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T20:00:00.000Z'),
              value: 3272
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T21:00:00.000Z'),
              value: 2461
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T22:00:00.000Z'),
              value: 2276
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-05T23:00:00.000Z'),
              value: 1948
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T00:00:00.000Z'),
              value: 1760
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T01:00:00.000Z'),
              value: 918
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T02:00:00.000Z'),
              value: 808
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T03:00:00.000Z'),
              value: 768
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T04:00:00.000Z'),
              value: 945
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T05:00:00.000Z'),
              value: 1357
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T06:00:00.000Z'),
              value: 3661
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T07:00:00.000Z'),
              value: 5214
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T08:00:00.000Z'),
              value: 6369
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T09:00:00.000Z'),
              value: 5434
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T10:00:00.000Z'),
              value: 4658
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T11:00:00.000Z'),
              value: 4576
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T12:00:00.000Z'),
              value: 4979
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T13:00:00.000Z'),
              value: 5877
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T14:00:00.000Z'),
              value: 6571
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T15:00:00.000Z'),
              value: 7246
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T16:00:00.000Z'),
              value: 7323
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T17:00:00.000Z'),
              value: 7550
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T18:00:00.000Z'),
              value: 7299
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T19:00:00.000Z'),
              value: 5196
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T20:00:00.000Z'),
              value: 3433
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T21:00:00.000Z'),
              value: 2513
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T22:00:00.000Z'),
              value: 2273
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-06T23:00:00.000Z'),
              value: 2053
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T00:00:00.000Z'),
              value: 1168
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T01:00:00.000Z'),
              value: 796
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T02:00:00.000Z'),
              value: 708
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T03:00:00.000Z'),
              value: 644
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T04:00:00.000Z'),
              value: 750
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T05:00:00.000Z'),
              value: 1257
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T06:00:00.000Z'),
              value: 3633
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T07:00:00.000Z'),
              value: 5523
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T08:00:00.000Z'),
              value: 6966
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T09:00:00.000Z'),
              value: 6069
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T10:00:00.000Z'),
              value: 4985
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T11:00:00.000Z'),
              value: 4613
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T12:00:00.000Z'),
              value: 4938
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T13:00:00.000Z'),
              value: 5637
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T14:00:00.000Z'),
              value: 6344
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T15:00:00.000Z'),
              value: 7060
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T16:00:00.000Z'),
              value: 7445
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T17:00:00.000Z'),
              value: 7802
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T18:00:00.000Z'),
              value: 6611
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T19:00:00.000Z'),
              value: 4638
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T20:00:00.000Z'),
              value: 3008
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T21:00:00.000Z'),
              value: 2328
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T22:00:00.000Z'),
              value: 2121
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-07T23:00:00.000Z'),
              value: 1764
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T00:00:00.000Z'),
              value: 1219
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T01:00:00.000Z'),
              value: 807
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T02:00:00.000Z'),
              value: 687
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T03:00:00.000Z'),
              value: 650
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T04:00:00.000Z'),
              value: 784
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T05:00:00.000Z'),
              value: 1313
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T06:00:00.000Z'),
              value: 3597
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T07:00:00.000Z'),
              value: 5362
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T08:00:00.000Z'),
              value: 6497
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T09:00:00.000Z'),
              value: 5495
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T10:00:00.000Z'),
              value: 4740
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T11:00:00.000Z'),
              value: 4898
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T12:00:00.000Z'),
              value: 5830
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T13:00:00.000Z'),
              value: 7296
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T14:00:00.000Z'),
              value: 8470
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T15:00:00.000Z'),
              value: 9616
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T16:00:00.000Z'),
              value: 9252
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T17:00:00.000Z'),
              value: 8298
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T18:00:00.000Z'),
              value: 7239
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T19:00:00.000Z'),
              value: 6062
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T20:00:00.000Z'),
              value: 4358
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T21:00:00.000Z'),
              value: 3161
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T22:00:00.000Z'),
              value: 2753
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-08T23:00:00.000Z'),
              value: 2352
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T00:00:00.000Z'),
              value: 1578
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T01:00:00.000Z'),
              value: 1012
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T02:00:00.000Z'),
              value: 788
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T03:00:00.000Z'),
              value: 724
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T04:00:00.000Z'),
              value: 734
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T05:00:00.000Z'),
              value: 746
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T06:00:00.000Z'),
              value: 1530
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T07:00:00.000Z'),
              value: 1828
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T08:00:00.000Z'),
              value: 1874
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T09:00:00.000Z'),
              value: 2479
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T10:00:00.000Z'),
              value: 3763
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T11:00:00.000Z'),
              value: 4850
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T12:00:00.000Z'),
              value: 5643
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T13:00:00.000Z'),
              value: 5854
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T14:00:00.000Z'),
              value: 6222
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T15:00:00.000Z'),
              value: 6728
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T16:00:00.000Z'),
              value: 5835
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T17:00:00.000Z'),
              value: 5367
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T18:00:00.000Z'),
              value: 4881
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T19:00:00.000Z'),
              value: 4032
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T20:00:00.000Z'),
              value: 3242
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T21:00:00.000Z'),
              value: 2300
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T22:00:00.000Z'),
              value: 1633
            },
            {
              name: 'HB-Weserbrücke',
              date: new Date('2016-01-09T23:00:00.000Z'),
              value: 1432
            }
          ],
          sum: 569143
        }
      ]
    };
  }
};
</script>
