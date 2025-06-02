
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Menu, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const { currentUser, userData, signOut } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-brand-purple">
          ShopHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="text-gray-700 hover:text-brand-purple transition-colors">
            Products
          </Link>
          <Link to="/categories" className="text-gray-700 hover:text-brand-purple transition-colors">
            Categories
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-brand-purple transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-brand-purple transition-colors">
            Contact
          </Link>
        </div>

        {/* Cart and Account */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-purple text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.photoURL || undefined} alt={userData?.displayName || "User"} />
                    <AvatarFallback>{userData?.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{userData?.displayName}</p>
                  <p className="text-xs text-muted-foreground">{userData?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer w-full">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="cursor-pointer w-full">My Orders</Link>
                </DropdownMenuItem>
                {userData?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer w-full">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/products" className="text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  Products
                </Link>
                <Link to="/categories" className="text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  Categories
                </Link>
                <Link to="/about" className="text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                <Link to="/contact" className="text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
                {!currentUser && (
                  <>
                    <Link to="/login" className="text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                    <Link to="/register" className="text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
