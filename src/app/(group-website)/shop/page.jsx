import { getColors, getProducts } from "@/app/library/api-calls";
import FilterOption from "@/components/website/FilterOption";
import Pagination from "@/components/website/Pagination";
import ProductCard from "@/components/website/ProductCard";
import Loading from "@/app/loading";

const Page = async ({ searchParams }) => {
  const { min, max, color, sort_by_name, page, limit, search } =
    await searchParams;
  let sortByName = sort_by_name ?? null;
  let Search = search ?? null;
  let Page = page ?? null;
  let Limit = limit ?? 9;
  let range = min && max ? { min: min, max: max } : null;
  let colors = color ?? null;
  const response = await getProducts(
    null,
    range ?? null,
    colors ?? null,
    sortByName,
    Page,
    Limit,
    Search
  );
  const allColors = await getColors();

  return (
    <>
      {response && Array.isArray(response.products) ? (
        <>
          <FilterOption colors={allColors} products={response.products} />
          <div>
            <div
              className={`w-full grid grid-cols-1 ${
                searchParams?.view === "list" ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"
              } gap-6 mt-6 px-6 sm:p-0`}
            >
              {response.products.length > 0 ? (
                response.products.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))
              ) : (
                <h1
                  key="no-product"
                  className="w-full col-span-3 text-[16px] text-center"
                >
                  No product
                </h1>
              )}
            </div>
            <Pagination response={response} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Page;
