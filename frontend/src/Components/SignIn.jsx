import React , { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "./../Context/store";
import { useSnackbar } from "notistack";
const SignIn = () => {
  const [loading, setloading] = useState(false) ;
  const {enqueueSnackbar} = useSnackbar() ; 
  const navigate = useNavigate();
  const { storeTokenInLS,   storename , name } = useContext(UserContext);

  const [data, setdata] = useState({
    username: "",
    password: ""
  });
  const handle_input = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    //console.log(data);
  };
  const handle_submit = async (e) => {
    e.preventDefault();
    setloading(true) ;
    try {
      const response = await fetch("https://money-transfering-3-p4hu.onrender.com/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const t = await response.json() ;
       let  tok = t.token ;


      //console.log(t);
      if (response.ok) {
        setloading(false) ;
        
        storeTokenInLS(tok);
        //console.log('t.firstname' , t.firstname) ;
        
        enqueueSnackbar('You Successfully SignIn' , {variant : 'success'} ); 
        name.current = t.firstname ;
        
        storename(t.firstname ) ;

        setdata({
          username: "",
          password: ""
        });

        // window.location.reload() ;
        navigate("/dashboard");
      }else{
        setloading(false) ;
        enqueueSnackbar('Wrong Input' , {variant : 'error'} );
      } 
    } catch (error) {
      setloading(false) ;
      //console.log("error", error);
      
        enqueueSnackbar('Wrong Input' , {variant : 'error'} );
      
    }
  };
  return (
    <div className="bg-slate-500 w-screen h-screen flex items-center justify-center ">
      <form
        className="bg-slate-50 p-3 flex-col  flex  rounded-xl gap-5"
        onSubmit={(e) => handle_submit(e)}
      >
        <h1 className="font-semibold text-xl text-center ">Sign In</h1>
        <p className="text-gray-600 text-center">
          Enter your credentials to access your account
        </p>

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
            placeholder=""
            name="password"
            onChange={(e) => handle_input(e)}
            value={data.password}
          />
        </div>

        <button
          type="submit"
          className="bg-slate-900 text-white p-2 rounded-lg"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <div className="text-center">
          <span>Don't have an account?</span>
          <Link to = '/signup'>SignUp</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
