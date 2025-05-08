export const mockData = {
  // Summary statistics
  summary: {
    totalStudents: 1245,
    mealsServedToday: 842,
    monthlyRevenue: 12560000, // in MNT
    outstandingBalances: 3245000 // in MNT
  },

  // Today's lunch attendance
  todaysAttendance: [
    { class: "6.1", present: 28, absent: 4, specialMeals: 2 },
    { class: "6.2", present: 26, absent: 4, specialMeals: 1 },
    // ... add all classes
  ],

  // Recent cafeteria transactions
  purchaseHistory: [
    {
      id: 1001,
      studentId: "S2023001",
      studentName: "Bat Erdene",
      class: "10.1",
      items: [
        { name: "Lunch Set A", price: 3500 },
        { name: "Milk", price: 1500 }
      ],
      date: "2023-11-15T12:05:00",
      paymentMethod: "card"
    },
    {
      id: 1002,
      studentId: "S2023002",
      studentName: "Nomin Zoloo",
      class: "9.2",
      items: [
        { name: "Lunch Set B", price: 4000 },
        { name: "Juice", price: 2000 }
      ],
      date: "2023-11-15T12:10:00",
      paymentMethod: "cash"
    },
    // ... more transactions
  ],

  // Meal plan subscriptions
  mealPlans: [
    { id: 1, name: "Basic Plan", price: 80000, description: "5 lunches/week", subscribers: 642 },
    { id: 2, name: "Premium Plan", price: 120000, description: "5 lunches + 2 snacks/week", subscribers: 203 }
  ],

  // Inventory status
  inventory: [
    { id: 1, item: "Milk", stock: 245, unit: "boxes", lowStockThreshold: 50 },
    { id: 2, item: "Bread", stock: 120, unit: "loaves", lowStockThreshold: 30 },
    // ... more items
  ],

  // Students array with balance added
  students: [
    { id: "S2023001", price: 5000, img: "https://via.placeholder.com/150", name: "Bat Erdene", balance: 10000 },
    { id: "S2023002", price: 6000, img: "https://via.placeholder.com/150", name: "Nomin Zoloo", balance: 7500 },
    // Add more students as needed (e.g., up to 1245 to match totalStudents)
  ]
};