/* eslint-disable flowtype/require-valid-file-annotation */
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Loader } from "../Loader/loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Adduser, selectUsers, addActiveUsers
} from "../../StoreRedux/UserSlice";

import { toast } from "react-toastify";
import { Sidebar } from "../Sidebar Pages/SideBar";
import { addQuotations, selectQuotations } from "../../StoreRedux/quotationSlice";
const serverUrl = process.env.REACT_APP_Server_Url

export const AdminLayout = () => {
  const [loader, setloader] = useState(true);
  const dispatch = useDispatch();
  // const storeAllUsers = useSelector(selectUsers);
  const storeQuotations = useSelector(selectQuotations);
  //////////////////////////////fetch total users/////////////////////////////////////////////
  // useEffect(() => {
  //   const fetchactiveUsers = async () => {

  //     try {
  //       const response = await axios.get(
  //         `${serverUrl}/api/users/active-users`
  //       );
  //       if (response && response.status === 200) {
  //         setloader(false);
  //         dispatch(addActiveUsers(response.data.activeUsers));
  //         // toast.success("activeUsers Fetch Successfully");
  //       }
  //     } catch (error) {
  //       setloader(false);
  //       if (error.response) {
  //         // toast.error("Failed to Fetch activeUsers");
  //       } else {
  //         // toast.error("Failed to Fetch activeUsers");
  //       }
  //     }
  //   };
  //   fetchactiveUsers();
  // }, []);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${serverUrl}/api/users/get_all_users`
  //       );
  //       if (response && response.status === 200) {
  //         setloader(false);
  //         dispatch(Adduser(response.data.users));

  //         // toast.success("Users Fetch Successfully");
  //       }
  //     } catch (error) {
  //       setloader(false);
  //       if (error.response) {
  //         // toast.error("Failed to Fetch Users");
  //       } else {
  //         // toast.error("Failed to Fetch Users");
  //       }
  //     }
  //   };

  //   if (storeAllUsers.length === 0) {
  //     fetchUsers();
  //   }
  // }, []);
// fetch all site ///////////////////////////////////////////////////
useEffect(() => {
 const fetchQuotations = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/quotation/getAll-quotation`
      );
      if (response && response?.status === 200) {
        console.log("response", response.data);  // Check response data
        setloader(false);
        // console.log("Dispatching with data:", dispatch(addQuotations(response.data.quotations)));  // Log the data before dispatch
        dispatch(addQuotations(response?.data?.quotations));
        toast.success("Quotations fetched");        
      }
    } catch (error) {
      setloader(false);
      if (error.response) {
        console.log("Error:", error.response);
      }
    }
  };
  if (storeQuotations?.length === 0) {
    fetchQuotations();
  }
}, []);
console.log('store.....', storeQuotations);
  /////////////////////////////// fetch all deals //////////////////////////////
  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-white-600">
        <Sidebar />
        <main className="p-4 md:ml-64 h-auto pt-20">
          <Outlet />
        </main>
        <Loader loading={loader}></Loader>
      </div>
    </>
  );
};


