import React, {useEffect, useState, Fragment} from 'react';
import facebookLogo from '../../../../assets/images/dashboard/analyst/facebook.svg';
import {ReactComponent as Dropdown} from '../../../../assets/images/dashboard/analyst/dropdown.svg';
import {Listbox, Transition} from "@headlessui/react";
import {ReactComponent as ArrowUp} from '../../../../assets/images/dashboard/analyst/arrow-up.svg';
import {ReactComponent as ArrowDown} from '../../../../assets/images/dashboard/analyst/arrow-down.svg';

import {Line} from 'react-chartjs-2';

const dataFilterMethod = [
    {name: "This Week"},
    {name: "This Month"},
    {name: "This Year"}
];

const Followers = () => {
    const [selected, setSelected] = useState(dataFilterMethod[0]);

    const [weeklyChartData, setWeeklyChartData] = useState({});
    const [monthlyChartData, setMonthlyChartData] = useState({});
    const [yearlyChartData, setYearlyChartData] = useState({});


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                fontSize: 14,
                ticks: {
                    stepSize: 1000
                },
                grid: {
                    drawBorder: false,
                },
            },
            x: {
                fontSize: 14,
                grid: {
                    display: false,
                },
            }
        },
    }
    //Weekly Chart
    const weeklyChart = () => {
        setWeeklyChartData({
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: '',
                    data: [2000, 2200, 1500, 4000, 5000, 2000, 3000, 2500],
                    borderWidth: 3,
                    borderColor: "#4AD594",
                    backgroundColor: "#4AD594",
                }
            ]

        })
    }

    //Weekly Chart
    const monthlyChart = () => {
        setMonthlyChartData({
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
                {
                    label: '',
                    data: [2000, 2200, 1500, 4000],
                    borderWidth: 3,
                    borderColor: "#4AD594",
                    backgroundColor: "#4AD594",
                }
            ]

        })
    }

    //Yearly Chart
    const yearlyChart = () => {
        setYearlyChartData({
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: '',
                    data: [2000, 2200, 1500, 4000, 5000, 7000, 8000, 1000, 4000, 10000, 3000, 4000],
                    borderWidth: 3,
                    borderColor: "#4AD594",
                    backgroundColor: "#4AD594",
                }
            ]

        })
    }
    useEffect(() => {
        weeklyChart();
        monthlyChart();
        yearlyChart();
    }, []);

    return (
        <div className="p-5 rounded h-full shadow-lg">
            <div className="flex flex-row justify-between items-center mb-6">
                <div className="flex flex-row items-center">
                    <img src={facebookLogo}
                         className=""
                         alt=""/>
                    <div className="flex flex-col pl-2">
                        <div className="paragraph text-secondary">
                            cettireapparels
                        </div>
                        <div className="caption text-text">
                            12,892 Followers
                        </div>
                    </div>
                </div>
                <div className="">
                    {/*List Box*/}
                    <Listbox value={selected}
                             onChange={setSelected}>
                        {({open}) => (
                            <>
                                <div className="relative">
                                    <Listbox.Button className="relative w-32 p-3 pr-10 text-left rounded border shadow-sm cursor-pointer focus:outline-none">
                                        <span className="block truncate caption text-secondary">{selected.name}</span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <Dropdown/>
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options
                                            static
                                            className="absolute w-full py-1 mt-1 border overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 caption"
                                        >
                                            {dataFilterMethod.map((method, methodIdx) => (
                                                <Listbox.Option
                                                    key={methodIdx}
                                                    className={({active}) =>
                                                        `${
                                                            active
                                                                ? "text-amber-900 bg-amber-100"
                                                                : "text-gray-900"
                                                        }
                                                        cursor-pointer select-none relative py-2 pl-4 pr-4`
                                                    }
                                                    value={method}
                                                >
                                                    {({selected, active}) => (
                                                        <>
                                                          <span
                                                              className={`${
                                                                  selected ? "font-medium" : "font-normal"
                                                              } block truncate`}
                                                          >
                                                            {method.name}
                                                          </span>
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>
            </div>
            <div className="w-full">
                {selected === dataFilterMethod[0]
                    ? <Line data={weeklyChartData}
                            options={options}/>
                    : (selected === dataFilterMethod[1]
                            ? <Line data={monthlyChartData}
                                    options={options}/>
                            : <Line data={yearlyChartData}
                                    options={options}/>
                    )
                }
            </div>
            <div className="w-full mt-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1 p-4 bg-primarygray rounded border shadow-sm">
                        <div className="flex flex-row mb-4 items-center">
                            <ArrowUp/>
                            <div className="heading-4 text-secondary pl-1">
                                54.4%
                            </div>
                        </div>
                        <div className="caption text-secondary">
                            Followers Growth - 1 month
                        </div>
                    </div>
                    <div className="col-span-1 p-4 bg-primarygray  rounded border shadow-sm">
                        <div className="flex flex-row mb-4  items-center">
                            <ArrowDown/>
                            <div className="heading-4 text-secondary pl-1">
                                2.4%
                            </div>
                        </div>
                        <div className="caption text-secondary">
                            Followers Growth - 3 months
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Followers;