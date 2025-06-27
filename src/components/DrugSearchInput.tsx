import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Simulated drug data from a database
const DRUGS = [
  { value: "aspirin", label: "Aspirin" },
  { value: "ibuprofen", label: "Ibuprofen" },
  { value: "paracetamol", label: "Paracetamol (Acetaminophen)" },
  { value: "amoxicillin", label: "Amoxicillin" },
  { value: "lipitor", label: "Lipitor (Atorvastatin)" },
  { value: "metformin", label: "Metformin" },
  { value: "zoloft", label: "Zoloft (Sertraline)" },
  { value: "omeprazole", label: "Omeprazole" },
  { value: "ventolin", label: "Ventolin (Albuterol)" },
  { value: "cetirizine", label: "Cetirizine (Zyrtec)" },
];

const DrugSearchInput = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  console.log("DrugSearchInput loaded");

  const handleSelect = (drugLabel: string) => {
    setOpen(false);
    // Navigate to the product listing page with the search query
    navigate(`/product-listing?search=${encodeURIComponent(drugLabel)}`);
    console.log(`Navigating to search results for: ${drugLabel}`);
  };

  return (
    <div className="w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start text-muted-foreground"
          >
            <Search className="mr-2 h-4 w-4 shrink-0" />
            Search for medication...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Type a drug name..." />
            <CommandList>
              <CommandEmpty>No medication found.</CommandEmpty>
              <CommandGroup>
                {DRUGS.map((drug) => (
                  <CommandItem
                    key={drug.value}
                    value={drug.label}
                    onSelect={(currentValue) => {
                      // The `currentValue` from onSelect is the label we want to use
                      handleSelect(currentValue);
                    }}
                  >
                    {drug.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DrugSearchInput;