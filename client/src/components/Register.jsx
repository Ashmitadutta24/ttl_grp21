//  import axios from "axios";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5000/auth/users/register", {
//         name,
//         email,
//         password,
//       });
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };
 
//  return( <>
//     <div className="flex flex-col justify-center md:flex-row h-screen bg-[url('https://images.unsplash.com/photo-1737365505446-3a7519af3bee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]b-cover bg-center">
//       {/* LEFT SIDE */}
//       <div className="hidden w-full md:w-1/2  text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
//         <div className="text-center h-[376px]">
//           {/* <div className="flex justify-center mb-12 ">
//             <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto" />
//           </div> */}
//           <p className="text-gray-300 mb-12">Already have Account? Sign in now.</p>
//           <Link to={"/login"} className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition">SIGN IN</Link>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}

//       <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
//         <div className="w-full max-w-sm">
//           <div className="flex justify-center mb-12">
//             {/* <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
//               <h3 className="font-medium text-4xl overflow-hidden">Sign Up</h3>
//               <img src={logo} alt="logo" className="h-auto w-24 object-cover" />
//             </div> */}
//           </div>
//           <p className="text-gray-800 text-center mb-12">Please provide your information to sign up.</p>
//           <form onSubmit={handleRegister}>
//             <div className="mb-2">
//               <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name" className="w-full text-black px-4 py-3 border border-black rounded-md focus:outline-none" />
//             </div>
//             <div className="mb-2">
//               <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full text-black px-4 py-3 border border-black rounded-md focus:outline-none" />
//             </div>
//             <div className="mb-2">
//               <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full text-black px-4 py-3 border border-black rounded-md focus:outline-none" />
//             </div>
//             <div className="block md:hidden font-semibold mt-5">
//               <p>Already have account?</p>
//               <Link to="/login" className="text-sm text-gray-500 hover:underline">Sign In</Link>
//             </div>
//             <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">SIGN UP</button>
//           </form>
//         </div>
//       </div>
      
//     </div>
//   </>
//   );
// }













import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/auth/users/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen  bg-cover bg-center"style={{ backgroundImage: "url('https://images.unsplash.com/photo-1737365505446-3a7519af3bee?q=80&w=687&auto=format&fit=crop')" }}>
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex md:w-1/2  bg-opacity-70 text-white items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center max-w-sm">
          <h2 className="text-4xl font-bold mb-6">Welcome!</h2>
          <p className="text-gray-300 mb-8">Already have an account?</p>
          <Link
            to="/login"
            className="inline-block border-2 border-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 bg-white bg-opacity-90 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-black">Create Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
