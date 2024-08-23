import { useSelector } from "react-redux"
import { useEffect } from "react"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  function isTokenExpired() {
    const expirationTime = localStorage.getItem('tokenExpirationTime');
    if (!expirationTime) return true; // If no expiration time found, consider the token expired
    return Date.now() > parseInt(expirationTime, 10); // Compare current time with expiration time
  }
  

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationTime');
    window.location.href = '/login'; // Redirect to login page
   }

   useEffect(()=>{
     if(isTokenExpired()){
       logout();
       return;
     }
   },[])
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5 ml-16 md:ml-0">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </>
  )
}