import React, { useState } from 'react';
import { Download, FileText, Calendar, Printer } from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30days');

  const reports = [
    { name: 'Daily Summary', format: 'PDF', date: '2024-03-17' },
    { name: 'Weekly Analytics', format: 'Excel', date: '2024-Mar-11' },
    { name: 'Monthly Report', format: 'PDF', date: '2024-Feb' },
    { name: 'Route Efficiency', format: 'PDF', date: '2024-Mar' }
  ];

  const exportReport = (report) => {
    // Placeholder download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${report.name.replace(/ /g, '_')}.${report.format.toLowerCase()}`;
    link.click();
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>📄 Reports & Exports</h1>
        <p>Generate and download performance reports</p>
      </div>

      <div className="reports-controls">
        <div className="date-selector">
          <Calendar size={20} />
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="today">Today</option>
            <option value="7days">7 Days</option>
            <option value="30days">30 Days</option>
            <option value="90days">90 Days</option>
          </select>
        </div>
        <div className="generate-section">
          <button className="generate-btn">
            <TrendingUp size={20} />
            Generate New Report
          </button>
        </div>
      </div>

      <div className="reports-grid">
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <div className="report-header">
              <FileText size={32} />
              <div>
                <h3>{report.name}</h3>
                <p>{report.date} • {report.format}</p>
              </div>
            </div>
            <div className="report-actions">
              <button onClick={() => exportReport(report)} className="btn download">
                <Download size={18} />
                Download
              </button>
              <button className="btn print">
                <Printer size={18} />
                Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;

