import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Utensils, 
  CreditCard, 
  AlertTriangle, 
  ChevronRight, 
  LayoutDashboard 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';
import Navbar from '../components/navbar/Navbar';
import Details from '../components/details';
import { mockData } from '../pages/mockData';
import { Clock } from 'lucide-react';

// Constants
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SCHOOL_CLASSES = [
  "all classes", "6.1", "6.2", "7.1", "7.2", "8.1", "8.2", 
  "9.1", "9.2", "10.1", "10.2", "11.1", "11.2", "12.1", "12.2"
];

// Mock student data aligned with 14 classes
const expandedAttendance = SCHOOL_CLASSES.slice(1).map(cls => {
  const existing = mockData.todaysAttendance.find(c => c.class === cls);
  return existing || { class: cls, present: Math.floor(Math.random() * 30) + 20, absent: Math.floor(Math.random() * 10) };
});
const studentAttendance = expandedAttendance.map(cls => ({
  class: cls.class,
  students: Array.from({ length: cls.present }, (_, i) => ({
    name: `Student ${i + 1} ${cls.class}`,
    ateLunch: true
  })).concat(Array.from({ length: cls.absent }, (_, i) => ({
    name: `Student ${cls.present + i + 1} ${cls.class}`,
    ateLunch: false
  }))),
  monthlyAte: Math.floor(cls.present * 0.9 * 20) // Mock monthly data
})).reduce((acc, cls) => ({ ...acc, [cls.class]: cls }), {});

const Dashboard = ({ loggedIn }) => {
  const currentDate = new Date();
  const [filters, setFilters] = React.useState({
    class: "all classes",
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
    date: currentDate
  });
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Calculate attendance rate and totals
  const totalPresent = expandedAttendance.reduce((sum, cls) => sum + cls.present, 0);
  const totalStudents = expandedAttendance.reduce((sum, cls) => sum + cls.present + cls.absent, 0);
  const attendanceRate = ((totalPresent / totalStudents) * 100).toFixed(1);

  // Handlers
  const handleClassChange = (e) => {
    setFilters(prev => ({ ...prev, class: e.target.value }));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Filter attendance based on selected class
  const filteredClasses = filters.class === "all classes" 
    ? SCHOOL_CLASSES.slice(1) 
    : [filters.class];

  return (
    <main className='w-full h-screen flex text-slate-50'>
      <Navbar activebtnNumber={1} loggedIn={loggedIn} />
      
      <motion.article 
        initial={{ opacity: 0, background: "#f5f5f5" }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 0.6 }}
        className='w-full rounded-tl-3xl py-4 px-4 text-white overflow-auto flex flex-col gap-4'
      >
        <Details pageName="Lunch Dashboard" pagePath="/dashboard" />
        
        {/* Dashboard Header */}
        <motion.div 
          layout
          initial={{ height: "72px", borderRadius: "1rem" }}
          animate={{ height: "fit-content", borderRadius: "1rem" }}
          className='w-full h-fit bg-gray-800 py-4'
        >
          <motion.div layout className='flex w-full justify-between items-center text-lg py-1 px-4 text-white'>
            <motion.div layout className='flex gap-4 items-center'>
              <LayoutDashboard className='text-emerald-400' />
              <p className='text-2xl font-semibold'>Lunch Dashboard</p>
              
              <motion.div className='flex gap-2'>
                <div className='flex h-14 items-end w-38 border-b-2 relative border-neutral-700'>
                  <select 
                    value={filters.class}
                    onChange={handleClassChange}
                    className='appearance-none flex flex-row gap-1 pl-1 text-md py-2 w-32 outline-none bg-transparent cursor-pointer'
                    aria-label="Select class"
                  >
                    {SCHOOL_CLASSES.map((classOption) => (
                      <option key={classOption} value={classOption} className='text-gray-900 font-small'>
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
                    className='rotate-90 absolute right-0 bottom-1'
                  >
                    <path 
                      d="M16.904 13.16L19.026 11.04L30.584 22.594C30.7703 22.7791 30.9181 22.9993 31.019 23.2418C31.1199 23.4843 31.1719 23.7443 31.1719 24.007C31.1719 24.2696 31.1199 24.5297 31.019 24.7722C30.9181 25.0147 30.7703 25.2348 30.584 25.42L19.026 36.98L16.906 34.86L27.754 24.01L16.904 13.16" 
                      fill="#f5f5f5"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
            
            <Button 
              onClick={toggleExpand}
              variant="ghost"
              size="icon"
              aria-label={isExpanded ? "Collapse dashboard" : "Expand dashboard"}
            >
              <ChevronRight className={`size-6 transition-transform ${isExpanded ? "rotate-270" : "rotate-90"}`} />
            </Button>
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
        
        {/* Main Content */}
        <section className='w-full flex-1 mb-3 flex flex-col gap-4'>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full">
            {/* Today's Attendance - 60% Width with Two Columns Inside Accordion */}
            <Card className="bg-gray-800 flex flex-col h-full lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CalendarIcon className="h-5 w-5" />
                  Today's Attendance by Class
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <Accordion type="single" collapsible className="w-full">
                  {filteredClasses.map(className => {
                    const classData = studentAttendance[className];
                    const studentsWhoAte = classData.students.filter(s => s.ateLunch);

                    return (
                      <AccordionItem key={className} value={className} className="border-b border-gray-700">
                        <AccordionTrigger className="py-2 text-white hover:bg-gray-700 hover:no-underline">
                          <span className="text-lg font-medium">{className}</span>
                        </AccordionTrigger>
                        <AccordionContent className="py-2 text-sm text-white">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Column 1: Students Who Ate Lunch */}
                            <div>
                              <p className="font-semibold mb-2">
                                Today: {studentsWhoAte.length} Ate Lunch
                              </p>
                              <div className="space-y-1 max-h-64 overflow-auto">
                                {studentsWhoAte.map((student, index) => (
                                  <div key={index} className="flex justify-between">
                                    <span>{student.name}</span>
                                    <span className="text-green-400">✓</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Column 2: Class Summary */}
                            <div>
                              <p className="font-semibold">
                                Today's Total: {classData.students.length} students
                              </p>
                              <p className="text-gray-400">
                                Present: {classData.students.filter(s => s.ateLunch).length}
                              </p>
                              <p className="text-gray-400">
                                Absent: {classData.students.filter(s => !s.ateLunch).length}
                              </p>
                              <p className="mt-2 font-semibold">
                                This Month: {classData.monthlyAte} meals
                              </p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>

            {/* Recent Transactions - 40% Width with Monthly Revenue */}
            <Card className="bg-gray-800 lg:col-span-2 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CreditCard className="h-5 w-5" />
                  Cafeteria Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <SummaryCard 
                  icon={<CreditCard className="h-6 w-6" />}
                  title="Monthly Revenue"
                  value={`${(mockData.summary.monthlyRevenue / 1000000).toFixed(1)}M ₮`}
                  description="This month"
                />
                <div className="space-y-3 mt-8">
                  <div className='flex items-center gap-2 mb-4'>
                    <Clock className='text-white'/>
                    <h1 className='text-white font-semibold'> Recent Transactions </h1>
                  </div>
                  {mockData.recentTransactions.map((txn) => (
                    <div key={txn.id} className="text-sm text-white border-b border-gray-700 pb-2">
                      <div className="flex justify-between">
                        <span>{txn.studentName} ({txn.class})</span>
                        <span>{txn.items.reduce((sum, item) => sum + item.price, 0)}₮</span>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {new Date(txn.date).toLocaleTimeString()} • {txn.paymentMethod}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </motion.article>
    </main>
  );
};

// Summary Card Component
const SummaryCard = ({ icon, title, value, description }) => (
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