import Image from "next/image";
import Corousel from "@/assest/images/2_corousel.png";
import Link from "next/link";
import Shipping from "@/assest/images/shipping.png";
import Corousel1 from "@/assest/images/3_Corousel.png";
import Support from "@/assest/images/support.png";
import Refund from "@/assest/images/refund.png";
import BestSeller from "@/components/website/BestSeller";
import FeatureProductSection from "@/components/website/FeatureProductSection";

const feature = [
  {title:"FREE SHIPPING",imageUrl:Shipping,des:"At IShop, enjoy fast & free shipping on all your orders! No hidden fees, no minimum purchase—just seamless shopping with doorstep delivery at no extra cost. Shop now & save!r"},
  {title:"100% REFUND",imageUrl:Refund,des:"Shop with confidence at IShop! If you're not satisfied, we offer a 100% refund—no hassle, no worries. Your satisfaction is our priority. Shop stress-free today!"},
  {title:"24/7 SUPPPORT",imageUrl:Support,des:"Need help? IShop offers 24/7 customer support to assist you anytime. Whether it's tracking an order or product inquiries, we're here for you. Contact us anytime!"},
]

export default function Home() {
  return (
    <div  className="overflow-hidden">
      <section
        className="w-full h-[500px] hidden sm:block relative"
        style={{
          background:
            "linear-gradient(67deg, #E71D3A 0%, #ECC7C1 45%, #EFCAC4 58%, #E4BDB8 70%, #42A8FE 100%)",
        }}
      >
        <div className=" absolute bottom-0 left-[55%]">
          <Image height={500} src={Corousel} alt={"2_corousel"} />
        </div>
      </section>
      <section
        className="w-full h-[600px] sm:hidden relative"
        style={{  background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(64,64,64,1) 96%, rgba(64,64,64,1) 98%)" }}
      >
        <div className=" absolute bottom-0 left-8 " >
          <Image src={Corousel1} width={400} alt={"2_corousel"} />
        </div>
      </section>
      <section>
        <BestSeller />
      </section>
      <section className="w-full h-[450px] bg-[#2E90E5] relative ">
        <div className="max-w-[1100px] mx-auto sm:flex justify-between items-center">
          <div className="w-full sm:w-[50%] p-10 md:py-[112px] lg:p-[112px]  flex flex-col gap-5 ">
            <h1 className="text-[32px] sm:text-[38px] text-white ">iPhone One Plus</h1>
            <span className="w-[90%] sm:w-full text-[18px] sm:text-[16px] text-white tracking-[0.4]">
              Performance and design. Taken right to the edge.
            </span>
            <div>
              <Link
                href={"#"}
                className="w-[100px] border-b-[3px] pb-1 block sm:inline mt-7 sm:mt-0  border-white uppercase font-bold text-white"
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className=" absolute bottom-0 w-[75%]  lg:w-full left-[25%] md:left-[45%]  lg:left-[60%]">
            {/* <img className="w-full"  src={iPhoneImage} alt="" /> */}
            <Image src={Corousel} alt="Corousel"  height={500} />
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="max-w-[1000px] mx-auto py-24 md:px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 ">
         {feature.map(
          (feature,index)=><ServiceFeature title={feature.title} imageUrl={feature.imageUrl} des={feature.des} key={index} />
         )}
        </div>
      </section>
      <section>
        <FeatureProductSection />
      </section>
    </div>
  );
}

const ServiceFeature = ({imageUrl,title,des}) => {
  return (
      <div className="flex flex-col items-center text-center gap-3">
        <div className="h-16 flex items-center">
        <Image src={imageUrl} alt={title} width={50} height={50} />
        </div>
        <span className="font-bold text-xl text-[#22262a]">{title}</span>
        <span className="text-sm text-[#909294] max-w-xs">{des}</span>
      </div>
    );
};
