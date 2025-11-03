
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HistoricalData } from '../types';

interface PerformanceChartProps {
  data: HistoricalData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
          <XAxis dataKey="date" tick={{ fill: 'currentColor', fontSize: 12 }} />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fill: 'currentColor', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.9)', 
              borderColor: '#334155', 
              color: '#e2e8f0',
              borderRadius: '0.5rem'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="value" name="NAV" stroke="#f97316" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
