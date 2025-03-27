import React, { useState, useEffect } from 'react';

export default function ExpensePieChart() {
  // State to track which segment is being hovered
  const [hoveredSegment, setHoveredSegment] = useState(null);
  
  // Sample data - in a real app, this would come from your transactions
  const [chartData, setChartData] = useState([
    { category: 'Housing', percentage: 35, color: '#4F46E5' },
    { category: 'Food', percentage: 20, color: '#10B981' },
    { category: 'Transportation', percentage: 15, color: '#F59E0B' },
    { category: 'Entertainment', percentage: 10, color: '#EF4444' },
    { category: 'Utilities', percentage: 12, color: '#6366F1' },
    { category: 'Other', percentage: 8, color: '#8B5CF6' }
  ]);

  // Load transactions from localStorage and calculate percentages
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      const transactions = JSON.parse(storedTransactions);
      if (transactions.length > 0) {
        // Calculate total amount from all transactions
        const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

        // Group transactions by description and sum their amounts
        const totalsByDescription = {};
        transactions.forEach(transaction => {
          if (!totalsByDescription[transaction.description]) {
            totalsByDescription[transaction.description] = 0;
          }
          totalsByDescription[transaction.description] += transaction.amount;
        });

        // Define colors for the segments
        const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6', '#EC4899', '#0EA5E9'];

        // Build chartData using description as the grouping key
        const newChartData = Object.keys(totalsByDescription).map((description, index) => {
          const amount = totalsByDescription[description];
          const percentage = Math.round((amount / totalAmount) * 100);
          return {
            category: description, // label set to the transaction description
            percentage,
            amount,
            color: colors[index % colors.length]
          };
        });

        // Sort by percentage (highest first)
        newChartData.sort((a, b) => b.percentage - a.percentage);

        setChartData(newChartData);
      }
    }
  }, []);

  // Calculate the SVG parameters for the pie chart
  const radius = 80;
  const centerX = 100;
  const centerY = 100;
  const chartSize = 200;
  
  // Calculate the segments of the pie chart
  const generatePieSegments = () => {
    let startAngle = 0;
    return chartData.map((item, index) => {
      // If the segment is 100%, draw a full circle path
      if (item.percentage === 100) {
        const pathData = `M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 1 1 ${centerX - 0.01} ${
          centerY - radius
        } Z`;
        return {
          path: pathData,
          color: item.color,
          category: item.category,
          percentage: item.percentage,
          index
        };
      }
      
      // Convert percentage to radians for other segments
      const angleInRadians = (item.percentage / 100) * 2 * Math.PI;
      const endAngle = startAngle + angleInRadians;
      
      // Calculate the SVG arc path
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      
      // Determine if the arc should be drawn as a large arc
      const largeArcFlag = item.percentage > 50 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      startAngle = endAngle;
      return {
        path: pathData,
        color: item.color,
        category: item.category,
        percentage: item.percentage,
        index
      };
    });
  };
  
  const pieSegments = generatePieSegments();
  
  // Calculate tooltip position based on angle
  const getTooltipPosition = (percentage, index) => {
    // Calculate the middle angle of the segment
    const totalPercentageBefore = chartData
      .slice(0, index)
      .reduce((sum, item) => sum + item.percentage, 0);
    const middlePercentage = totalPercentageBefore + percentage / 2;
    const angleInRadians = (middlePercentage / 100) * 2 * Math.PI;
    
    // Position the tooltip slightly outside the pie chart
    const tooltipRadius = radius * 1.2;
    const x = centerX + tooltipRadius * Math.cos(angleInRadians - Math.PI / 2);
    const y = centerY + tooltipRadius * Math.sin(angleInRadians - Math.PI / 2);
    
    return { x, y };
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 p-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Expense Breakdown</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Pie Chart */}
        <div className="relative" style={{ width: chartSize, height: chartSize }}>
          <svg width={chartSize} height={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`}>
            {pieSegments.map((segment, index) => (
              <path
                key={index}
                d={segment.path}
                fill={segment.color}
                stroke="#fff"
                strokeWidth="1"
                onMouseEnter={() => setHoveredSegment(segment.index)}
                onMouseLeave={() => setHoveredSegment(null)}
                className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
              />
            ))}
            
            {/* Center circle (optional, for donut chart effect) */}
            <circle cx={centerX} cy={centerY} r={radius * 0.6} fill="white" className="dark:fill-neutral-800" />
            
            {/* Tooltip for hovered segment */}
            {hoveredSegment !== null && (
              (() => {
                const segment = pieSegments[hoveredSegment];
                const position = getTooltipPosition(segment.percentage, hoveredSegment);
                return (
                  <g>
                    <circle cx={position.x} cy={position.y} r="30" fill={segment.color} opacity="0.9" />
                    <text 
                      x={position.x} 
                      y={position.y - 5} 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {segment.percentage}%
                    </text>
                    <text 
                      x={position.x} 
                      y={position.y + 10} 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="9"
                    >
                      {segment.category}
                    </text>
                  </g>
                );
              })()
            )}
            
            {/* Center text showing total */}
            <text 
              x={centerX} 
              y={centerY - 10} 
              textAnchor="middle" 
              className="fill-gray-500 dark:fill-gray-300" 
              fontSize="12"
            >
              Total
            </text>
            <text 
              x={centerX} 
              y={centerY + 10} 
              textAnchor="middle" 
              className="fill-gray-800 dark:fill-white" 
              fontSize="14"
              fontWeight="bold"
            >
              100%
            </text>
          </svg>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 md:mt-0">
          {chartData.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2"
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div 
                className="w-4 h-4 rounded-sm" 
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="text-sm">
                <span className="text-gray-800 dark:text-white">{item.category}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">{item.percentage}%</span>
                {item.amount && (
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    (${item.amount.toFixed(2)})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
