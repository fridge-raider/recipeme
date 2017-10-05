export default function getCategoryDeficientChart(deficits) {

       const avgDailyConsumption = []
       const dailyRecommendations = []

       console.log('deficits', deficits)
       // for every item in deficits, add to the consumption and rec arrays
       for (let category in deficits) {

          avgDailyConsumption.push(deficits[category][0])
          dailyRecommendations.push(deficits[category][1])
       }


       avgDailyConsumption.unshift('Avg Daily Consumption')
       dailyRecommendations.unshift('Recommended Daily Values')

       console.log('avg consumption', avgDailyConsumption)

       const chartObj = {
        // data: {
        //   columns: [
        //      avgDailyConsumption,
        //      dailyRecommendations
        //   ],
        //   type: 'bar'
        // },
        // bar: {
        //   width: {
        //       ratio: 0.5 // this makes bar width 50% of length between ticks
        //   }
        data: {
          columns: [
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 130, 100, 140, 200, 150, 50]
          ],
          type: 'bar'
      },
      bar: {
          width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
          }
          // or
          //width: 100 // this makes bar width 100px
      }
      }


     return chartObj


}
