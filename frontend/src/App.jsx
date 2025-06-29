import React from 'react'
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn' ;
import Dashboard from './Components/Dashboard';
import SendMoney from './Components/SendMoney' ;
import {BrowserRouter , Routes , Route} from 'react-router-dom' ;
const App = () => {
  return (
    <div>
       

      <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
      <Route path = '/*' element = {<SignUp/>} ></Route>
        <Route path = '/signup' element = {<SignUp/>} ></Route>
        <Route path = '/signin' element = {<SignIn/>} ></Route>
        <Route path = '/dashboard' element = {<Dashboard/>} ></Route>
        <Route path = '/send' element = {<SendMoney/>} ></Route>
      
      
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App