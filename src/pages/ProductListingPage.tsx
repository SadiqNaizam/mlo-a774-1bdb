import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock product data
const products = [
  { id: '1', name: 'Ibuprofen 200mg Tablets', price: 8.99, imageUrl: 'https://images.unsplash.com/photo-1628771065518-1d3c2a393d35?q=80&w=800', type: 'Over-the-Counter' as const, brand: 'Advil' },
  { id: '2', name: 'Lipitor (Atorvastatin) 20mg', price: 120.50, imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800', type: 'Prescription Required' as const, brand: 'Pfizer' },
  { id: '3', name: 'Zyrtec (Cetirizine) 10mg', price: 15.25, imageUrl: 'https://images.unsplash.com/photo-1607619056574-7d8d3ee536b2?q=80&w=800', type: 'Over-the-Counter' as const, brand: 'Zyrtec' },
  { id: '4', name: 'Amoxicillin 500mg Capsules', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=800', type: 'Prescription Required' as const, brand: 'Generic' },
  { id: '5', name: 'Tylenol Extra Strength 500mg', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1627830938637-22723e74b34c?q=80&w=800', type: 'Over-the-Counter' as const, brand: 'Tylenol' },
  { id: '6', name: 'Metformin 500mg', price: 18.75, imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800', type: 'Prescription Required' as const, brand: 'Generic' },
  { id: '7', name: 'Advil Liqui-Gels 200mg', price: 11.49, imageUrl: 'https://images.unsplash.com/photo-1550572099-c5c2a7a4654b?q=80&w=800', type: 'Over-the-Counter' as const, brand: 'Advil' },
  { id: '8', name: 'Crestor (Rosuvastatin) 10mg', price: 150.00, imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800', type: 'Prescription Required' as const, brand: 'AstraZeneca' },
];

const BRANDS = ['Advil', 'Pfizer', 'Zyrtec', 'Tylenol', 'AstraZeneca', 'Generic'];
const TYPES = ['Over-the-Counter', 'Prescription Required'];

const ProductListingPage = () => {
  console.log('ProductListingPage loaded');
  const [sortOrder, setSortOrder] = useState('price-asc');
  const [filters, setFilters] = useState<{ brands: string[], types: string[] }>({
    brands: [],
    types: [],
  });

  const handleBrandFilterChange = (brand: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      brands: checked ? [...prev.brands, brand] : prev.brands.filter(b => b !== brand),
    }));
  };

  const handleTypeFilterChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      types: checked ? [...prev.types, type] : prev.types.filter(t => t !== type),
    }));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.types.length > 0) {
      result = result.filter(p => filters.types.includes(p.type));
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOrder === 'price-asc') {
        return a.price - b.price;
      }
      if (sortOrder === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

    return result;
  }, [filters, sortOrder]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Sort by</h3>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">Brand</h3>
                  <div className="space-y-2">
                    {BRANDS.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand}`} onCheckedChange={(checked) => handleBrandFilterChange(brand, !!checked)} />
                        <Label htmlFor={`brand-${brand}`} className="font-normal">{brand}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">Type</h3>
                  <div className="space-y-2">
                    {TYPES.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`type-${type}`} onCheckedChange={(checked) => handleTypeFilterChange(type, !!checked)} />
                        <Label htmlFor={`type-${type}`} className="font-normal">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Product Grid */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-4">
              Showing {filteredAndSortedProducts.length} Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  type={product.type}
                />
              ))}
            </div>
            {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No products match your criteria.</p>
                    <p className="text-sm">Try adjusting your filters.</p>
                </div>
            )}

            {/* Pagination */}
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListingPage;