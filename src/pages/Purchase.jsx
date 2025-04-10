import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Details from '../components/details';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Purchase = ({ loggedIn }) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false); // Added state for dialog

  const items = [
    { id: 1, price: 2000, img: "https://via.placeholder.com/150", name: "Water" },
    { id: 2, price: 2000, img: "https://via.placeholder.com/150", name: "Juice" },
    { id: 3, price: 2500, img: "https://via.placeholder.com/150", name: "Ooha" },
    { id: 4, price: 1500, img: "https://via.placeholder.com/150", name: "Milk" },
    { id: 5, price: 20000, img: "https://via.placeholder.com/150", name: "Water Bottle" },
    { id: 6, price: 2500, img: "https://via.placeholder.com/150", name: "Tom Kontick" },
    { id: 7, price: 2500, img: "https://via.placeholder.com/150", name: "Bourbon" },
    { id: 8, price: 2500, img: "https://via.placeholder.com/150", name: "Hurustic" },
    { id: 9, price: 2000, img: "https://via.placeholder.com/150", name: "Hi" },
  ];

  const addItem = (item) => {
    setSelectedItems(prev => {
      const existingItem = prev.find(selected => selected.item.id === item.id);
      if (existingItem) {
        return prev.map(selected =>
          selected.item.id === item.id
            ? { ...selected, quantity: selected.quantity + 1 }
            : selected
        );
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setSelectedItems(prev => {
      const existingItem = prev.find(selected => selected.item.id === id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter(selected => selected.item.id !== id);
        } else {
          return prev.map(selected =>
            selected.item.id === id
              ? { ...selected, quantity: newQuantity }
              : selected
          );
        }
      }
      return prev;
    });
  };

  const removeItem = (id) => {
    setSelectedItems(prev => prev.filter(selected => selected.item.id !== id));
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, selected) => total + selected.item.price * selected.quantity, 0);
  };

  const finishTransaction = () => {
    const transactionDetails = {
      items: selectedItems.map(selected => ({
        ...selected.item,
        quantity: selected.quantity,
      })),
      total: calculateTotal(),
      timestamp: new Date().toISOString(),
    };
    console.log("Transaction Details:", transactionDetails);
    setSelectedItems([]);
    setIsDialogOpen(false); // Close dialog after confirming
  };

  return (
    <main className='w-full h-screen flex bg-gray-50 text-gray-900'>
      <Navbar activebtnNumber={7} loggedIn={loggedIn} />
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 0.6 }}
        className='w-full rounded-tl-3xl p-6 overflow-auto flex flex-col gap-6'
      >
        <Details pageName="Buy from Cafeteria" pagePath="/Purchase" />

        {/* Order Summary Section */}
        <section className='bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 text-white'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <ShoppingCart className="text-emerald-500 h-6 w-6" />
              <h2 className='text-2xl font-bold'>Your Order</h2>
            </div>
            {selectedItems.length > 0 && (
              <div className='flex items-center gap-4'>
                <p className='text-lg font-semibold'>
                  Total: <span className='text-emerald-500'>{calculateTotal().toLocaleString()}₮</span>
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white transition-colors">
                      Checkout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-gray-900 border-gray-200">
                    <DialogHeader>
                      <DialogTitle>Confirm Purchase</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Are you sure you want to complete this transaction?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-gray-500">Items: {selectedItems.length}</p>
                      <p className="text-lg font-semibold">Total: {calculateTotal().toLocaleString()}₮</p>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        className="text-gray-900 border-gray-300 hover:bg-gray-100"
                        onClick={() => setIsDialogOpen(false)} // Closes dialog
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={finishTransaction}
                      >
                        Confirm
                      </Button>
                      <input type="text" className='hidden' />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          {selectedItems.length > 0 ? (
            <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {selectedItems.map((selected) => (
                <div 
                  key={selected.item.id} 
                  className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={selected.item.img || "https://via.placeholder.com/40"} 
                      alt={selected.item.name} 
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium capitalize">{selected.item.name}</p>
                      <p className="text-sm text-gray-300">
                        {selected.quantity} x {selected.item.price.toLocaleString()}₮ = {(selected.quantity * selected.item.price).toLocaleString()}₮
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => updateQuantity(selected.item.id, -1)}
                      className="text-gray-200 hover:text-gray-900 hover:bg-gray-300 rounded-full"
                    >
                      <Minus size={18} />
                    </Button>
                    <span>{selected.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => addItem(selected.item)}
                      className="text-gray-200 hover:text-gray-900 hover:bg-gray-300 rounded-full"
                    >
                      <Plus size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(selected.item.id)}
                      className="text-gray-200 hover:text-gray-900 hover:bg-gray-300 rounded-full"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-4">No items selected yet</p>
          )}
        </section>

        {/* Product Carousel */}
        <section className="flex-1 text-white bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 overflow-hidden">
          <h3 className="text-xl font-semibold mb-4">Available Items</h3>
          <Carousel className="w-full h-full">
            <CarouselContent className="-ml-2">
              {items.map((item) => {
                const selected = selectedItems.find(selected => selected.item.id === item.id);
                const quantity = selected ? selected.quantity : 0;
                return (
                  <CarouselItem
                    key={item.id}
                    className="w-80 pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex items-stretch"
                  >
                    <Card className="bg-gray-700 w-full h-full flex flex-col justify-between p-4 border-0">
                      <CardContent className="flex flex-col items-center justify-between gap-4 p-0 w-full flex-1">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className="text-center w-full">
                          <h4 className="text-lg font-medium capitalize">{item.name}</h4>
                          <p className="text-emerald-500">{item.price.toLocaleString()}₮</p>
                        </div>
                      </CardContent>
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={quantity === 0}
                          className="bg-gray-600 text-white hover:bg-gray-500"
                        >
                          <Minus size={18} />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => addItem(item)}
                          className="bg-gray-600 text-white hover:bg-gray-500"
                        >
                          <Plus size={18} />
                        </Button>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-gray-200 hover:bg-gray-300 text-gray-900" />
            <CarouselNext className="right-2 bg-gray-200 hover:bg-gray-300 text-gray-900" />
          </Carousel>
        </section>
      </motion.article>
    </main>
  );
};

export default Purchase;