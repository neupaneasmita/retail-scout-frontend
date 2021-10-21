import React, {useEffect, useState} from 'react';
import {Radar} from 'react-chartjs-2';



const SocialGrowth = () => {
    //const [show, setShow] = useState(false);

    const [chartData, setChartData] = useState({});

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        },
        scale: {
            ticks: {
                beginAtZero: true,
                min: 0,
                stepSize: 20
            },
        },
    }

    const chart = () => {
        setChartData({
            labels: ["Twitter", "Facebook", "LinkedIn", "Instagram", "Youtube"],
            datasets: [
                {
                    label: '',
                    data: [100, 100, 100, 0, 0],
                    borderWidth: 2,
                    borderColor: "rgba(74,213,148,0.4)",
                    backgroundColor: "rgba(74,213,148,0.4)",
                }
            ]

        })
    }

    useEffect(() => {
        chart()
    }, []);

    return (
        <div className="p-5 rounded h-full shadow-lg">
            <div className="flex flex-row justify-between items-center mb-6">
                <div className="heading-5 text-secondary">
                    Social Growth
                </div>
                <div className="">
                    {/*List Box*/}
                </div>
            </div>
            <div className="w-full">
                <div className="w-3/4 mx-auto">
                    <Radar data={chartData} options={options}/>
                </div>
            </div>

        </div>
    )
}

export default SocialGrowth;