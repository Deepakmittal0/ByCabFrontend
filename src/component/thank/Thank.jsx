import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Agar future me orderId pass karna ho:
  // navigate("/thank-you", { state: { orderId } })
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-[550px]">

        {/* Main Card */}
        <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden">

          {/* Top Yellow Section */}
          <div className="bg-[#ffcc00] px-6 py-10 text-center">

            {/* Success Circle */}
            <div className="mx-auto mb-5 w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center shadow-lg">

              <div className="w-[65px] h-[65px] rounded-full bg-[#22c55e] flex items-center justify-center">

                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12.5L9.5 17L19 7"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

            </div>

            <h1 className="text-[32px] md:text-[38px] font-extrabold text-[#111] leading-tight">
              Thank You!
            </h1>

            <p className="mt-2 text-[#333] text-[16px]">
              Your booking has been confirmed successfully.
            </p>

          </div>


          {/* Content */}
          <div className="px-6 md:px-10 py-8">

            {/* Success Message */}
            <div className="text-center mb-7">

              <h2 className="text-[22px] font-bold text-[#171717] mb-2">
                Booking Confirmed 🎉
              </h2>

              <p className="text-[#666] text-[15px] leading-6">
                Your payment has been successfully received and your cab
                booking is confirmed.
              </p>

            </div>


            {/* Payment Status */}
            <div className="border border-[#e7e7e7] rounded-2xl p-5 mb-5 bg-[#fafafa]">

              <div className="flex items-center justify-between py-2">

                <span className="text-[#666] text-[14px]">
                  Payment Status
                </span>

                <span className="flex items-center gap-2 text-[#16a34a] font-bold text-[14px]">
                  <span className="w-2 h-2 bg-[#22c55e] rounded-full"></span>
                  Paid
                </span>

              </div>


              <div className="border-t border-[#e5e5e5] my-2"></div>


              <div className="flex items-center justify-between py-2">

                <span className="text-[#666] text-[14px]">
                  Booking Status
                </span>

                <span className="text-[#16a34a] font-bold text-[14px]">
                  Confirmed
                </span>

              </div>


              {/* Order ID */}
              {orderId && (
                <>
                  <div className="border-t border-[#e5e5e5] my-2"></div>

                  <div className="flex items-center justify-between gap-4 py-2">

                    <span className="text-[#666] text-[14px]">
                      Order ID
                    </span>

                    <span className="text-[#222] font-semibold text-[13px] break-all text-right">
                      {orderId}
                    </span>

                  </div>
                </>
              )}

            </div>


          
          


            {/* Home Button */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-[#ffcc00] hover:bg-[#f5c400] active:scale-[0.98] transition-all duration-200 text-[#111] font-extrabold py-4 rounded-xl text-[16px] shadow-[0_8px_20px_rgba(255,204,0,0.25)]"
            >
              Back to Home
            </button>


            {/* Footer */}
            <p className="text-center text-[#999] text-[12px] mt-5">
              Thank you for choosing ByCab 🚕
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ThankYou;