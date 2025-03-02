import { getAccessory } from '@/app/library/api-calls';
import ProductCard from '@/components/website/AccessoryCard';
import React from 'react';

const Page = async() => {
    const accessories = await getAccessory();
    return (
        <div className="max-w-[1100px] mx-auto my-8 grid grid-cols-1 sm:grid-cols-4 gap-8 p-8">
        {accessories.map((accessory, index) => {
          return <ProductCard key={index} {...accessory} />;
        })}
      </div>
    );
}

export default Page;
