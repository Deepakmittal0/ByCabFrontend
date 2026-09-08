import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4 py-3">

      <div className="w-full max-w-[550px]">

        {/* Main Card */}
        <div className="bg-white rounded-[20px] shadow-[0_12px_35px_rgba(0,0,0,0.10)] overflow-hidden">

          {/* Top Yellow Section */}
          <div className="bg-[#ffcc00] px-6 py-4 text-center">

            {/* Success Circle */}
            {/* <div className="mx-auto mb-2 w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center shadow-md">

              <div className="w-[45px] h-[45px] rounded-full bg-[#22c55e] flex items-center justify-center">

                <svg
                  width="28"
                  height="28"
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

            </div> */}

            <h1 className="text-[27px] font-extrabold text-[#111] leading-tight">
              Thank You!
            </h1>

            <p className="mt-1 text-[#333] text-[13px]">
              Your booking has been confirmed successfully.
            </p>

          </div>


          {/* Content */}
          <div className="px-6 py-4">

            {/* Success Message */}
            <div className="text-center mb-3">

              {/* <h2 className="text-[18px] font-bold text-[#171717] mb-1">
                Booking Confirmed 🎉
              </h2> */}

              <p className="text-[#666] text-[12px] leading-5">
                Your advance payment has been successfully received and your
                cab booking is confirmed. The remaining balance can be paid
                directly to the driver after you board the cab.
              </p>

            </div>


            {/* Payment Status */}
            <div className="border border-[#e7e7e7] rounded-xl p-3 mb-3 bg-[#fafafa]">

              {/* Payment */}
              <div className="flex items-center justify-between">

                <span className="text-[#666] text-[12px]">
                  Payment Status
                </span>

                <span className="flex items-center gap-2 text-[#16a34a] font-bold text-[12px]">
                  <span className="w-2 h-2 bg-[#22c55e] rounded-full"></span>
                  Advance Paid
                </span>

              </div>


              <div className="border-t border-[#e5e5e5] my-1"></div>


              {/* Booking */}
              <div className="flex items-center justify-between">

                <span className="text-[#666] text-[12px]">
                  Booking Status
                </span>

                <span className="text-[#16a34a] font-bold text-[12px]">
                  Confirmed
                </span>

              </div>


              {/* Order ID */}
              {orderId && (
                <>
                  <div className="border-t border-[#e5e5e5] my-1"></div>

                  <div className="flex items-center justify-between gap-3">

                    <span className="text-[#666] text-[12px]">
                      Order ID
                    </span>

                    <span className="text-[#222] font-semibold text-[11px] break-all text-right">
                      {orderId}
                    </span>

                  </div>
                </>
              )}

            </div>


            {/* Important Notes */}
            <div className="mb-3">

              <h3 className="text-[14px] font-bold text-[#171717] mb-2">
                Important Notes
              </h3>


              {/* Driver Details */}
              <div className="mb-2">

                <p className="text-[#222] text-[12px] font-bold leading-4">
                  1. Driver Details Note:
                </p>

                <p className="text-[#666] text-[12px] leading-4">
                  Driver and cab details will be shared via WhatsApp/SMS
                  2 hours prior to your pickup time.
                </p>

              </div>


              {/* Payment Reminder */}
              <div>

                <p className="text-[#222] text-[12px] font-bold leading-4">
                  2. Payment Reminder Note:
                </p>

                <p className="text-[#666] text-[12px] leading-4">
                  Please pay the remaining balance to the driver after
                  entering the vehicle.
                </p>

              </div>

            </div>


            {/* Home Button */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-[#ffcc00] hover:bg-[#f5c400] active:scale-[0.98] transition-all duration-200 text-[#111] font-extrabold py-2.5 rounded-lg text-[13px]"
            >
              Back to Home
            </button>


            {/* Footer */}
            <p className="text-center text-[#999] text-[10px] mt-2">
              Thank you for choosing ByCab 🚕
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ThankYou;