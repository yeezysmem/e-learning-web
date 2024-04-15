import Image from "next/image";
import logo from "../../../public/Logo.svg";

const Logo = () => {
  return (
    <div className="flex justify-center pt-10 pb-11">
      <Image src={logo} alt="Picture of the author" width={130} height={100} />
    </div>
  );
};

export default Logo;
