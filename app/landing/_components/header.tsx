import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/logo.svg";

const Header = () => {
  return (
    <header>
        <div>
            {/* <Image src={logo} width={80} height={80} alt="logo"/> */}
        </div>
      <nav>
        <ul>
          <li>
            <Link href="#link1">Link1</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
