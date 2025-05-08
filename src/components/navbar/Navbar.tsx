import React from 'react';
import NavBtn from './NavBtn';
import { NextUIProvider } from '@nextui-org/system';
import Profile from '../Profile';
import logo from './../../assets/Logo-noFill.svg';
import { LayoutDashboard, Users, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  activebtnNumber: number;
  loggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ activebtnNumber, loggedIn, onLogout }: NavbarProps) => {
  const isLoggedIn = loggedIn;

  return (
    <NextUIProvider>
      <nav className="min-w-[250px] h-screen bg-gray-900 text-white flex flex-col items-center justify-between">
        <section className="w-full">
          <header className="w-full xl:py-8 md:pb-4 flex flex-col items-center gap-3 text-center text-3xl font-bold tracking-widest">
            <img src={logo} alt="LUNCHRR logo" className="xl:w-32 md:w-24" />
            <p className="md:text-2xl xl:text-3xl">Lunchrr</p>
          </header>

          <div className="w-full flex flex-col items-start gap-6 px-4 mt-8">
            {isLoggedIn ? (
              <>
                {activebtnNumber === 1 ? (
                  <NavBtn icon={<LayoutDashboard />} btnName="Dashboard" path="/Dashboard" activeBtn={true} />
                ) : (
                  <NavBtn icon={<LayoutDashboard />} btnName="Dashboard" path="/Dashboard" activeBtn={false} />
                )}
                {activebtnNumber === 2 ? (
                  <NavBtn icon={<Users />} btnName="Users" path="/Users" activeBtn={true} />
                ) : (
                  <NavBtn icon={<Users />} btnName="Users" path="/Users" activeBtn={false} />
                )}
                {activebtnNumber === 7 ? (
                  <NavBtn icon={<ShoppingCart />} btnName="Purchase" path="/Purchase" activeBtn={true} />
                ) : (
                  <NavBtn icon={<ShoppingCart />} btnName="Purchase" path="/Purchase" activeBtn={false} />
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </section>

        {isLoggedIn ? (
          <Profile
            userName="test user"
            activebtnNumber={activebtnNumber}
            userAcces="admin"
            logInOut="Log Out"
            onLogout={onLogout}
            userUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6upkc6jjdNBwfdiHyTHtOv0M4C2YHf4nmCQ&s"
          />
        ) : (
          ''
        )}
      </nav>
    </NextUIProvider>
  );
};

export default Navbar;