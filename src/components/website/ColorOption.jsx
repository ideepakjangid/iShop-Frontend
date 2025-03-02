"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ColorOption = ({ colors }) => {

  const [selectedColor, setSelectedColor] = useState([]);
  const pathName = usePathname()
  const routes = useRouter();

  const colorSelectionHandler = (colorSlug) => {
    setSelectedColor((preColor) => {
      return preColor.includes(colorSlug)
        ? preColor.filter((slug) => slug !== colorSlug)
        : [...preColor, colorSlug];
    });
  };

  useEffect(
    ()=>{
      const currentUrl = new URL(window.location.href);
      const searchParams = currentUrl.searchParams;
      if(searchParams.get('color') == null){
        setSelectedColor([])
      }else{
        setSelectedColor(searchParams.get('color').split(','))
      }
    },[pathName]
  )

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedColor.length != 0) {
      url.searchParams.set("color", selectedColor.toString());
    } else{
      
      url.searchParams.delete("color");
    }
    routes.push(url.toString());
  }, [selectedColor]);

  return (
    <div className="flex gap-2 justify-between flex-wrap p-3 sm:p-0">
      {colors.map((color) => {
        return (
          <button
            onClick={() => colorSelectionHandler(color.slug)}
            key={color.slug}
          >
            <div className="">
              <input
                type="checkbox"
                onChange={() => colorSelectionHandler(color.slug)}
                checked={selectedColor.includes(color.slug) ? true : false}
              />
              <span
                style={{ backgroundColor: color.hxcode }}
                className={`block w-[16px] h-[16px]  rounded-full `}
              ></span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ColorOption;
