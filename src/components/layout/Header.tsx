import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Pill, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import DrugSearchInput from '@/components/DrugSearchInput';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="flex items-center space-x-2">
            <Pill className="h-6 w-6 text-primary" />
            <span className="font-bold">PharmaSales Pro</span>
          </Link>
        </div>

        <div className="flex-1 md:flex-none md:w-1/2 lg:w-1/3">
          <DrugSearchInput />
        </div>
        
        <div className="flex items-center ml-auto">
          <nav className="hidden md:flex items-center space-x-6 mr-6">
            <NavLink to="/product-listing" className={navLinkClasses}>
              Products
            </NavLink>
            <NavLink to="/user-dashboard" className={navLinkClasses}>
              Dashboard
            </NavLink>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/user-dashboard">
                <User className="h-5 w-5" />
                <span className="sr-only">User Account</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/checkout">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          </div>

          <div className="md:hidden ml-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                <Link to="/" className="flex items-center space-x-2 mb-8">
                  <Pill className="h-6 w-6 text-primary" />
                  <span className="font-bold">PharmaSales Pro</span>
                </Link>
                  <nav className="flex flex-col space-y-4">
                    <NavLink to="/product-listing" className={navLinkClasses}>
                      Products
                    </NavLink>
                    <NavLink to="/user-dashboard" className={navLinkClasses}>
                      Dashboard
                    </NavLink>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;