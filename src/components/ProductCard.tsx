import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: 'Prescription Required' | 'Over-the-Counter';
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl, type }) => {
  console.log('ProductCard loaded for:', name);

  const isPrescription = type === 'Prescription Required';

  return (
    <Link to="/product-detail" className="block group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="h-full w-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={4 / 3}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x300'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold leading-tight text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="mt-2">
              <Badge variant={isPrescription ? 'destructive' : 'secondary'}>
                {type}
              </Badge>
            </div>
          </div>
          <div className="mt-4 text-right">
            <p className="text-2xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;