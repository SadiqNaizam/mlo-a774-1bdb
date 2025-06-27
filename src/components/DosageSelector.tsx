import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the shape of a single dosage option
export interface DosageOption {
  id: string;
  strength: string;
  price: number;
  pillsPerPackage: number;
}

// Define the props for the DosageSelector component
interface DosageSelectorProps {
  dosages: DosageOption[];
  onDosageChange: (selectedDosage: DosageOption) => void;
  initialDosageId?: string;
}

const DosageSelector: React.FC<DosageSelectorProps> = ({
  dosages = [],
  onDosageChange,
  initialDosageId,
}) => {
  console.log('DosageSelector loaded');

  // Find the initial dosage, or default to the first one
  const initialSelectedDosage = initialDosageId
    ? dosages.find(d => d.id === initialDosageId)
    : dosages[0];

  // State to track the currently selected dosage ID
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedDosage?.id);

  // Effect to inform the parent component of the initial selection
  useEffect(() => {
    if (initialSelectedDosage) {
      onDosageChange(initialSelectedDosage);
    }
  }, [initialSelectedDosage, onDosageChange]);


  const handleValueChange = (id: string) => {
    const selectedDosage = dosages.find(dosage => dosage.id === id);
    if (selectedDosage) {
      setSelectedId(id);
      onDosageChange(selectedDosage);
    }
  };

  if (!dosages || dosages.length === 0) {
    return <p>No dosage options available.</p>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Select Dosage</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedId}
          onValueChange={handleValueChange}
          className="gap-4"
        >
          {dosages.map((dosage) => (
            <Label
              key={dosage.id}
              htmlFor={dosage.id}
              className={`flex items-center justify-between rounded-md border-2 p-4 cursor-pointer transition-colors ${
                selectedId === dosage.id
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-accent'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-bold text-base">{dosage.strength}</span>
                <span className="text-sm text-muted-foreground">{dosage.pillsPerPackage} pills</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">${dosage.price.toFixed(2)}</span>
                <RadioGroupItem value={dosage.id} id={dosage.id} />
              </div>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default DosageSelector;