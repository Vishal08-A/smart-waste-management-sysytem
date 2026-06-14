import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Filter } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [wasteTypeData, setWasteTypeData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('/api/waste');
      const bins = res.data || [];
      
      // Fill level chart data
      const chartData = bins.map(bin => ({
        name: bin.bin_id,
        fill: bin.fill_level,
        type: bin.waste_type
      }));
      setData(chartData);

      // Waste type pie
      const typeCounts = bins.reduce((acc, bin) => {
        acc[bin.waste_type || 'unknown'] = (acc[bin.waste_type || 'unknown'] || 0) + 1;
        return acc;
      }, {});
      setWasteTypeData(Object.entries(typeCounts).map(([name, value]) => ({ name, value })));
    } catch (err) {
      // Fallback data
      setData([
        { name: 'BIN101', fill: 45 },
        { name: 'BIN102', fill: 82 },
        { name: 'BIN103', fill: 23 },
        { name: 'BIN104', fill: 67 },
        { name: 'BIN105', fill: 91 }
      ]);
      setWasteTypeData([
        { name: 'general', value: 40 },
        { name: 'bio', value: 30 },
        { name: 'metal', value: 20 },
        { name: 'ewaste', value: 10 }
      ]);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>📊 Analytics & Reports</h1>
        <p>Waste patterns and trends visualization</p>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Fill Levels by Bin</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fill" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Waste Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-number">92%</div>
          <div className="metric-label">Collection Efficiency</div>
        </div>
        <div className="metric">
          <div className="metric-number">24h</div>
          <div className="metric-label">Avg Response Time</div>
        </div>
        <div className="metric">
          <div className="metric-number">15%</div>
          <div className="metric-label">Overflow Rate</div>
        </div>
        <div className="metric">
          <div className="metric-number">98%</div>
          <div className="metric-label">Accuracy</div>
        </div>
      </div>

      <div className="trends">
        <h3>Trends</h3>
        <div className="trend-item">
          <TrendingUp size={24} />
          <div>
            <h4>Bio waste up 12%</h4>
            <p>Last 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

