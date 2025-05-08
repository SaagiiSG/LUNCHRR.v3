import { Purchase } from '../pages/Dashboard';

// Process purchase history to get daily revenue
export const getDailyRevenue = (purchaseHistory: Purchase[]) => {
  const dailyData: { [key: string]: number } = {};
  
  purchaseHistory.forEach(purchase => {
    const date = new Date(purchase.timestamp);
    const dateStr = date.toISOString().split('T')[0];
    
    if (!dailyData[dateStr]) {
      dailyData[dateStr] = 0;
    }
    
    // Calculate transaction amount
    const amount = purchase.previousBalance - purchase.newBalance;
    dailyData[dateStr] += amount;
  });
  
  // Convert to array format for chart
  return Object.entries(dailyData)
    .map(([date, amount]) => ({
      date,
      amount
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

// Process purchase history to get top selling items
export const getTopItems = (purchaseHistory: Purchase[]) => {
  const itemData: { [key: string]: number } = {};
  
  purchaseHistory.forEach(purchase => {
    purchase.items.forEach(item => {
      if (!item.name) return;
      
      if (!itemData[item.name]) {
        itemData[item.name] = 0;
      }
      
      const quantity = item.quantity || 1;
      itemData[item.name] += quantity;
    });
  });
  
  // Convert to array format for chart
  return Object.entries(itemData)
    .map(([name, count]) => ({
      name,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Get top 10 items
};

// Process attendance data for the chart
export const processAttendanceData = (attendance: any[]) => {
  return attendance.map(item => ({
    date: item.class,
    count: item.present + item.absent
  }));
};

// Format month-year string for display
const formatMonthYear = (monthYear: string) => {
  const [year, month] = monthYear.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
};

// Process monthly attendance data for a specific class
export const getMonthlyAttendance = (attendance: any[], selectedClass: string) => {
  // Filter attendance data for the selected class
  const classData = attendance.filter(item => item.class === selectedClass);
  
  // Group by month
  const monthlyData: { [key: string]: { present: number; absent: number } } = {};
  
  classData.forEach(item => {
    const date = new Date(item.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { present: 0, absent: 0 };
    }
    
    monthlyData[monthYear].present += item.present;
    monthlyData[monthYear].absent += item.absent;
  });
  
  // Convert to array format for chart
  return Object.entries(monthlyData)
    .map(([date, data]) => ({
      date,
      present: data.present,
      absent: data.absent
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}; 