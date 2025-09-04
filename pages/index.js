import Link from "next/link";
import "../app/globals.css";

export default function Home() {
  return (
    <div className=" font-sans ">
      <nav className=" flex bg-blue-950 ">
        <div className="">
          <img
            className="py-10"
            src="https://static.wixstatic.com/media/1b707d_7cbe68f14dea4a27bec533281c53164f~mv2.png/v1/fill/w_332,h_49,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo_white.png"
            alt="renoPlatrom"
          />
        </div>
        <div className="flex  text-xl items-center  justify-between text-end pl-96 text-white  space-x-7  ">
          <a>Find School </a>
          <a>Admission </a>
          <a>school Protocol</a>

          <a>Login</a>
          <a>SignUp</a>
        </div>
      </nav>
      <div className="w-auto  h-screen bg-cover bg-center bg-no-repeat  bg-[url('../public/images.jpeg')] ">
        {/* Overlay content */}
        <div className="relative backdrop-blur-sm  z-10 items-center justify-center h-full">
          <h1 className="text-blue-950  text-4xl md:text-6xl font-bold text-center pt-48">
            Welcome to School Management
          </h1>
          <div className="text-center justify-center h-full  m-10  text-3xl text-amber-950 ">
            <Link href="/addSchool">
              <button className="bg-gray-200 text-blue-950 p-10 cursor-pointer rounded-4xl ">
                Add School
              </button>
            </Link>
            <Link href="/showSchools">
              <button className="bg-gray-200 text-blue-950 p-10 ml-10 cursor-pointer rounded-4xl ">
                Show Schools
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
