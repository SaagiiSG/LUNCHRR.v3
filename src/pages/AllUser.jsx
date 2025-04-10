import React, { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar'; // Adjust path as needed
import SearchIcon from "../assets/icons/SearchOutline.svg"; // Adjust path as needed
import { motion } from "framer-motion";
import Details from "../components/details"; // Adjust path as needed
import { Users, CreditCard } from 'lucide-react';
import { mockData } from '../pages/mockData'; // Adjust path as needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

// UserListItem Component
function UserListItem({ name, id, balance, price, initialChecked, onToggle, onCharge }) {
  const [isChecked, setIsChecked] = React.useState(initialChecked);
  const [chargeAmount, setChargeAmount] = React.useState('');
  const [isCharging, setIsCharging] = React.useState(false);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    onToggle(checked);
  };

  const handleCharge = () => {
    const amount = parseInt(chargeAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      onCharge(id, amount);
      setChargeAmount('');
      setIsCharging(false);
    }
  };

  return (
    <tr className='even:bg-gray-100 even:bg-opacity-80 odd:bg-gray-50 w-full px-5'>
      <td className='h-14 text-lg font-medium text-center w-[25%]'>{name}</td>
      <td className='h-14 text-lg font-medium text-center w-[20%]'>{id}</td>
      <td className='h-14 text-lg font-medium text-center w-[15%]'>{balance.toLocaleString()}₮</td>
      <td className='h-14 text-lg font-medium text-center w-[15%]'>{price.toLocaleString()}₮</td>
      <td className='h-14 text-center w-[25%]'>
        {isCharging ? (
          <div className="flex items-center gap-2 justify-center">
            <Input
              type="number"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(e.target.value)}
              placeholder="Amount"
              className="w-20 h-8 text-center"
            />
            <Button onClick={handleCharge} size="sm" className="bg-emerald-500 hover:bg-emerald-600">
              Confirm
            </Button>
            <Button onClick={() => setIsCharging(false)} size="sm" variant="outline">
              Cancel
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => setIsCharging(true)} 
            size="sm" 
            className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1"
          >
            <CreditCard size={16} /> Charge
          </Button>
        )}
      </td>
      <td className='h-14 w-[10%] flex items-center justify-center'>
        <label className="flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-gray-300 checked:bg-emerald-500 checked:border-emerald-600"
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        </label>
      </td>
    </tr>
  );
}

// AllUser Component
const AllUser = ({ loggedIn }) => {
  const m = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const activeMonth = months[m.getMonth()];

  const [selectedUserNames, setSelectedUserNames] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', id: '', balance: 0 });
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    setUsers(mockData.students); // Load initial users from mockData
  }, []);

  const toggleChecked = (checked, name, id) => {
    setSelectedUserNames((prevSelectedNames) => {
      if (checked) {
        return [...prevSelectedNames, { name, id }];
      } else {
        return prevSelectedNames.filter((selected) => selected.id !== id);
      }
    });
  };

  const chargeCard = (id, amount) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, balance: user.balance + amount } : user
      )
    );
  };

  const addNewUser = () => {
    if (!newUser.name || !newUser.id) {
      alert('Name and Card ID are required');
      return;
    }
    if (users.some(user => user.id === newUser.id)) {
      alert('Card ID already exists');
      return;
    }
    setUsers(prev => [...prev, { ...newUser, price: 0, img: 'https://via.placeholder.com/150' }]);
    setIsDialogOpen(false);
    setNewUser({ name: '', id: '', balance: 0 });
  };

  const handleDelete = () => {
    setUsers(prev => prev.filter(user => !selectedUserNames.some(selected => selected.id === user.id)));
    setSelectedUserNames([]);
    setIsDeleteDialogOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className='w-full h-screen flex bg-gray-50'>
      <Navbar activebtnNumber={2} loggedIn={loggedIn} />
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 0.6 }}
        className='w-full rounded-tl-3xl p-6 overflow-auto flex flex-col gap-6 text-gray-900'
      >
        <Details pageName="User Control" pagePath="/Users" />

        {/* Header Section */}
        <section className='bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 text-white'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex gap-4 items-center'>
              <Users className='text-emerald-500 h-6 w-6' />
              <h2 className='text-2xl font-bold'>Users</h2>
            </div>
            <div className='flex items-center gap-4'>
              <div className='bg-white text-gray-800 rounded-xl h-12 w-64 flex items-center px-3 gap-2'>
                <img src={SearchIcon} alt="Search" className="h-5 w-5" />
                <input
                  type="text"
                  placeholder='Search by name'
                  className='bg-transparent outline-none w-full'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogTrigger asChild>
    <button className='group hover:scale-105 hover:bg-opacity-90 duration-300 flex items-center gap-2 px-4 rounded-xl h-12 bg-emerald-500 text-white'>
      <p>Add New User</p>
      <span className='text-2xl group-hover:rotate-90 duration-300'>+</span>
    </button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New User</DialogTitle>
      <DialogDescription>Enter the details for the new user.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Name Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input
          id="name"
          value={newUser.name}
          onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
          className="col-span-3"
        />
      </div>
      {/* Card ID Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="id" className="text-right">Card ID</Label>
        <Input
          id="id"
          value={newUser.id}
          onChange={(e) => setNewUser(prev => ({ ...prev, id: e.target.value }))}
          className="col-span-3"
        />
      </div>
      {/* Balance Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="balance" className="text-right">Balance</Label>
        <Input
          id="balance"
          type="number"
          value={newUser.balance}
          onChange={(e) => setNewUser(prev => ({ ...prev, balance: parseInt(e.target.value, 10) || 0 }))}
          className="col-span-3"
        />
      </div>
      {/* Class Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="class" className="text-right">Class</Label>
        <Input
          id="class"
          value={newUser.class}
          onChange={(e) => setNewUser(prev => ({ ...prev, class: e.target.value }))}
          className="col-span-3"
        />
      </div>
      {/* Grade Input */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="grade" className="text-right">Grade</Label>
        <Input
          id="grade"
          value={newUser.grade}
          onChange={(e) => setNewUser(prev => ({ ...prev, grade: e.target.value }))}
          className="col-span-3"
        />
      </div>
    </div>
    <DialogFooter>
      <Button onClick={addNewUser}>Add User</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
              {selectedUserNames.length > 0 && (
                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                  Delete Selected
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the following users:
                <ul>
                  {selectedUserNames.map(user => <li key={user.id}>{user.name}</li>)}
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Users Table */}
        <section className='flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-100 text-gray-900 sticky top-0 border-b-2 border-gray-200'>
                <th className='h-16 text-xl font-semibold w-[25%]'>Name</th>
                <th className='h-16 text-xl font-semibold w-[20%]'>Card ID</th>
                <th className='h-16 text-xl font-semibold w-[15%]'>Balance</th>
                <th className='h-16 text-xl font-semibold w-[15%]'>{activeMonth} Spending</th>
                <th className='h-16 text-xl font-semibold w-[25%]'>Actions</th>
                <th className='h-16 text-xl font-semibold w-[10%]'></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((uData) => (
                <UserListItem
                  key={uData.id}
                  name={uData.name}
                  id={uData.id}
                  balance={uData.balance}
                  price={uData.price}
                  initialChecked={selectedUserNames.some(selected => selected.id === uData.id)}
                  onToggle={(checked) => toggleChecked(checked, uData.name, uData.id)}
                  onCharge={chargeCard}
                />
              ))}
            </tbody>
          </table>
        </section>
      </motion.article>
    </main>
  );
};

export default AllUser;