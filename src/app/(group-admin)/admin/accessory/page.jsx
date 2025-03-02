import { getAccessory } from "@/app/library/api-calls";
import { formatDate } from "@/app/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ImageGallery from "@/components/admin/ImageGallery";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Link from "next/link";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const Accessory = async () => {
  const accessories = await getAccessory();

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Accessory"]}
        title={"Add"}
        url={"/admin/accessory/add-accessory"}
        trashUrl={"/admin/accessory/add-accessory"}
        viewTrash={"/admin/accessory/view-trash"}
      />
      <table className="w-full border border-gray-400 rounded-lg leading-normal overflow-hidden shadow-md">
        <thead className="border-b border-gray-400 bg-[#f3f5f7]">
          <tr>
            <th className="p-2 py-3 text-start" scope="col">
              S.No
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Name
            </th>

            <th className="p-2 py-3 text-start" scope="col">
              Slug
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Image
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Product
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Status
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Created At
            </th>
            <th className="p-2 py-3 text-start" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {accessories?.length === 0 ? (
            <tr className="text-center w-full">
              <td
                colSpan="6"
                className="py-2 text-xl font-semibold text-gray-600"
              >
                List is empty...
              </td>
            </tr>
          ) : (
            accessories.map((accessory, index) => (
              <tr
                key={accessory._id}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{accessory?.name}</td>
                <td className="p-2">{accessory?.slug}</td>
                <td className="p-2">
                  <img
                    width={70}
                    height={70}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/accessory/${accessory?.image}`}
                    alt=""
                  />
                </td>
                <td className="p-2">{accessory?.product.name}</td>
                <td className="p-2">
                  <ToggleStatus
                    current_status={accessory?.status}
                    url={`/accessory/toggle-status/${accessory._id}`}
                  />
                </td>
                <td className="p-2">{formatDate(accessory?.createdAt)}</td>
                <td className="p-2 ">
                  <span className="flex gap-3">
                    <DeleteBtn url={`/accessory/move-to-trash/${accessory?._id}`} />

                    <Link href={`/admin/accessory/edit-accessory/${accessory?._id}`}>
                      <FaPencilAlt title="Edit" />
                    </Link>

                    <ImageGallery
                      productImages={accessory?.other_images}
                      id={accessory?._id}
                    />
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Accessory;
