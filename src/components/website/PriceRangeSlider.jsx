"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function PriceRangeSlider({ searchParams }) {
  const [range, setRange] = useState({ min: 200, max: 8000 });
  const pathName = usePathname();
  const router = useRouter();

  const priceHandler = (value) => {
    setRange({ min: value[0], max: value[1] });
  };

  useEffect(
    ()=>{
      const currentUrl = new URL(window.location.href);
      const searchParams = currentUrl.searchParams;
      if(searchParams.get('min') == null || searchParams.get('max') == null){
        setRange({ min: 100, max: 10000 })
      }else{
        setRange({min:searchParams.get('min'),max:searchParams.get('max')})
      }
    },[pathName]
  )

  useEffect(() => {
    // Safely access and validate searchParams
    const min = searchParams?.min ? parseInt(searchParams.min, 10) : null;
    const max = searchParams?.max ? parseInt(searchParams.max, 10) : null;

    if (min !== null && max !== null && min >= 0 && max <= 10000 && min <= max) {
      setRange({ min, max });
    }
  }, [searchParams]); // Trigger this effect whenever searchParams change

  const setPriceOnUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("min", range.min);
    url.searchParams.set("max", range.max);

    router.push(url.toString());
  };

  return (
    <div className=" bg-[#F6F7F8]">
      <RangeSlider
        min={0}
        max={10000}
        step={100}
        defaultValue={[range.min, range.max]}
        onInput={(value) => priceHandler(value)}
        className="mt-2 sm:mt-0"
      />
      <div className="mt-5 flex justify-between">
        <div className="max-w-[30%]">
          <span>Min:</span>
          <input
            readOnly
            type="text"
            className="w-full hover:cursor-default focus:outline-none"
            value={`$${range.min}`}
          />
        </div>
        <div className="max-w-[30%]">
          <span>Max:</span>
          <input
            readOnly
            type="text"
            className="w-full hover:cursor-default focus:outline-none"
            value={`$${range.max}`}
          />
        </div>
      </div>
      <button
        onClick={setPriceOnUrl}
        className="w-full border p-2 mt-4 bg-blue-500 text-white hover:bg-blue-600"
      >
        Apply
      </button>
    </div>
  );
}

export default PriceRangeSlider;
