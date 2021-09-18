import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="navbar h-24 flex w-4/5 mx-auto justify-between items-center">
        <div className="navbar__logo text-gray-50 font-bold text-2xl">
          <a href="#">Chair .</a>
        </div>
        <div className="navbar__links">
          <ul className="navbar__ul flex text-gray-100">
            <li className="navbar__li">
              <a href="#" className="navbar__link">
                Discover
              </a>
            </li>
            <li className="navbar__li">
              <a href="#" className="navbar__link">
                Products
              </a>
            </li>

            <li className="navbar__li">
              <a href="#" className="navbar__link">
                Solutions
              </a>
            </li>
            <li className="navbar__li">
              <a href="#" className="navbar__link">
                Reach
              </a>
            </li>
            <li className="navbar__li navbar__li-order">
              <a
                href="#"
                className="navbar__link mr-0 px-5 py-2 bg-gray-700 rounded-md text-gray-50"
              >
                Order
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="header flex w-4/5 mx-auto mt-24">
        <div className="header__left mr-24">
          <h1 className="header__left-title text-gray-50 text-8xl capitalize text-center leading-normal">
            E commerce page in under 10 min
          </h1>
        </div>
        <div className="header__right flex justify-center items-center">
          <div className="container">
            <div className="header__right-content">
              <p className="text-gray-50 text-lg text-center w-4/5 mx-auto">
                Accept QR payments, select local delivery, link with Instagram,
                Tiktok and much more. Free to use under 20 orders per month.
              </p>
            </div>
            <div className="header__right-register w-full mt-8">
              <Link href={`/register`}>
                <a className="w-4/5 mx-auto px-5 py-3 rounded-md text-center bg-gray-900 text-gray-50 block text-xl">
                  Register Here
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
