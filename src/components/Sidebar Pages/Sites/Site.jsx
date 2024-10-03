import { useState, useEffect } from "react";
import { Loader } from "../../Loader/loader";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteModal from "../../DeleteModal";
import { selectQuotations } from "../../../StoreRedux/quotationSlice";

const Site = () => {
  const [delId, setdelId] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const storeAllQuotations = useSelector(selectQuotations);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full p-2 flex items-center justify-end"></div>
      <div className="overflow-y-auto h-full max-h-[80vh] p-4">
        <div className="flex items-center justify-start gap-2 w-full">
          {storeAllQuotations && storeAllQuotations.length > 0 && (
            <span className="font-bold"> {storeAllQuotations.length}</span>
          )}
          <span className="font-bold text-2xl text-left w-full text-purple-700">
            All Quotations
          </span>
        </div>
        <div className="grid grid-cols-2 whitespace-nowrap overflow-y-auto md:grid-cols-7 bg-gray-50 text-center my-4 p-2">
          <h2 className="px-2 col-span-1 md:block whitespace-nowrap hidden text-md font-bold">
            Quotation #
          </h2>
          <h2 className="px-2 col-span-1 text-md font-bold tracking-wider">
            Business
          </h2>
          <h2 className="px-2 col-span-1 text-md font-bold">Client</h2>
          <h2 className="px-2 col-span-1 text-md font-bold">Quotation Date</h2>
          <h2 className="px-2 col-span-1 text-md font-bold">Valid Till</h2>
          <h2 className="px-2 col-span-1 text-md font-bold">Actions</h2>
        </div>

        {storeAllQuotations && storeAllQuotations.length > 0 ? (
          storeAllQuotations.map((site, index) => (
            <div
              key={index}
              className="px-8 py-4 shadow-lg border border-t-2 my-2 rounded-md grid grid-cols-2 md:grid-cols-7 text-center"
            >
              <div className="text-sm text-left px-2 font-medium col-span-1 md:block hidden text-gray-900">
                #{site.quotationNumber}
              </div>
              <Link
                to={`/Admin/siteInfo/${site._id}`}
                className="underline text-blue-500 text-sm px-1 font-medium col-span-1 row-span-2 flex items-center"
              >
                <span className="whitespace-nowrap">{site.title}</span>
              </Link>
              <div className="text-sm px-4 text-left whitespace-nowrap ml-3 font-medium col-span-1 md:block hidden text-gray-900">
                {site.client.name}
              </div>
              <div className="text-sm px-2 font-medium col-span-1 text-gray-900">
                {new Date(site.quotationDate).toISOString().split("T")[0]}
              </div>
              <div className="text-sm px-2 font-medium col-span-1 md:block hidden text-gray-900">
                {new Date(site.validTill).toISOString().split("T")[0]}
              </div>
              <div className="text-sm font-medium col-span-1 flex items-end justify-end gap-2 text-gray-900">
                {/* edit */}
                <button
                  onClick={() => {
                    navigate(`/Admin/EditSite/${site._id}`);
                  }}
                  className="ml-2 text-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                {/* delete */}
                <button
                  onClick={() => {
                    setshowModal(true);
                    setdelId(site._id);
                  }}
                  className="ml-2 text-red-600 hover:text-red-900 text-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="p-2 text-center font-semibold text-lg text-green-700">
              No Quotation found
            </p>
          </div>
        )}
      </div>
      <Loader loading={loading} />
      <DeleteModal
        setloading={setLoading}
        showModal={showModal}
        setshowModal={setshowModal}
        delId={delId}
        whatdelete="quotation"
      />
    </>
  );
};

export default Site;
