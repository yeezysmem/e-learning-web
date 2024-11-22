import Image from "next/image";

interface CardComponentProps {
  title: string;
  price: string;
  img: File | string;
  type: string;
  isPublished: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
  title = "title",
  price = "200",
  img,
  type,
  isPublished,
}) => {
  return (
    <div className="bg-[#CBEDCC] m-0 h-96 w-auto rounded-lg p-3">
      <Image src={typeof img === "string" ? img : img ? URL.createObjectURL(img) : ""} width={300} height={300} alt="course-bg" objectFit="contain"  className="rounded-lg"/>
      <h1 className="font-bold text-lg uppercase mt-2">{title}</h1>
      {/* <p>{price}</p> */}
      <p>Status: {isPublished}</p>
    </div>
  );
};

export default CardComponent;
