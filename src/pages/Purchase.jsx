import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Details from '../components/details';
import { ShoppingCart, X, Plus, Minus, GlassWater } from 'lucide-react';
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
  // import { data } from 'react-router-dom';
  // import { set } from 'mongoose';
import juice from "../assets/icons/juice.svg"
const Purchase = ({ loggedIn }) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false); // Added state for dialog
  const [cardId, setCardId] = React.useState("");
  const [error, setError] = React.useState("");
  const [userBalance, setUserBalance] = React.useState(0);

  const items = [
    { id: 1, price: 2000, img:"https://th.bing.com/th/id/R.e20f8f21c32ea25838a2f103ad88f4ea?rik=UJuWnEIaIexq9Q&pid=ImgRaw&r=0", name: "Piroshki" },
    { id: 2, price: 2000, img:"https://m.media-amazon.com/images/S/aplus-media/vc/2856266a-07ef-43bc-8799-40d9a16331fb.jpg", name: "Fuze tea" },
    { id: 3, price: 2500, img: "https://th.bing.com/th/id/R.fff37a14adc4d9ebf1439f9d941407f8?rik=HRzFLkHu18pr9A&pid=ImgRaw&r=0", name: "Ooha" },
    { id: 4, price: 3000, img: "https://i5.walmartimages.com/seo/Nesquik-Strawberry-Milk-Ready-to-Drink-Low-fat-Milk-14-fl-o-14-fl-oz_b45fffac-7efd-4bcb-b2ed-967cc32b5213.baf4923c33258548bd8488855f3505cb.jpeg?odnHeight=290&odnWidth=290&odnBg=FFFFFF", name: "Strawberry Milk" },
    { id: 5, price: 2000, img: "https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/7/14/1436890811832/Exactly-the-same---bourbo-009.jpg", name: "Buorbon" },
    { id: 7, price: 2500, img: "https://www.rimoldimayorista.com.ar/datos/uploads/mod_catalogo/31308/cofler-block-6048f63e4ed87.jpg", name: "Block" },
    // { id: 8, price: 2500, img: "https://via.placeholder.com/150", name: "Hurustic" },
    // { id: 9, price: 2000, img: "https://via.placeholder.com/150", name: "Hi" },
  ];

  const addItem = (item) => {
    console.log("Selected item:", item.name);
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
          console.log("Removed item:", existingItem.item.name);
          return prev.filter(selected => selected.item.id !== id);
        } else {
          console.log(`Updated ${existingItem.item.name} quantity to: ${newQuantity}`);
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
    const itemToRemove = selectedItems.find(selected => selected.item.id === id);
    if (itemToRemove) {
      console.log("Removed item:", itemToRemove.item.name);
    }
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

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("")

    if (!cardId) {
      setError("Please enter a card ID")
      return
    }

    try {
        const response = await fetch("http://localhost:8080/users/find", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               cardId
            })
        })

        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to find user')
        }
        
        console.log("User found:", data)
        setUserBalance(data.balance)
        
        // Check if user has enough balance
        const totalCost = calculateTotal();
        if (data.balance < totalCost) {
          alert(`Insufficient balance. Your balance: ${data.balance}₮, Required: ${totalCost}₮`);
          return;
        }
        
        // Update user balance after successful purchase
        const newBalance = data.balance - totalCost;
        
        // Create a list of purchased items
        const purchasedItems = selectedItems.map(selected => ({
          name: selected.item.name,
          price: selected.item.price,
          quantity: selected.quantity
        }));
        
        const updateResponse = await fetch("http://localhost:8080/users/update", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cardId,
            balance: newBalance,
            items: purchasedItems
          })
        });
        
        const updateResult = await updateResponse.json();
        
        if (!updateResponse.ok) {
          throw new Error(updateResult.message || 'Failed to update balance');
        }
        
        // Process the purchase
        alert(`Purchase successful! Remaining balance: ${newBalance}₮`);
        finishTransaction();
        
    } catch (err) {
        setError(err.message || "An error occurred during purchase")
        console.error('Purchase error:', err)
        alert('Purchase failed: ' + err.message)
    }
  }

  // Log selected items whenever they change
  React.useEffect(() => {
    if (selectedItems.length > 0) {
      console.log("Current items in cart:", selectedItems.map(item => item.item.name));
    }
  }, [selectedItems]);

  return (
    <main className='w-full h-screen flex bg-gray-50 text-gray-900'>
      <Navbar activebtnNumber={7} loggedIn={loggedIn} />
      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 0.6 }}
        className='w-full h-auto rounded-tl-3xl p-6 overflow-auto flex flex-col gap-6'
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
                      <div className='w-auto flex items-center gap-2'>
                        <p>id</p>
                    <input type="text" className='block px-2 outline-none file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive col-span-3' onChange={(e) => setCardId(e.target.value)}/>
                    </div>
                      <Button 
                        variant="outline" 
                        className="text-gray-900 border-gray-300 hover:bg-gray-100"
                        onClick={() => setIsDialogOpen(false)} // Closes dialog
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={handleSubmit}
                      >
                        Confirm
                      </Button>
                      
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
                      className="w-10 h-20 object-cover rounded"
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
        <section className="flex-1 h-full overflow-scroll text-white bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 overflow-hidden">
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
                      <CardContent className="flex flex-col items-center justify-between gap-4 p-0 w-full flex-1 ">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-auto object-cover rounded-md aspect-square"
                        />
                        
                        
                      </CardContent>
                      <div className="text-center w-full">
                          <h4 className="text-lg text-white font-medium capitalize">{item.name}</h4>
                          <p className="text-emerald-500">{item.price.toLocaleString()}₮</p>
                        </div>
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
                        <span className="w-8 text-center text-white-50">{quantity}</span>
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