import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="flex items-center space-x-5">
        <Link href={"/"}>
          <img
            className="w-44 object-contain cursor-pointer"
            src="/medium.jpg"
            alt=""
          />
        </Link>

        <ul className="hidden md:inline-flex items-center space-x-5 ">
          <li>About</li>
          <li>Contact</li>
          <li className="bg-green-500 text-white px-4 py-1 rounded-full">Follow</li>
        </ul>

      </div>

      <div className="flex items-center space-x-5 text-green-600">
            <h2>Sign in</h2>        
            <h2 className="border px-4 py-1 rounded-full border-green-600" >Get Started</h2>        

      </div>


    </header>
  );
};

export default Header;
