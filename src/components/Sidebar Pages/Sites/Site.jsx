import { useState } from "react";
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

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-center">
                <th className="px-4 py-2 text-md font-bold">Quotation #</th>
                <th className="px-4 py-2 text-md font-bold">Business</th>
                <th className="px-4 py-2 text-md font-bold">Client</th>
                <th className="px-4 py-2 text-md font-bold">Quotation Date</th>
                <th className="px-4 py-2 text-md font-bold">Valid Till</th>
                <th className="px-4 py-2 text-md font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeAllQuotations && storeAllQuotations.length > 0 ? (
                storeAllQuotations.map((site, index) => (
                  <tr
                    key={index}
                    className="border-t text-center bg-white shadow-sm"
                  >
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      #{site.quotationNumber}
                    </td>
                    <td className="px-4 py-2  text-sm font-medium text-blue-500 underline">
                      <Link to={`/Admin/siteInfo/${site._id}`}>
                        {site.title}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-sm ml-2 text-center font-medium text-gray-900">
                      {site.client.name}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {new Date(site.quotationDate).toISOString().split("T")[0]}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {new Date(site.validTill).toISOString().split("T")[0]}
                    </td>
                    <td className="px-4 py-2 flex justify-center gap-4 text-sm font-medium text-gray-900">
                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          navigate(`/Admin/EditSite/${site._id}`);
                        }}
                        className="text-2xl"
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          setshowModal(true);
                          setdelId(site._id);
                        }}
                        className="text-red-600 hover:text-red-900 text-2xl"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center font-semibold text-lg text-green-700"
                  >
                    No Quotations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
