import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Utensils,
  CreditCard,
  AlertTriangle,
  ChevronRight,
  LayoutDashboard,
  Clock,
  BarChart,
  PieChart,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Navbar from '../components/navbar/Navbar';
import Details from '../components/details';
import { mockData } from '../pages/mockData';
import RevenueChart from '../components/charts/RevenueChart';
import AttendanceChart from '../components/charts/AttendanceChart';
import TopItemsChart from '../components/charts/TopItemsChart';
import MonthlyAttendanceChart from '../components/charts/MonthlyAttendanceChart';
import { getDailyRevenue, getTopItems, processAttendanceData, getMonthlyAttendance } from '../utils/dataProcessing';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock API fetch (replace with real API later)
const fetchUserData = async () => {
  try {
    const response = await fetch('http://localhost:8080/data');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log("Received users data:", json);
    return json[0] || {
      _id: '67f8905f8a9cd7293b363cbf',
      name: 'Tuguldur',
      card_ID: '0323271427',
      balance: 98017,
      purchaseHistory: [
        {
          _id: '67f896918a9cd7293b363cfd',
          items: [{ name: "Lunch", price: 983, quantity: 1 }],
          timestamp: '2025-04-11T04:12:01.635+00:00',
          previousBalance: 100000,
          newBalance: 99017,
        },
        {
          _id: '67f8ae1ffa6cfe6c461ca868',
          items: [
            { name: "Snack", price: 1000, quantity: 2 },
            { name: "Drink", price: 500, quantity: 1 },
          ],
          timestamp: '2025-04-11T05:52:31.611+00:00',
          previousBalance: 99017,
          newBalance: 98017,
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      _id: '67f8905f8a9cd7293b363cbf',
      name: 'Tuguldur',
      card_ID: '0323271427',
      balance: 98017,
      purchaseHistory: [
        {
          _id: '67f896918a9cd7293b363cfd',
          items: [{ name: "Lunch", price: 983, quantity: 1 }],
          timestamp: '2025-04-11T04:12:01.635+00:00',
          previousBalance: 100000,
          newBalance: 99017,
        },
        {
          _id: '67f8ae1ffa6cfe6c461ca868',
          items: [
            { name: "Snack", price: 1000, quantity: 2 },
            { name: "Drink", price: 500, quantity: 1 },
          ],
          timestamp: '2025-04-11T05:52:31.611+00:00',
          previousBalance: 99017,
          newBalance: 98017,
        },
      ],
    };
  }
};

// Types
interface Purchase {
  _id: string;
  items: Array<{ name?: string; price?: number; quantity?: number }>;
  timestamp: string;
  previousBalance: number;
  newBalance: number;
}

interface UserData {
  _id: string;
  name: string;
  card_ID: string;
  balance: number;
  purchaseHistory: Purchase[];
}

interface Student {
  name: string;
  ateLunch: boolean;
}

interface ClassAttendance {
  class: string;
  students: Student[];
  monthlyAte: number;
}

// Constants
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const SCHOOL_CLASSES = [
  'all classes',
  '6.1',
  '6.2',
  '7.1',
  '7.2',
  '8.1',
  '8.2',
  '9.1',
  '9.2',
  '10.1',
  '10.2',
  '11.1',
  '11.2',
  '12.1',
  '12.2',
];

// Mock student data
const expandedAttendance = SCHOOL_CLASSES.slice(1).map((cls) => {
  const existing = mockData.todaysAttendance.find((c) => c.class === cls);
  return (
    existing || {
      class: cls,
      present: Math.floor(Math.random() * 30) + 20,
      absent: Math.floor(Math.random() * 10),
    }
  );
});

const studentAttendance: Record<string, ClassAttendance> = expandedAttendance
  .map((cls) => ({
    class: cls.class,
    students: [
      ...Array.from({ length: cls.present }, (_, i) => ({
        name: `Student ${i + 1} ${cls.class}`,
        ateLunch: true,
      })),
      ...Array.from({ length: cls.absent }, (_, i) => ({
        name: `Student ${cls.present + i + 1} ${cls.class}`,
        ateLunch: false,
      })),
    ],
    monthlyAte: Math.floor(cls.present * 0.9 * 20),
  }))
  .reduce((acc, cls) => ({ ...acc, [cls.class]: cls }), {} as Record<string, ClassAttendance>);

const Dashboard = ({ loggedIn }: { loggedIn: boolean }) => {
  const currentDate = new Date();
  const [filters, setFilters] = useState({
    class: 'all classes',
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
    date: currentDate,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCharts, setShowCharts] = useState(true);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData();
        setUserData(data);
      } catch (err) {
        setError('Failed to load transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Calculate attendance rate and totals
  const totalPresent = expandedAttendance.reduce((sum, cls) => sum + cls.present, 0);
  const totalStudents = expandedAttendance.reduce((sum, cls) => sum + cls.present + cls.absent, 0);
  const attendanceRate = ((totalPresent / totalStudents) * 100).toFixed(1);

  // Process data for charts
  const dailyRevenueData = userData ? getDailyRevenue(userData.purchaseHistory) : [];
  const topItemsData = userData ? getTopItems(userData.purchaseHistory) : [];
  const attendanceData = processAttendanceData(expandedAttendance);

  // Handlers
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, class: e.target.value }));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleCharts = () => {
    setShowCharts(!showCharts);
  };

  // Filter attendance
  const filteredClasses =
    filters.class === 'all classes' ? SCHOOL_CLASSES.slice(1) : [filters.class];

  // Estimate transaction amount
  const calculateTransactionAmount = (purchase: Purchase, index: number) => {
    if (purchase.newBalance !== undefined) {
      return purchase.previousBalance - purchase.newBalance;
    }
    if (purchase.items.length > 0 && purchase.items.every((item) => item.price)) {
      return purchase.items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    }
    const nextPurchase = userData?.purchaseHistory[index + 1];
    if (nextPurchase) {
      return purchase.previousBalance - nextPurchase.previousBalance;
    }
    return userData ? purchase.previousBalance - userData.balance : 0;
  };

  // Data for class visualization
  const getClassChartData = (className: string) => {
    if (className === 'all classes') {
      return {
        labels: ['Ate Lunch', 'Did Not Eat'],
        datasets: [
          {
            label: 'All Classes',
            data: [
              expandedAttendance.reduce(
                (sum, cls) =>
                  sum + studentAttendance[cls.class].students.filter((s) => s.ateLunch).length,
                0
              ),
              expandedAttendance.reduce(
                (sum, cls) =>
                  sum + studentAttendance[cls.class].students.filter((s) => !s.ateLunch).length,
                0
              ),
            ],
            backgroundColor: ['#10B981', '#EF4444'],
            borderColor: ['#10B981', '#EF4444'],
            borderWidth: 1,
          },
        ],
      };
    }

    const classData = studentAttendance[className];
    return {
      labels: ['Ate Lunch', 'Did Not Eat'],
      datasets: [
        {
          label: className,
          data: [
            classData.students.filter((s) => s.ateLunch).length,
            classData.students.filter((s) => !s.ateLunch).length,
          ],
          backgroundColor: ['#10B981', '#EF4444'],
          borderColor: ['#10B981', '#EF4444'],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <main className="w-full h-screen flex text-slate-50">
      <Navbar activebtnNumber={1} loggedIn={loggedIn} />
      <motion.article
        initial={{ opacity: 0, background: '#f5f5f5' }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 0.6 }}
        className="w-full rounded-tl-3xl py-4 px-4 text-white overflow-auto flex flex-col gap-4"
      >
        <Details pageName="Lunch Dashboard" pagePath="/dashboard" />

        {/* Dashboard Header */}
        <motion.div
          layout
          initial={{ height: '72px', borderRadius: '1rem' }}
          animate={{ height: 'fit-content', borderRadius: '1rem' }}
          className="w-full h-fit bg-gray-800 py-4"
        >
          <motion.div layout className="flex w-full justify-between items-center text-lg py-1 px-4 text-white">
            <motion.div layout className="flex gap-4 items-center">
              <LayoutDashboard className="text-emerald-400" />
              <p className="text-2xl font-semibold">Lunch Dashboard</p>
              <motion.div className="flex gap-2">
                <div className="flex h-14 items-end w-38 border-b-2 relative border-neutral-700">
                  <select
                    value={filters.class}
                    onChange={handleClassChange}
                    className="appearance-none flex flex-row gap-1 pl-1 text-md py-2 w-32 outline-none bg-transparent cursor-pointer"
                    aria-label="Select class"
                  >
                    {SCHOOL_CLASSES.map((classOption) => (
                      <option key={classOption} value={classOption} className="text-gray-900 font-small">
                        {classOption}
                      </option>
                    ))}
                  </select>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-90 absolute right-0 bottom-1"
                  >
                    <path
                      d="M16.904 13.16L19.026 11.04L30.584 22.594C30.7703 22.7791 30.9181 22.9993 31.019 23.2418C31.1199 23.4843 31.1719 23.7443 31.1719 24.007C31.1719 24.2696 31.1199 24.5297 31.019 24.7722C30.9181 25.0147 30.7703 25.2348 30.584 25.42L19.026 36.98L16.906 34.86L27.754 24.01L16.904 13.16"
                      fill="#f5f5f5"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleToggleCharts}
                variant="ghost"
                size="icon"
                aria-label={showCharts ? 'Hide charts' : 'Show charts'}
              >
                <BarChart className={`size-6 ${showCharts ? 'text-emerald-400' : ''}`} />
              </Button>
              <Button
                onClick={toggleExpand}
                variant="ghost"
                size="icon"
                aria-label={isExpanded ? 'Collapse dashboard' : 'Expand dashboard'}
              >
                <ChevronRight
                  className={`size-6 transition-transform ${isExpanded ? 'rotate-270' : 'rotate-90'}`}
                />
              </Button>
            </div>
          </motion.div>

          {isExpanded && (
            <div className="px-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SummaryCard
                  icon={<Utensils className="h-6 w-6" />}
                  title="Meals Served Today"
                  value={mockData.summary.mealsServedToday}
                  description={`${attendanceRate}% attendance`}
                />
                <SummaryCard
                  icon={<AlertTriangle className="h-6 w-6" />}
                  title="Outstanding Balances"
                  value={`${(mockData.summary.outstandingBalances / 1000000).toFixed(1)}M ₮`}
                  description="Unpaid"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Charts Section */}
        {showCharts && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {userData && userData.purchaseHistory.length > 0 ? (
              <>
                <RevenueChart data={dailyRevenueData} />
                <TopItemsChart data={topItemsData} />
                <AttendanceChart data={attendanceData} />
              </>
            ) : (
              <div className="col-span-3 bg-gray-800 p-4 rounded-lg text-center">
                <p className="text-gray-400">No data available for charts</p>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <section className="w-full flex-1 mb-3 flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full">
            {/* Today's Attendance */}
            <Card className="bg-gray-800 flex flex-col h-full lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CalendarIcon className="h-5 w-5" />
                  Today's Attendance by Class
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {/* Visualization for Selected Class */}
                <div className="mb-4">
                  <Bar
                    data={getClassChartData(filters.class)}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'top' },
                        title: {
                          display: true,
                          text: `Attendance for ${filters.class}`,
                          color: '#fff',
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: { color: '#fff' },
                          grid: { color: '#4B5563' },
                        },
                        x: {
                          ticks: { color: '#fff' },
                          grid: { color: '#4B5563' },
                        },
                      },
                    }}
                  />
                </div>
                {/* Attendance List */}
                <Accordion type="single" collapsible className="w-full">
                  {filteredClasses.map((classOption) => {
                    const classData = studentAttendance[classOption];
                    return (
                      <AccordionItem key={classOption} value={classOption} className="border-gray-700">
                        <AccordionTrigger className="text-white hover:text-emerald-400">
                          <div className="flex justify-between w-full pr-4">
                            <span>{classOption}</span>
                            <span className="text-emerald-400">
                              {classData.students.filter((s) => s.ateLunch).length} / {classData.students.length}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {classData.students.map((student, index) => (
                              <div
                                key={index}
                                className={`p-2 rounded ${student.ateLunch ? 'bg-emerald-900/20' : 'bg-red-900/20'}`}
                              >
                                {student.name} - {student.ateLunch ? 'Ate' : 'Did not eat'}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="bg-gray-800 flex flex-col h-full lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                {loading ? (
                  <p className="text-white">Loading transactions...</p>
                ) : error ? (
                  <p className="text-red-400">{error}</p>
                ) : userData && userData.purchaseHistory.length > 0 ? (
                  userData.purchaseHistory.map((txn, index) => (
                    <div key={txn._id} className="text-sm text-white border-b border-gray-700 pb-2">
                      <div className="flex justify-between">
                        <span>{userData.name}</span>
                        <span>{calculateTransactionAmount(txn, index)}₮</span>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {new Date(txn.timestamp).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true,
                        })}{' '}
                        • Card
                      </div>
                      {txn.items && txn.items.length > 0 && (
                        <div className="mt-1 text-xs text-gray-300">
                          {txn.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex justify-between">
                              <span>
                                {item.name}
                                {item.quantity && item.quantity > 1 ? ` (x${item.quantity})` : ''}
                              </span>
                              <span>{item.price ? `${item.price}₮` : ''}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-1 text-xs text-gray-400">
                        Balance: {txn.previousBalance}₮ → {txn.newBalance}₮
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No recent transactions available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </motion.article>
    </main>
  );
};

// Summary Card Component
const SummaryCard = ({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
}) => (
  <Card className="bg-gray-700">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-xl font-bold text-white">{value}</div>
      <p className="text-xs text-gray-400">{description}</p>
    </CardContent>
  </Card>
);

export default Dashboard;