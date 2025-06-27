import React from 'react';
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react';

// Define the type for order status to be used across the application
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface OrderHistoryItemProps {
  orderId: string;
  orderDate: string;
  totalPrice: number;
  status: OrderStatus;
}

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  orderId,
  orderDate,
  totalPrice,
  status,
}) => {
  console.log(`OrderHistoryItem loaded for order: #${orderId}`);

  /**
   * Determines the visual style of the status badge based on the order status.
   * @param status - The current status of the order.
   * @returns The variant prop for the Badge component.
   */
  const getStatusBadgeVariant = (status: OrderStatus): BadgeProps['variant'] => {
    switch (status) {
      case 'Shipped':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      case 'Delivered':
        return 'default'; // A green-like 'success' variant is not standard in shadcn
      case 'Processing':
      default:
        return 'outline';
    }
  };

  const handleViewDetails = () => {
    // In a real application, this would navigate to a detailed order page
    // or open a modal with the full order information.
    console.log(`Action: View details for order #${orderId}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-4 border-b p-4 transition-colors hover:bg-muted/50">
      
      {/* Order ID */}
      <div className="col-span-2 md:col-span-1">
        <p className="text-sm text-muted-foreground">Order ID</p>
        <p className="font-mono text-sm font-semibold text-primary">#{orderId}</p>
      </div>

      {/* Date */}
      <div className="text-left md:text-center">
        <p className="text-sm text-muted-foreground">Date</p>
        <p className="font-medium">{orderDate}</p>
      </div>

      {/* Status */}
      <div className="text-left md:text-center">
        <p className="text-sm text-muted-foreground">Status</p>
        <Badge variant={getStatusBadgeVariant(status)} className="capitalize w-full max-w-24 justify-center">
          {status}
        </Badge>
      </div>

      {/* Total */}
      <div className="text-left md:text-center">
        <p className="text-sm text-muted-foreground">Total</p>
        <p className="font-semibold">${totalPrice.toFixed(2)}</p>
      </div>

      {/* Actions */}
      <div className="col-span-2 md:col-span-1 md:justify-self-end">
        <Button variant="outline" size="sm" onClick={handleViewDetails} className="w-full md:w-auto">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </div>
    </div>
  );
};

export default OrderHistoryItem;