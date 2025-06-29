import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';

import { useSnackbar } from "notistack";
const SendMoney = () => {
  const {enqueueSnackbar} = useSnackbar() ;
  const navigate = useNavigate();
  const location = useLocation();
  const {id , firstname} = location.state || {}; 
  //console.log("user"  , id.toString() , firstname) ;
  const [amount, setamount] = useState('') ;
  
  
  const handle_payment = async () => {
    
    try {
      const response = await fetch("https://money-transfering-3-p4hu.onrender.com/api/v1/account/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({to : id.toString() , amount:amount}),
        
      });
      const t = await response.json() ;
      

      // //console.log(response.body);
      if (response.ok) {
        //  alert(`${t.message}`) ;
         enqueueSnackbar(`${t.message}` , {variant : 'success'} ); 
        navigate("/dashboard");
      }
    } catch (error) {
      //console.log("error");
    }
  };
  // const handle_payment = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/v1/account/transfer", {
  //       method: "POST",
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //         "Content-Type": "application/json", // Ensure Content-Type is set
  //       },
  //       body: JSON.stringify({
  //         to: id.toString(), // Assuming id is an ObjectId
  //         amount: amount,     // Send amount as a number, not a string
  //       }),
  //     });
  
  //     const t = await response.json(); // Parse response JSON
  
  //     if (response.ok) {
  //       alert(t.message); // Show success message from backend
  //       navigate("/dashboard"); // Navigate to dashboard after successful transfer
  //     } else {
  //       alert(t.message || "An error occurred"); // Show error message from backend or a default message
  //     }
  //   } catch (error) {
  //     //console.log("Error during payment:", error); // Log error for debugging
  //     alert("Payment failed. Please try again."); // Inform user of failure
  //   }
  // };
  

  return (
    <div className='flex justify-center items-center bg-slate-200 w-screen h-screen'>
        <div className='rounded-xl border-black border-2 p-3'>
        <h1 className='text-center text-3xl font-semibold p-5'>Send Money</h1>

        <div className='flex gap-3'>
            <div className='bg-green-500 text-white px-4 text-center text-xl font-semibold py-1  rounded-full'>A</div>
            <h1 className='py-1 font-semibold text-2xl'>{firstname}</h1>
        </div>

        <div className='flex flex-col gap-1'>
            <label htmlFor="" className='text-xl p-2'>Amount (in Rs)</label>
            <input type="number" placeholder='Enter amount' value = {amount} onChange={(e) =>{setamount(e.target.value)}}/>
       
        
        <button onClick={()=>{handle_payment()}} className = 'bg-green-500 text-white  w-full p-2 rounded-xl '>Initiate Amount</button>
        
     
    </div>
    </div>
    </div>
  )
}

export default SendMoney ;