import {LineChart, XAxis, YAxis, Tooltip, Line, BarChart, Bar} from "recharts";

function RenderCharts({chartData, sortMode}) {

  //formatted Dates
  function formatDate(dateString){
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2,"0");
    const month = date.toLocaleString("en", {month: "short"}).toUpperCase();
    return `${day} ${month}`
  }

  //formatting numbers into L/K
  function formatNumber(num){
    if (num === undefined || num === null) return '0';
    if(num >= 100000) return (num/100000).toFixed(1) + "L";
    if(num >= 1000) return (num/1000).toFixed(1) + "K";
    return num
  }

  if (!chartData || chartData.length === 0) {
    return <div className="text-white text-center p-10">No chart data available.</div>;
  }

  //Create data for charts from the new prop
  const barChartData = chartData.slice(-10).map(d => ({   //last 10 days
    ...d, date: formatDate(d.date)
  }))
  const lineChartData = chartData.map(d => ({...d, date: formatDate(d.date)}));

  //custom colors for bar graph
  const customColors = {
    confirmed: "#9A0E31",
    active: "#0A4FA0",
    recovered: "#216837",
    deceased: "#474C57",
    tested: "#9673B9"
  }

  const chartMetrics = [
    { dataKey: 'confirmed', color: '#FF073A', bgColor: '#331427', name: 'Confirmed' },
    { dataKey: 'active', color: '#007BFF', bgColor: '#132240', name: 'Total Active' },
    { dataKey: 'recovered', color: '#27A243', bgColor: '#182829', name: 'Recovered' },
    { dataKey: 'deceased', color: '#6C757D', bgColor: '#1C1C2B', name: 'Deceased' },
    { dataKey: 'tested', color: '#9673B9', bgColor: '#230F41', name: 'Tested' },
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <BarChart width={1032} height={431} data={barChartData}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: customColors[sortMode], fontSize: 16, fontWeight: 500}} />
          <Bar
            dataKey={sortMode}
            fill={customColors[sortMode]}
            className="bar"
            barSize={60}
            radius={[8, 8, 0, 0]}
            label={({ x, y, value }) => (
                <text
                    x={x + 30} // adjust horizontal position
                    y={y - 10} // move above the bar
                    fill={customColors[sortMode]} // custom color
                    fontSize={16}
                    fontWeight={500}
                    textAnchor="middle"
                    >
                    {`${formatNumber(value)}`}
                </text>
            )}
          />
        </BarChart>
      </div>

      <div className="p-24">
        <h1 className="text-white font-semibold text-[32px] pr-30 pb-15">Daily Spread Trends</h1>
        <div>
          {chartMetrics.map(metric => (
            <div key={metric.dataKey} className="App rounded-lg pb-7">
              <LineChart
                width={1146}
                height={328}
                data={lineChartData}
                style={{ backgroundColor: metric.bgColor, borderRadius: "12px" }}
                margin={{ top: 50, right: 70, left: 0, bottom: 20 }}
              >
                <XAxis
                  dataKey="date"
                  stroke={metric.color}
                  tick={{ fill: metric.color, fontSize: 12, fontWeight: 500 }}
                  strokeWidth={2}
                />
                <YAxis
                  stroke={metric.color}
                  tick={{ fill: metric.color, fontSize: 12, fontWeight: 500 }}
                  tickFormatter={formatNumber}
                  strokeWidth={2}
                />
                <text x={1100} y={30} textAnchor="end" fill={metric.color} fontWeight="bold" fontSize={14}>
                  {metric.name}
                </text>
                <Tooltip
                  cursor={{ stroke: metric.color }}
                  contentStyle={{ backgroundColor: "white", border: "none", borderRadius: "8px" }}
                  labelStyle={{ color: metric.color }}
                  itemStyle={{ color: metric.color }}
                />
                <Line
                  type="monotone"
                  dataKey={metric.dataKey}
                  stroke={metric.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: metric.color }}
                  activeDot={false}
                />
              </LineChart>
            </div>
          ))}
         </div> 
      </div>
    </div>
  );
}

export default RenderCharts;