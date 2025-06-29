import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";

import { useContext } from "react";
import { UserContext } from "./../Context/store";
const SignUp = () => {
  const [loading, setloading] = useState(false) ;
  const {enqueueSnackbar} = useSnackbar() ;
  const {  storeTokenInLS,  storename ,name} = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const handle_input = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    // //console.log(data);
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch(`http://localhost:4000/api/v1/user/signup`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       //console.log("response" , response) ;
  //       const data_ = await response.json();
  //       //console.log("data" , data_) ;
  //       if (response.ok) {
  //         //console.log('is ok') ;
  //         setdata({
  //           firstname: "",
  //           lastname: "",
  //           username: "",
  //           password: "",
  //         });
  //       }
  //       navigate("/dashboard");
  //     } catch (error) {
  //       //console.log("signup", error);
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true) ;

    try {
      //console.log(data);
      const response = await fetch(`https://money-transfering-3-p4hu.onrender.com/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      // Log response status for debugging purposes
      // //console.log("Response Status:", response.status);
      const data_ = await response.json();
      //console.log("Response Data:", data_);

      if (response.ok) {
        setloading(false) ;
        storeTokenInLS(data_.token) ;
        //console.log('data.firstname' , data.firstname) ;
        storename(data.firstname) ;
        enqueueSnackbar('You Successfully SignUp' , {variant : 'success'} ); 
        name.current = data.firstname ;
        storename(data.firstname + " " + data.lastname);

        //console.log("Signup successful");

        // Clear the form data
        setdata({
          firstname: "",
          lastname: "",
          username: "",
          password: ""
        });
   
        navigate("/dashboard");

    
      }else{
         setloading(false) ;
        enqueueSnackbar('Choose Different Username' , {variant : 'error'} );
      } 
    } catch (error) {
       setloading(false) ;
      //console.error("Error during signup:", error);
      enqueueSnackbar('n error occurred while signing up. Please try again.' , {variant : 'error'} ); 
      // alert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="bg-slate-500 w-screen h-screen flex items-center justify-center ">
      <form
        className="bg-slate-50 p-3 flex-col  flex  rounded-xl gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="font-semibold text-xl text-center">Sign Up</h1>
        <p className="text-gray-600 text-center">
          Enter your information to create an account
        </p>

        <div className="flex flex-col  gap-1">
          <label htmlFor="">First Name:</label>
          <input
            type="text"
            onChange={(e) => handle_input(e)}
            name="firstname"
            value={data.firstname}
            placeholder="Shubh"
          />
        </div>

        <div className="flex flex-col  gap-1">
          <label htmlFor="">Last Name:</label>
          <input
            type="text"
            name="lastname"
            onChange={(e) => handle_input(e)}
            value={data.lastname}
            placeholder="Arora"
          />
        </div>

        <div className="flex flex-col  gap-1">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            name="username"
            onChange={(e) => handle_input(e)}
            value={data.username}
            placeholder="shubh_05"
          />
        </div>

        <div className="flex flex-col  gap-1">
          <label htmlFor="">Password:</label>
          <input
            type="text"
            name="password"
            onChange={(e) => handle_input(e)}
            value={data.password}
            placeholder=""
          />
        </div>

        <button
  type="submit"
  className="bg-slate-900 text-white p-2 rounded-xl"
>
  {loading ? "Loading..." : "Sign Up"}
</button>


        <div className="text-center">
          <span>Already have an account?</span>
          <Link to = '/signin'>Login</Link>
        </div>
      </form>
      
    </div>
  );
};

export default SignUp;
