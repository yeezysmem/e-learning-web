import Header from "./_components/header";
import BannerSection from "./_components/bannerSection";

const landingPage = async ({  }) => {
  return (
    <div className="container">
      <Header />
      <BannerSection />
      <div>section2</div>
      <div>footer</div>

    </div>
  );
};

export default landingPage;
