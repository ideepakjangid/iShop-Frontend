import { getTrashAccessory } from "@/app/library/api-calls";
import { formatDate } from "@/app/library/helper";
import PageBreadcrumbs from "@/components/admin/PageBreadcrumbs";
import PermanentalyDeleteBtn from "@/components/admin/PermanentalyDeleteBtn";
import RestoreBtn from "@/components/admin/RestoreBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import React from "react";

const AccessoryTrash = async () => {
  const accessories = await getTrashAccessory();

  return (
    <div className="mt-8 px-5">
      <PageBreadcrumbs
        path={["Dashboard", "Accessory","Trash"]}
        title={"Back to view"}
        url={"/admin/accessory"}
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
          {accessories.length === 0 ? (
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
                key={index}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{accessory.name}</td>
                <td className="p-2">{accessory.slug}</td>
                <td className="p-2">
                  <img
                    width={70}
                    height={70}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/accessory/${accessory.image}`}
                    alt=""
                  />
                </td>
                <td className="p-2">
                    {accessory.product.name}
                </td>
                <td className="p-2">
                  <ToggleStatus
                    current_status={accessory.status}
                    url={`/accessory/toggle-status/${accessory._id}`}
                  />
                </td>
                <td className="p-2">{formatDate(accessory.createdAt)}</td>
                <td className="p-2 ">
                <span className="flex gap-4">
                    <RestoreBtn url={`/accessory/restore/${accessory._id}`} />
                    <PermanentalyDeleteBtn
                      url={`/accessory/delete/${accessory._id}`}
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

export default AccessoryTrash;
