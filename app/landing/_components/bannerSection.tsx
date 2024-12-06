import { Button } from "@/components/ui/button";

const BannerSection = () => {
  return (
    <div>
      <div className="grid justify-center items-center">
        <h1 className="text-8xl font-bold">
          A new{" "}
          <span className="text-[#8F58D5] bg-[#D1BFE8] rounded-md px-3">
            way
          </span>{" "}
          to{" "}
          <span className="text-[#4F604F] bg-[#DDFA44] rounded-md px-3">
            study
          </span>
        </h1>
        <p className="mt-4">
          Master programming with the power of AI. Personalized, interactive,
          and effective learning designed for your success.
        </p>
        <div className="flex justify-center">
          <Button>Start Learning Now</Button>
        </div>
      </div>
      <div>
        <div className="bg-black w-screen text-green-400 p-4">010101001010101</div>
      </div>
    </div>
  );
};

export default BannerSection;
