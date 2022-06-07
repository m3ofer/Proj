import React from 'react';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import './Chart.css'

const Charts = () => {
    const pdata = [
        {
            day: '12/04',
            temperature: 52,
            humidity:11
        },
        {
            day: '13/04',
            temperature: 15,
            humidity:30
        },
        {
            day: '15/04',
            temperature: 5,
            humidity:20
        },
        {
            day: '16/04',
            temperature: 10,
            humidity:12
        },
        {
            day: '20/5',
            temperature: 9,
            humidity:2
        },
        {
            day: '20/6',
            temperature: 10,
            humidity:12

        }
        
    ];
  
   
    return(

       <>
             
                {/*12/04 because we are testing on thr current day*/}
                 {(pdata.find(a=>a.day==="12/04").temperature>50) &&
                    <div className='div-button'>
                    <button className='button'>Turn off</button>
                </div>
                }
                
                <div className='center'>
                <ResponsiveContainer width="99%"  aspect={3}>
                    <LineChart    data={pdata} width={300}  margin={{ right: 230 }}
                      
                    >
                        <CartesianGrid />
                        <XAxis dataKey="day" 
                            interval={'preserveStartEnd'} />
                        <YAxis></YAxis>
                        <Legend />
                        <Tooltip />
                        <Line dataKey="temperature"
                            stroke="blue" activeDot={{ r: 8 }} />
                        <Line dataKey="humidity"
                            stroke="grey" activeDot={{ r: 8 }} />
                    </LineChart>
                    </ResponsiveContainer>
               
                </div>
        </>
        
    );

}
export default Charts;

