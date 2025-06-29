import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { UserContext } from "./../Context/store";
import { Link } from "react-router-dom";
import SendMoney from "./SendMoney";

const Dashboard = () => {
  const {enqueueSnackbar} = useSnackbar() ;

  const [b, setb] = useState(5000);
  const {
    name,
  } = useContext(UserContext);
  const [first, setfirst] = useState(null);
  const [name_, setname_] = useState("");

 
  // const [b , setb] = useState(5000) ;
  const handle_input = async () => {
    // e.preventDefault() ;

    // //console.log(data) ;

    try {
      const url = `https://money-transfering-3-p4hu.onrender.com/api/v1/user/bulk?filter=` + name_;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setfirst(data.user);

      // return data.user ;
    } catch (error) {
      //console.log(error);
    }
  };
  const handle_balance = async () => {
    try {
      //console.log("in handle_balance");
      const url = `https://money-transfering-3-p4hu.onrender.com/api/v1/account/balance`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      setb(Math.round(data.balance * 100) / 100);
      //console.log("data.balance", data.balance);
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    handle_balance();
    handle_input();
  }, [name_]);
  return (
    <div className="w-screen h-screen p-3">
      <div className="flex justify-between p-3">
        <h1 className="text-2xl font-extrabold">Payments App</h1>

        <div className="flex gap-3">
          <h3 className="py-1">Hello, <span className="text-lg font-bold text-blue-700">{name.current}</span></h3>
          <h3 className="bg-slate-300 px-3 py-1 font-semibold rounded-full">
            {name.current[0].toUpperCase()}
          </h3>
        </div>
      </div>
      <div className="border-[1px]  bg-black">
        <hr />
      </div>

      <div className="flex">
        <h2 className="text-2xl p-3 font-extrabold"> Your Balance </h2>
        <h2 className="text-2xl p-3 font-bold">{b}</h2>
      </div>

      <h1 className="text-2xl p-3 font-bold">Users</h1>

      <div className="m-3">
        <input
          type="text"
          onChange={(e) => {
            setname_(e.target.value);
            // handle_input();
          }}
          placeholder="Search users..."
          value={name_}
          className="max-w-full"
        />
      </div>

      <div className="all_box">
        {
          first &&
            first.map((item, index) => {
              // //console.log(item) ;
              return (
                <div key = {index} className=" box ">
                  <div className="flex gap-3">
                    <h3 className=" bg-slate-300 px-3 py-1 m-2 font-semibold rounded-full">
                      {item.username}
                    </h3>
                    <h3 className=" py-1  ">
                      {item.firstname + item.lastname}
                    </h3>
                  </div>

                  <Link to="/send" className="link"  state={{  id:item._id, firstname :item.firstname }}   
                  > Send Money</Link>

                 
                  
                </div>
          
               
              );
              
              
            })

           

          // <div className="flex justify-between p-3">

          //   <div className="flex gap-3">
          //     <h3 className="py-1">Hello,User</h3>
          //     <h3 className="bg-slate-300 px-3 py-1 font-semibold rounded-full">U2</h3>
          //   </div>
          //   <button className="bg-black text-white px-5 py-1 rounded-xl">Send Money</button>
          // </div>
        }

          
      </div>


    </div>
  );
};

export default Dashboard;
