import Image from "next/image";
import React from "react";
import ishop from "@/assest/images/ishop.svg";
import facebook from "@/assest/images/facebook.svg";
import twitter from "@/assest/images/twitter.svg";
import visa from "@/assest/images/visa.svg";
import Paypal from "@/assest/images/Paypal.svg";
import master_card from "@/assest/images/master_card.svg";
import Western_union from "@/assest/images/Western_union.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="w-full border-y px-5 sm:p-4">
        <div className="max-w-[1100px] mx-auto pt-16 pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 text-[12px]">
            <div className="flex flex-col gap-5 col-span-2 sm:col-span-1">
              <Image src={ishop} alt="ishop" />
              <span>
              IShop is your one-stop destination for the latest gadgets, electronics, and accessories. Shop top-quality products at unbeatable prices with seamless checkout, fast delivery, and excellent customer support.
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[18px] font-bold text-[#22262A]">
                Follow us
              </span>
              <span>
              Stay connected with IShop! Follow us for the latest deals, trending products, and exclusive offers. Join our community and never miss out on exciting updates. Shop smart, stay updated!
              </span>
              <div className="flex gap-8 items-center">
                <Link href={"#"}>
                  <Image src={facebook} alt="facebook" />
                </Link>
                <Link href={"#"}>
                  <Image src={twitter} alt="twitter" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-[18px] font-bold text-[#22262A]">
                Contact us
              </span>
              <div>
                iShop: Tonk Phatak, Jaipur <br />
                Call us now: +91 8734-455-789 <br />
                Email: support@ishop.com
              </div>
            </div>
          </div>
          <div className="w-full flex my-10 bg-[#e6e6e6] h-[2px]"></div>
          <div className="grid grid-cols-2  sm:flex sm:justify-between gap-2">
            <div>
                <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Information</h2>
                <ul className="text-[14px]">
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">About Us</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Company Information</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Privacy Policy</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Terms & Conditions</li></Link>
                </ul>
            </div>
            <div>
                <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Service</h2>
                <ul className="text-[14px]">
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Customer Support</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Returns & Refunds</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Shipping Information</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">FAQs</li></Link>
                </ul>
            </div>
            <div>
                <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Extras</h2>
                <ul className="text-[14px]">
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Gift Cards</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Affiliate Program</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Special Offers</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Blog</li></Link>
                </ul>
            </div>
            <div>
                <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">My Account</h2>
                <ul className="text-[14px]">
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Login/Register</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Order History</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Wishlist</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Newsletter Subscription</li></Link>
                </ul>
            </div>
            <div>
                <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Useful Links</h2>
                <ul className="text-[14px]">
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Track Your Order</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Contact Us</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Help Center</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Payment Methods</li></Link>
                </ul>
            </div>
            <div>
                <h2 className="text-[18px] mb-5 font-bold text-[#22262A]">Our Offers</h2>
                <ul className="text-[14px]">
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">New Arrivals</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Best Sellers</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Deals & Discounts</li></Link>
                    <Link href={'/'}><li className="hover:text-[#c20021] cursor-pointer my-3">Clearance Sale</li></Link>
                </ul>
            </div>
          </div>
        </div>
      </div>
        <div className="max-w-[1100px] p-5 md:px-5 lg:p-0 sm:py-10 mx-auto flex justify-end">
            <div className=" flex gap-6 items-center">
                <Link href={'#'}><Image src={visa} alt="visa" /></Link>
                <Link href={'#'}><Image src={Paypal} alt="Paypal" /></Link>
                <Link href={'#'}><Image src={master_card} alt="master_card" /></Link>
                <Link href={'#'}><Image src={Western_union} alt="Western_union" /></Link>
            </div>

        </div>
    </div>
  );
};

export default Footer;
