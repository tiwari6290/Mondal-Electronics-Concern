import "./Report.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Thu", value: 0 },
  { day: "Fri", value: 0 },
  { day: "Sat", value: 0 },
  { day: "Sun", value: 0 },
  { day: "Mon", value: 0 },
  { day: "Tue", value: 0 },
  { day: "Wed", value: 0 }
];

const Report = () => {
  return (
    <div className="report">

      {/* TITLE */}
      <div className="report-header">
        <h3>Sales Report - 26 Mar 2026 to 01 Apr 2026</h3>
      </div>

      <div className="report-body">

        {/* CHART */}
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT PANEL */}
        <div className="report-side">

          <select className="report-select">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          <div className="report-stats">
            <p>Last 7 days sales</p>
            <h2>₹ 0</h2>
          </div>

          <div className="report-stats">
            <p>Invoices Made</p>
            <h2>0</h2>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Report;