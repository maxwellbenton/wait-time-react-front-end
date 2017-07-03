import React, {Component} from 'react'
import {Line} from 'react-chartjs'

export default class Chart extends Component {
    renderData() {
        var chartData = this.props.store.wait_times.map(wt => {
            return {[`${wt.updated_at.split(/-|T|:/)[3]}`]: wt.wait_time/1000
        }})
            var hoursCollection = {'00':[0,0],'01':[0,0],'02':[0,0],'03':[0,0],'04':[0,0],'05':[0,0],'06':[0,0],'07':[0,0],'08':[0,0],'09':[0,0],'10':[0,0],'11':[0,0],'12':[0,0],'13':[0,0],'14':[0,0],'15':[0,0],'16':[0,0],'17':[0,0],'18':[0,0],'19':[0,0],'20':[0,0],'21':[0,0],'22':[0,0],'23':[0,0]}
            for(var i = 0; i < chartData.length; i++) {
                for(var key in chartData[i]) {
                    hoursCollection[key] = [hoursCollection[key][0]+chartData[i][key],hoursCollection[key][1]+1]
                }
            }
            var dataPoints = []
            for(var e in hoursCollection) {
                if(hoursCollection[e][1] !== 0) {
                    hoursCollection[e] = hoursCollection[e][0]/hoursCollection[e][1]
                } else {
                    hoursCollection[e] = 0
                }
            }
            ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'].map(hour => dataPoints.push(hoursCollection[hour]))
        
        return ({
            labels: [
                "00",
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23"
                
            ],
            datasets: [
                {
                data: dataPoints
                }
            ]
            })
    }

    renderOptions() {
        return ({
            responsive: true,
            title: {
                display: true,
                text: 'Custom Chart Title'
            }
        })
    }
    render() {
        return (
            <div>
                <Line data={this.renderData()} options={this.renderOptions()} />
            </div>
        )
    }
}
