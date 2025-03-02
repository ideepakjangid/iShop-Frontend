// "use client";
import { getColors, getProducts } from "@/app/library/api-calls";
import FilterOption from "@/components/website/FilterOption";
import Pagination from "@/components/website/Pagination";
import ProductCard from "@/components/website/ProductCard";

const Page = async ({ params, searchParams }) => {
  const { category_slug } = await params;
  const { min, max, color, sort_by_name, page, limit, search } = await searchParams;
  let Search = search ?? null;
  let sortByName = sort_by_name ?? null;
  let Page = page ?? null;
  let Limit = limit ?? 9;
  let range =
    min && max
      ? {
          min: min,
          max: max,
        }
      : null;
  let colors = color ?? null;
  const response = await getProducts(
    category_slug,
    range,
    colors,
    sortByName,
    Page,
    Limit,
    Search
  );

  const allColors = await getColors();
  return (
    <>
      <FilterOption products={response?.products} colors={allColors} />
      {/* <ProductListing /> */}
      <div>
        <div
          className={` w-full grid grid-cols-3 ${
            searchParams?.view == "list" && "!grid-cols-1"
          } gap-6 mt-6`}
        >
          {response?.products && response?.products?.length > 0 ? (
            response?.products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))
          ) : (
            <h1 className=" w-full col-span-3  text-[16px] text-center">
              No product
            </h1>
          )}
        </div>
        <Pagination response={response} />
      </div>
    </>
  );
};

export default Page;
