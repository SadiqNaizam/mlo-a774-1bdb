import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DosageSelector, { DosageOption } from '@/components/DosageSelector';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

// Placeholder data for the page
const product = {
  name: 'Medixil 500mg',
  description: 'An effective broad-spectrum medication for treating various bacterial infections. Consult your doctor for proper usage.',
  imageUrl: 'https://images.unsplash.com/photo-1584308666744-8480404b65ae?q=80&w=800&auto=format&fit=crop', // Placeholder image
  category: 'Antibiotic'
};

const sampleDosages: DosageOption[] = [
  { id: 'd1', strength: '250mg', price: 24.99, pillsPerPackage: 30 },
  { id: 'd2', strength: '500mg', price: 45.50, pillsPerPackage: 30 },
  { id: 'd3', strength: '750mg', price: 62.00, pillsPerPackage: 30 },
];

const ProductDetailPage = () => {
  console.log('ProductDetailPage loaded');
  const [selectedDosage, setSelectedDosage] = useState<DosageOption | null>(sampleDosages[1] || null);

  const handleDosageChange = (dosage: DosageOption) => {
    setSelectedDosage(dosage);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Section */}
          <div className="flex items-center justify-center bg-muted rounded-lg p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-w-full h-auto rounded-lg object-contain aspect-square"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col space-y-4">
            <Badge variant="secondary" className="w-fit">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
            
            <div className="mt-4">
                <DosageSelector
                    dosages={sampleDosages}
                    onDosageChange={handleDosageChange}
                    initialDosageId="d2"
                />
            </div>
            
            <div className="flex items-center justify-between mt-4">
                <span className="text-3xl font-bold">
                    ${selectedDosage ? selectedDosage.price.toFixed(2) : 'N/A'}
                </span>
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size="lg">Add to Cart</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center">
                                <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500"/>
                                Prescription Required
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                To purchase this medication, you need to log in and upload a valid prescription for verification.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Link to="/user-dashboard">Login & Upload Prescription</Link>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
          </div>
        </div>

        {/* Detailed Information Section */}
        <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Product Information</h2>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Warnings</AccordionTrigger>
                    <AccordionContent>
                        Do not use this medication if you are allergic to its ingredients. Inform your doctor about your medical history, especially of kidney disease or liver disease. This drug may make you dizzy. Do not drive, use machinery, or do anything that needs alertness until you can do it safely.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Side Effects</AccordionTrigger>
                    <AccordionContent>
                        Common side effects may include nausea, vomiting, or diarrhea. If any of these effects persist or worsen, tell your doctor or pharmacist promptly. A very serious allergic reaction to this drug is rare. However, get medical help right away if you notice any symptoms of a serious allergic reaction.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Ingredients & Usage</AccordionTrigger>
                    <AccordionContent>
                        Active Ingredient: Medixil Hydrochloride. Inactive ingredients include magnesium stearate, microcrystalline cellulose, and titanium dioxide. Take this medication by mouth with a full glass of water, as directed by your doctor. For the best effect, take this antibiotic at evenly spaced times.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;