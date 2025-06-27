import React from 'react';
import { Link } from 'react-router-dom';
import { Pill } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  // Since these routes are not in App.tsx, they link to '#' as placeholders.
  const infoLinks = {
    About: [
      { name: 'About Us', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
    Support: [
      { name: 'Help Center', href: '#' },
      { name: 'Shipping Information', href: '#' },
      { name: 'Returns Policy', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Pill className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">PharmaSales Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for safe and convenient access to pharmaceutical needs.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {infoLinks.About.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {infoLinks.Support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {infoLinks.Legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PharmaSales Pro. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-4 sm:mt-0">
            Disclaimer: Information provided on this site is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;