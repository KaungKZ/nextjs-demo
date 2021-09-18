import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import OtpInput from "react-otp-input";

export default function register() {
  // const [value, setValue] = useState();
  const [signUp, setSignUp] = useState();
  const [otp, setOtp] = useState();
  // const [toUpdateStore, setToUpdateStore] = useState();

  const [switches, setSwitches] = useState({
    signUp: true,
    confirm: false,
    update: false,
  });
  const client = new ApolloClient({
    uri: "https://graphql.shopcat.me/",
    cache: new InMemoryCache(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleChange = (otp) => setOtp(otp);

  const onFormSubmit = async (value) => {
    console.log(otp);
    if (value.storeName) {
      try {
        const { data } = await client.mutate({
          mutation: gql`
            mutation demo {
              updateStore(
                input: {
                  name: "${value.storeName}
                  description: "${value.storeDescription}"
                  email: "${value.email}"
                  socialLinks: [
                    { type: FACEBOOK, handle: "${value.facebook}" }
                    { type: INSTAGRAM, handle: "${value.instagram}" }
                    { type: LINE, handle: "${value.line}" }
                  ]
                }
              ) {
                id
              }
            }
          `,
        });
      } catch (err) {
        console.log(err);
      }
    } else if (otp) {
      console.log("yes");
      const { data } = await client.mutate({
        mutation: gql`
          mutation demo {
            confirm (storeId: "${signUp}", code: "${otp}")
          }
        `,
      });

      setSwitches({
        signUp: false,
        confirm: false,
        update: true,
      });
    } else if (value.phoneNumber) {
      const { data } = await client.mutate({
        mutation: gql`
          mutation demo {
            signUp(phoneNumber: "${value}", phoneCountryCode: "95")
          }
        `,
      });

      setSwitches({
        signUp: false,
        update: false,
        confirm: true,
      });

      setSignUp(data.signUp);
    }
  };

  // console.log(switches);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #30444e;
        }
      `}</style>
      <div className="wrapper w-full h-screen flex justify-center items-center">
        <div className="otp min-w-[350px]">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="flex flex-col w-full items-center"
            key={2}
          >
            {switches.confirm && (
              <>
                <OtpInput
                  value={otp}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    width: "45px",
                    height: "45px",
                    fontSize: "16px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue",
                    background: "#fdfdfd",
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none",
                  }}
                  className="text-center"
                  onChange={handleChange}
                  numInputs={4}
                  separator={<span>-</span>}
                />
                <div className="submit text-center w-full">
                  <button
                    type="submit"
                    className="bg-gray-500 py-2 px-5 text-gray-200 rounded mt-5 hover:shadow-lg transition w-full"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {switches.signUp && (
              <>
                <label className="text-gray-200 w-11/12 mx-auto mb-3">
                  What is your phone number ?
                </label>
                <input
                  autoComplete="off"
                  className="w-11/12 mx-auto shadow appearance-none rounded w-full py-3 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  placeholder="Phone Number*"
                  {...register("phoneNumber", {
                    required: true,
                    pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                  })}
                />
                {errors?.phoneNumber?.type === "required" && (
                  <p className="phone_error w-11/12 mx-auto text-red-500 mt-2 text-sm pl-1">
                    This field is required
                  </p>
                )}
                {errors?.phoneNumber?.type === "pattern" && (
                  <p className="phone_error w-11/12 mx-auto text-red-500 mt-2 text-sm pl-1">
                    Please enter a valid phone number
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-gray-500 py-2 px-5 text-gray-200 rounded mt-5 hover:shadow-lg transition"
                >
                  Next
                </button>
              </>
            )}

            {switches.update && (
              <>
                <div className="store__row name mt-0">
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full mx-auto shadow appearance-none rounded w-full py-3 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    placeholder="Name*"
                    {...register("storeName", {
                      required: true,
                    })}
                  />
                  {errors?.storeName?.type === "required" && (
                    <p className="phone_error mx-auto text-red-500 mt-1 text-sm pl-1">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="store__row description">
                  <textarea
                    autoComplete="off"
                    className="w-full h-24 resize-none mx-auto shadow appearance-none rounded w-full py-3 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    placeholder="Store Description*"
                    {...register("storeDescription", {
                      required: true,
                    })}
                  />
                  {errors?.storeDescription?.type === "required" && (
                    <p className="phone_error mx-auto text-red-500 mt-1 text-sm pl-1">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="store__row email">
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full mx-auto shadow appearance-none rounded w-full py-3 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    placeholder="Email*"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {errors?.email?.type === "required" && (
                    <p className="phone_error mx-auto text-red-500 mt-1 text-sm pl-1">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="store__row facebook">
                  <input
                    autoComplete="off"
                    className="w-full mx-auto shadow appearance-none rounded w-full py-3 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    placeholder="Facebook ID*"
                    {...register("facebook", {
                      required: true,
                    })}
                  />
                  {errors?.facebook?.type === "required" && (
                    <p className="phone_error mx-auto text-red-500 mt-1 text-sm pl-1">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="store__row instagram">
                  <input
                    autoComplete="off"
                    className="w-full mx-auto shadow appearance-none rounded w-full py-3 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    placeholder="Instagram ID*"
                    {...register("instagram", {
                      required: true,
                    })}
                  />
                  {errors?.instagram?.type === "required" && (
                    <p className="phone_error mx-auto text-red-500 mt-1 text-sm pl-1">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="store__row line">
                  <input
                    autoComplete="off"
                    className="w-full mx-auto shadow appearance-none rounded w-full py-3 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    placeholder="LINE ID*"
                    {...register("line", {
                      required: true,
                    })}
                  />
                  {errors?.line?.type === "required" && (
                    <p className="phone_error mx-auto text-red-500 mt-1 text-sm pl-1">
                      This field is required
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-gray-500 py-2 px-5 text-gray-200 rounded mt-5 hover:shadow-lg transition"
                >
                  Next
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
