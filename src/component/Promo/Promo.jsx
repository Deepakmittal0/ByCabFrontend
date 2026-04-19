import React, { useRef, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import lowcab from "/image/cablow.png";
import { useEffect } from "react";
import "./Promo.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";
import {
  AIRPORT_VEHICLE_IMAGES,
  AIRPORT_VEHICLE_LABELS,
} from "../../airport/airport_city.js";

const faqData = [

  {
    question: "How to change pickup, drop, date and time?",
    answer: `Please click on edit to change date, time or location on top of this page.`,
  },
  {
    question:
      "Are Driver charges / Driver bata included in the price? Do i need to arrange for Driver food and accomodation during the trip?",
    answer: `Yes, all driver charges are included in the price. Driver will take care of his food and accomodation. You need not to arrange that.`,
  },
  {
    question: "What are extra charges if i need to travel in night hours?",
    answer: `There is no extra charges for traveling in night hours. Night charges are included in the price.`,
  },
  {
    question: "Is local sightseeing included in outstation trip?",
    answer: `For Round trip bookings, all the local sightseeing in mentioned cities is included.
For One way trip, with only one pickup and one drop, sightseeing is not included.`,
  },
  {
    question: "How much before departure, i have to book the cab?",
    answer: `Although you can book the cab up to 2-3 hours prior to departure time but we suggest to book 1 day in advance to avoid last minute rush.`,
  },
  {
    question:
      "I want to book cab without paying any advance amount. I will pay on boarding the cab.",
    answer: `Sorry, it is not possible. You need to pay a small 15-20% amount in advance to book the cab.`,
  },
  {
    question: "Can I book cab by calling customer support?",
    answer: `We are happy to provide you any clarifications required through customer support team but cab booking has to be done through our website.`,
  },
  {
    question: "Please tell me any extra charge other than the price shown above.",
    answer: `5% GST is extra.
Parking charges, if any, are extra and need to be paid by you as per actuals.
Toll tax and State tax may or may not be extra depending on the trip. Please check 'Other Terms' mentioned below price.`,
  },
  {
    question:
      "I need a one way cab for travelling to more than one destination.",
    answer: `One-way trips are available only for a single pickup and drop location. For multiple destinations or multi-city travel, please contact our support team—we’ll help you with a customized cab plan.`,
  },
  {
    question:
      "Can we pickup additional passengers on the way in one way trip?",
    answer: `For One way trip with only one pickup and one drop, Additional pickup or drop will incur additional charges.`,
  },
  {
    question: "Do I need to pay both side Toll tax for one way trip?",
    answer: `For One way trip, you need to pay one side Toll tax only.`,
  },
  {
    question: "Whether the cab will have FASTag?",
    answer: `Yes, all our cabs have FASTag installed by default.`,
  },
  {
    question: "Where to mention the complete pickup address?",
    answer: `You will have the option to mention complete pickup address on next screen.`,
  },
  {
    question: "When will I get car and driver details after booking?",
    answer: `In most cases, car and driver details are shared within minutes after booking. In few rare cases, it may take more time and may be shared up to two hours before departure.`,
  },
 {
  question: "Will advance amount be refunded if I cancel the booking?",
  answer: (
    <>
      It may or may not be refunded. Please refer to{" "}
      <Link to="/refund">
  Cancellation and Refund Policy
</Link>{" "}
      for details.
    </>
  ),
},
  {
    question: "Can I travel with pets?",
    answer: `Yes, you can. But you will be charged an additional amount of Rs. 840 for small cars (hatchback, Sedan) and Rs. 1050 for bigger cars (SUV, Innova). Please select 'Pet Allowed' add-on while booking.`,
  },
  {
    question:
      "How can i make the advance payment? Which payment gateway should i choose?",
    answer: `You can pay with all online payment modes like Netbanking, Debit / Credit card, UPI, Payment Wallet Apps like PhonePe, GooglePay, PayTM etc.
To pay with Netbanking, Debit / Credit card, UPI, you can choose any payment gateway (PayTM or RazorPay).
To pay with PayTM wallet, choose 'PayTM' payment gateway.
To pay with other payment wallet apps like PhonePe, GooglePay etc, choose 'RazorPay' payment gateway.`,
  },

];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function getRazorpayKeyId() {
  const raw =
    import.meta.env.VITE_RAZORPAY_KEY_ID ?? import.meta.env.VITE_Razorpay_Test_Key_ID;
  return raw != null ? String(raw).trim() : "";
}

// ✅ FAQ Component (Separate Proper Component)
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1100px] mx-auto p-4 mt-16 font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <h2 className="mb-4 font-semibold text-2xl text-[#222]">Frequently Asked Questions (FAQs)</h2>

      {faqData.map((item, index) => (
        <div
          key={index}
          className="mb-2.5 rounded-[10px] bg-[#f9f9f9] hover:bg-[#f1f1f1] shadow-[0_0_5px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer select-none transition-colors duration-300"
          onClick={() => toggle(index)}
        >
          <div className="py-[15px] px-5 font-[700] text-base flex justify-between items-center">
            {item.question}
            <span
              className={`text-[#222] text-2xl transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
            >
              {openIndex === index ? "−" : "+"}
            </span>
          </div>

          <div
            className={`overflow-hidden transition-[max-height,padding] duration-400 ease-in-out text-[0.95rem] leading-normal text-[#555] whitespace-pre-line ${
              openIndex === index ? "max-h-[500px] p-[10px_20px_20px_20px]" : "max-h-0 px-5"
            }`}
          >
            {item.answer || "Answer coming soon."}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Build cab cards for /cablist from bundled airport slab (no API). */
function buildAirportTransferCabCards(airportCityFare) {
  if (!airportCityFare?.price) return [];

  return AIRPORT_VEHICLE_LABELS.map((label) => {
    const price = Number(airportCityFare.price[label.key]);
    const extraPer = airportCityFare.extraFarePerKm?.[label.key];

    const oldPrice = Math.round(Number.isFinite(price) ? price * 1.09 : 0);

    return {
      img: AIRPORT_VEHICLE_IMAGES[label.key],
      img1: "https://cabbazar.com/assets/img/icons/lowest-price.png",
      oldPrice,
      price: Number.isFinite(price) ? price : 0,
      type: label.type,
      name: label.name,
      extra: `₹ ${extraPer || 0}/Km`,
      _airportIncludedKm: airportCityFare.includedKm,
      _airportToll: airportCityFare.tollStateTax,
      _airportFuel: airportCityFare.fuelCharges,
      _airportDriver: airportCityFare.driverCharges,
      _airportNight: airportCityFare.nightCharges,
    };
  });
}

// ✅ MAIN COMPONENT (Promo Page)
function Promo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [cabdata, setCabdata] = useState([]);
  const [distanceKm, setDistanceKm] = useState(null);
  const [billKm, setBillKm] = useState(null);
  const [cabFetchError, setCabFetchError] = useState(null);
  const [cabsLoading, setCabsLoading] = useState(false);
  /** 'best' | 'inclusive' — round trip only */
  const [priceView, setPriceView] = useState("best");
  const [showModal, setShowModal] = useState(false);
  //  const [show, setShow] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
    pickupAddress: "",
  });
  const paymentInFlight = useRef(false);

  useEffect(() => {
    const bookingdata = localStorage.getItem("bookingdata");
    if (bookingdata) {
      const parsedData = JSON.parse(bookingdata);
      setData(parsedData);
      setBookingForm((prev) => ({ ...prev, mobile: parsedData.mobile || "" }));
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (!data) return undefined;
    const isLocalRental =
      data.tripType === "local" && data.localSubType === "rental";
    const isAirportTransfer =
      data.tripType === "local" && data.localSubType === "airport";
    let cancelled = false;
    const run = async () => {
      setCabsLoading(true);
      setCabFetchError(null);
      try {
        if (isAirportTransfer) {
          const fare = data.airportCityFare;
          if (!fare?.price) {
            if (!cancelled) {
              setCabFetchError(
                "Missing airport fare data. Please start again from the home page.",
              );
              setCabdata([]);
              setDistanceKm(null);
              setBillKm(null);
            }
          } else if (!cancelled) {
            setCabdata(buildAirportTransferCabCards(fare));
            setDistanceKm(fare.includedKm ?? null);
            setBillKm(null);
          }
          return;
        }
        if (isLocalRental) {
          const { data: res } = await axios.post(
            `${import.meta.env.VITE_API}/api/v1/get-local-rental-cabs`,
            {
              packageKey: data.localPackage,
              city: data.cities?.[0] ?? "",
              mobile: data.mobile,
            },
          );
          if (cancelled) return;
          setCabdata(Array.isArray(res?.cabs) ? res.cabs : []);
          setDistanceKm(null);
          setBillKm(null);
        } else {
          const pv = data.tripMode === "round" ? priceView : "best";
          const { data: res } = await axios.post(
            `${import.meta.env.VITE_API}/api/v1/getcabdetails`,
            {
              cities: data.cities,
              tripType: data.tripType,
              tripMode: data.tripMode,
              mobile: data.mobile,
              placeIds: data.placeIds ?? [],
              priceView: pv,
            },
          );
          if (cancelled) return;
          if (res?.cabs) {
            setCabdata(res.cabs);
            setDistanceKm(res.distanceKm ?? null);
            setBillKm(res.billKm ?? null);
          } else if (Array.isArray(res)) {
            setCabdata(res);
            setDistanceKm(null);
            setBillKm(null);
          } else {
            setCabdata([]);
            setDistanceKm(null);
            setBillKm(null);
          }
        }
      } catch (error) {
        if (cancelled) return;
        console.error("Error fetching cab details:", error);
        setCabdata([]);
        setDistanceKm(null);
        setBillKm(null);
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Could not load cab prices.";
        setCabFetchError(msg);
      } finally {
        if (!cancelled) setCabsLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [data, priceView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNowClick = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };



// check box

const ADD_ONS = [
  { id: "luggage", label: "Assured luggage space", price: 315 },
  { id: "carModel", label: "Confirmed Car Model 2022+", price: 420 },
  { id: "driverLang", label: "Preferred Driver language", price: 315 },
  { id: "pet", label: "Pet Allowed for travel", price: 840 },
  { id: "refundable", label: "Refundable booking canellation amount (before 6 hours of departure time)", price: 221 },
];


const handleAddonChange = (addon) => {
  setSelectedAddons((prev) => {
    const exists = prev.find((a) => a.id === addon.id);

    if (exists) {
      return prev.filter((a) => a.id !== addon.id);
    } else {
      return [...prev, addon];
    }
  });
};
// const addonTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
// const finalAmount = advanceAmount + addonTotal;




  const displayedCabs = cabdata;

  const createRazorpayOrder = async (pricevalue) => {
    try {
      const { data: res } = await axios.post(`${import.meta.env.VITE_API}/api/v1/createpayment-session`, {
        amount: pricevalue,
        user_data: bookingForm,
      });
      if (res.data?.success && res.data?.data?.order_id) {
        return res.data.data;
      }
      alert("something went wrong");
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
    return null;
  };

  const verifyPayment = async (payload) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/verify-payment`, payload);
      console.log(res.data);
      if (res.data.success) {
        const orderId = res.data.data?.order_id ?? payload.razorpay_order_id;
        alert("Payment Successful !!!");
        sendBookingData(orderId);
      } else {
        alert("Payment Failed !!!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went Wrong !!!");
    }
  };

  const sendBookingData = async (orderId) => {
    try {
      const { data: res } = await axios.post(`${import.meta.env.VITE_API}/api/v1/booking`, {
        bookingForm: bookingForm,
        selectedCar: selectedCar,
        tripdata: data,
        orderId: orderId,
        extraAmount: addonTotal
      });
      console.log(res);
      if (res.success) {
        alert("Booking Successful !!!");
        localStorage.clear();
        navigate("/");
      } else {
        alert("Booking Failed !!!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went Wrong !!!");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (paymentInFlight.current) return;
    const keyId = getRazorpayKeyId();
    if (!keyId) {
      alert("Razorpay Key ID is missing. Add VITE_RAZORPAY_KEY_ID to your .env file.");
      return;
    }
    paymentInFlight.current = true;
    try {
      const scriptOk = await loadRazorpayScript();
      if (!scriptOk || !window.Razorpay) {
        alert("Unable to load payment SDK. Please refresh the page.");
        paymentInFlight.current = false;
        return;
      }
      // const orderData = await createRazorpayOrder(selectedCar.price);
      const payableAmount = advanceAmount + addonTotal;

const orderData = await createRazorpayOrder(payableAmount);
      if (!orderData) {
        paymentInFlight.current = false;
        return;
      }

      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "ByCab",
        description: "Cab booking payment",
        order_id: orderData.order_id,
        handler: (response) => {
          paymentInFlight.current = false;
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: bookingForm.name,
          email: bookingForm.email,
          contact: bookingForm.mobile,
        },
        theme: { color: "#ffcc00" },
        modal: {
          ondismiss: () => {
            paymentInFlight.current = false;
          },
        },
      };

      const rz = new window.Razorpay(options);
      rz.on("payment.failed", () => {
        paymentInFlight.current = false;
        alert("Payment failed");
      });
      rz.open();
    } catch (error) {
      paymentInFlight.current = false;
      console.log(error);
      alert("something went wrong");
    }
  };

  const spinnerLg = (
    <div
      className="h-14 w-14 rounded-full border-[4px] border-[#e8e8e8] border-t-[#ffcc00] border-r-[#ffcc00] animate-spin"
      aria-hidden
    />
  );

  const pageLoader = (
    <div
      className="flex flex-col items-center justify-center py-20 px-6 min-h-[260px] w-full"
      role="status"
      aria-live="polite"
    >
      {spinnerLg}
      <p className="mt-6 text-lg font-semibold text-[#1a1a1a] tracking-tight">Loading your trip</p>
      <p className="mt-1.5 text-sm text-[#666] text-center max-w-sm">Please wait…</p>
    </div>
  );

  const cabLoader = (
    <div
      className="flex flex-col items-center justify-center py-20 px-6 min-h-[260px] w-full"
      role="status"
      aria-live="polite"
    >
      {spinnerLg}
      <p className="mt-6 text-lg font-semibold text-[#1a1a1a] tracking-tight">Loading cab options</p>
      <p className="mt-1.5 text-sm text-[#666] text-center max-w-sm">
        Calculating fares for your route…
      </p>
    </div>
  );
const tripLabel =
  data?.tripMode === "round" ? "Round trip" : "One-way route";

  const triparrow=data?.tripMode==="round"?"⇄":"➜";
  const totalAmount = selectedCar?.price || 0;
const advanceAmount = Math.round(totalAmount * 0.25);


const addonTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
const finalAmount = advanceAmount + addonTotal;




const dateRef = useRef(null);
const timeRef = useRef(null);

// useEffect(() => {
//   if (!bookingForm.date) return;

//   const today = new Date().toISOString().split("T")[0];

//   if (bookingForm.date === today) {
//     const now = new Date();
//     now.setHours(now.getHours() + 2);

//     const hours = String(now.getHours()).padStart(2, "0");
//     const minutes = String(now.getMinutes()).padStart(2, "0");

//     setBookingForm((prev) => ({
//       ...prev,
//       time: `${hours}:${minutes}`, // ✅ auto set time
//     }));
//   }
// }, [bookingForm.date]);

useEffect(() => {
  if (!bookingForm.date) {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const future = new Date();
    future.setHours(future.getHours() + 2);

    const hours = String(future.getHours()).padStart(2, "0");
    const minutes = String(future.getMinutes()).padStart(2, "0");

    setBookingForm((prev) => ({
      ...prev,
      date: todayStr,
      time: `${hours}:${minutes}`,
    }));
  }
}, []);



const getMinTime = () => {
  const today = new Date().toISOString().split("T")[0];

  if (bookingForm.date === today) {
    const now = new Date();
    now.setHours(now.getHours() + 2);

    // ✅ Round minutes (optional but better UX)
    now.setMinutes(Math.ceil(now.getMinutes() / 5) * 5);

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  return "00:00";
};



  return (
    <>
      <Navbar />
      
      {loading ? (
        <div
          className="min-h-[60vh] flex items-center justify-center px-4"
          style={{ marginTop: "70px" }}
        >
          {pageLoader}
        </div>
      ) : data === null ? (
        <div></div>
      ) : (
        <div className="px-4 py-4 max-w-[1200px] mx-auto max-md:px-3" style={{ marginTop: "30px" }}>
         <div className="bg-white p-3 rounded-[12px] shadow-sm ">

  {/* Trip Type */}


  <div className="text-sm text-gray-600 mb-2" style={{fontSize:"18px",fontWeight:"600"}}>
    
    {data.tripType === "local" && data.localSubType === "rental"
      ? "Local rental"
      : data.tripType === "local" && data.localSubType === "airport"
        ? "Airport transfer"
        : `Trip Type : ${data.tripType}`}
  </div>
  
  <div className="local">

  {/* Route UI */}
  {data.tripType === "local" && data.localSubType === "rental" ? (

    <div className="bg-yellow-400 local-head text-black px-4 py-2 rounded-full inline-block font-medium" style={{alignItems:"center",display:"flex"}}>
      {data.cities?.[0]}
    </div>








  ) : data.tripType === "local" && data.localSubType === "airport" ? (
<div className="d-fle">
    <div className="flex items-center gap-2 ">
      

      <div className="bg-yellow-400 px-4 py-2 rounded-full font-medium"  >
        {data.airportName}
      </div>

      <span className="text-xl font-bold">➜</span>

      <div className="bg-yellow-400 px-4 py-2 rounded-full font-medium">
        {data.destinationCity}
      </div>
      </div>

    </div>

  ) : (

    <div className="d-flex items-center gap-2">

      <div className="bg-yellow-400 px-4 py-2 rounded-full font-medium">
        {data.cities?.[0]}
      </div>

      <span className="text-xl font-bold">{triparrow}</span>

      <div className="bg-yellow-400 px-4 py-2 rounded-full font-medium">
        {data.cities?.[1]}
      </div>

    </div>
)}

{/* {distanceKm != null && ( */}
<div className="d-flex items-center  gap-3 mt-2">

  {/* LEFT (same as before) */}
{distanceKm != null && (
  <div
    className="text-gray-500 dis"
    style={{ fontSize: "15px", fontWeight: "600" }}
  >
    {tripLabel} ~ {distanceKm} km

    {data?.tripMode === "round" && billKm != null && (
      <span> Total Distance - {billKm} km</span>
    )}
  </div>
)}

  {/* RIGHT (Updated UI like image) */}
 <div className="flex items-center justify-between flex-wrap gap-3 mt-2">

  



<div className="flex items-center gap-2  dates">
  {/* CLICKABLE UI */}
  <div
    className="flex items-end gap-2 text-blue-600 cursor-pointer"
    onClick={() => dateRef.current?.showPicker()} // ✅ open date 
  style={{
  fontSize:"10px"
  }} >

    {/* BIG DATE */}
    <span className="text-4xl font-extrabold leading-none fake-date">
      {new Date(bookingForm.date).getDate()}
    </span>

    {/* MONTH + TIME */}
    <div className="flex flex-col leading-tight fake-month">
      <span className="text-sm font-semibold">
        {new Date(bookingForm.date).toLocaleString("en-IN", {
          month: "short",
          year: "numeric",
        })}
      </span>

      <span
        className="text-lg font-bold"
        onClick={(e) => {
          e.stopPropagation(); 
          timeRef.current?.showPicker(); // ✅ open time
        }}
      >
        {new Date(`1970-01-01T${bookingForm.time}`).toLocaleString(
          "en-IN",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }
        )}
      </span>
    </div>
  </div>

  {/* REAL INPUTS (hidden but working) */}
  <input
    ref={dateRef}
    type="date"
    name="date"
    value={bookingForm.date}
    onChange={handleInputChange}
    min={new Date().toISOString().split("T")[0]}
    className="absolute opacity-0 pointer-events-none"
  />

  <input
    ref={timeRef}
    type="time"
    name="time"
    value={bookingForm.time}
    onChange={handleInputChange}
    min={getMinTime()}
    className="absolute opacity-0 pointer-events-none"
  />

  {/* EDIT ICON */}
  <span
    className="text-red-500 text-xl cursor-pointer"
    onClick={() => dateRef.current?.showPicker()}
  >
   <span style={{fontSize:"20px"}}> ✏️</span>
  </span>
</div>
</div>

<div >

  <a href="/" className="date-had">
  Return Book {tripLabel} for maximum savings
</a>
</div>
</div>

</div>
 
 
{/* // )} */}

</div>

          <div className="container my-4">
  <div className="row align-items-center shadow rounded overflow-hidden psec">

    {/* Left Section */}
    <div className="col-md-4">
  <div className="bg-warning rounded-4 overflow-hidden lsec">

    {/* Content */}
    <div className="p-3 text-center" style={{marginTop:"-20px"}}>
      <small className="d-block text-dark fw-medium">
        Frequent Rider Plan
      </small>

      <h6 className="fw-bold mb-0">
        Flat ₹200 off on every ride
      </h6>
    </div>

    {/* Button */}
    <button className="bt btn1 btn-warning w-100 fw-semibold rounded-0 border-top">
      Buy Now
    </button>

  </div>
</div>

    {/* Right Section */}
    <div className="col-md-8 bg-white " style={{ marginTop: "-35px" }}>
<img src="https://cabbazar.com/assets/img/background/banner_web_2.png" alt="" />
    </div>

  </div>
</div>

          {data.tripMode === "round" &&
            !(data.tripType === "local" && data.localSubType === "rental") &&
            !(data.tripType === "local" && data.localSubType === "airport") && (
            <>
              <div className="flex mb-5 flex-wrap max-md:flex-col max-md:w-[320px] max-md:mx-auto rounded-[10px] overflow-hidden border border-[#e5e5e5]">
                <button
                  type="button"
                  className={`flex-1 p-3 border-none cursor-pointer font-bold transition-colors duration-200 min-h-[48px] max-md:text-sm ${
                    priceView === "best" ? "bg-[#ffcc00] text-black" : "bg-[#b4b1b1] text-[#333]"
                  }`}
                  onClick={() => setPriceView("best")}
                  aria-pressed={priceView === "best"}
                >
                  Best Price
                </button>
                <button
                  type="button"
                  className={`flex-1 p-3 border-none cursor-pointer font-bold transition-colors duration-200 min-h-[48px] max-md:text-sm leading-snug ${
                    priceView === "inclusive" ? "bg-[#ffcc00] text-black" : "bg-[#b4b1b1] text-[#333]"
                  }`}
                  onClick={() => setPriceView("inclusive")}
                  aria-pressed={priceView === "inclusive"}
                >
                  Toll, State tax Inclusive Price
                </button>
              </div>
            </>
          )}

          {cabFetchError && (
            <p className="text-sm text-red-600 mb-4 text-center sm:text-left" role="alert">
              {cabFetchError}
            </p>
          )}

          <div className="relative">
            {cabsLoading && displayedCabs.length > 0 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/75 backdrop-blur-[2px] min-h-[200px]">
                <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#eee]">
                  <div
                    className="h-10 w-10 rounded-full border-[3px] border-[#eee] border-t-[#ffcc00] animate-spin"
                    aria-hidden
                  />
                  <p className="mt-3 text-sm font-semibold text-[#333]">Updating prices…</p>
                </div>
              </div>
            )}

            {cabsLoading && displayedCabs.length === 0 ? (
              cabLoader
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {displayedCabs.map((car, index) => {
                  const isLocalRental =
                    data.tripType === "local" && data.localSubType === "rental";
                  const isAirportTransfer =
                    data.tripType === "local" && data.localSubType === "airport";
                  return (
                  <div
                    className="bg-white rounded-2xl relatives p-6 md:p-7 lg:p-8 border border-[#eaeaea] shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col items-stretch transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)]"
                    key={index}
                  >
                    <div className="relative w-full  flex justify-center items-center pt-2 pb-1 min-h-[140px] md:min-h-[160px] shrink-0">
                      <img
                        src={car.img}
                        alt=""
                        className="w-full max-w-[min(100%,320px)] h-auto object-contain max-h-[190px] md:max-h-[190px] md:max-mt-[15px]"
                      />
                      <img
                        src={lowcab}
                        alt=""
                        className="absolute top-0 left-0 lowcab w-[75px] md:w-[80px] h-auto z-[1] drop-shadow-md"
                      />
                    </div>

                    <div className="text-center mb-3 shrink-0">
                      <div className="text-red-500 text-sm line-through decoration-2 opacity-90">₹ {car.oldPrice}</div>
                      <h2 className="text-[1.85rem] md:text-[2rem] font-extrabold text-green-600 leading-tight mt-1 tracking-tight">
                        <span className="prs">₹ {car.price}</span>
                      </h2>
                      <p className="text-[0.8rem] track md:text-sm text-[#0077cc] font-bold uppercase tracking-wide mt-3 leading-snug px-1 bold">
                        {car.type}
                      </p>
                      <p className="text-[0.95rem] track text-[#555] mt-2 leading-snug bold">{car.name}</p>
                    </div>

                    <div className="mt-auto w-full flex flex-col gap-4">
                      <div className="w-full rounded-xl bg-[#f8f9fa] border track border-[#d8d8d8] px-4 py-3 md:px-5 md:py-3.5 text-[13px] md:text-sm text-[#333]" style={{fontSize:"16px !important",fontWeight:"600"}}>
                        {isAirportTransfer ? (
                          <>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3">
                              <span className="shrink-0 font-semibold text-[#1a1a1a] bold ">Included Km:</span>
                              <span className="min-w-0 text-right font-semibold tabular-nums text-green-600">
                                {car._airportIncludedKm != null
                                  ? `${car._airportIncludedKm} km`
                                  : "—"}
                              </span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3">
                              <span className="shrink-0 font-semibold text-[#1a1a1a]">Extra fare/Km:</span>
                              <span className="min-w-0 text-right font-semibold tabular-nums text-green-600">
                                {car.extra}
                              </span>
                            </div>
                            {/* <div className="my-2.5 border-t border-[#e5e5e5]" /> */}
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333] bold">Toll, State Tax:</span>
                              <span className="text-right font-semibold text-green-600 capitalize">
                                {car._airportToll ?? "included"}
                              </span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333] bold">Fuel Charges:</span>
                              <span className="text-right font-semibold text-green-600 capitalize">
                                {car._airportFuel ?? "included"}
                              </span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333] bold">Driver Charges:</span>
                              <span className="text-right font-semibold text-green-600 capitalize">
                                {car._airportDriver ?? "included"}
                              </span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333] bold">Night Charges:</span>
                              <span className="text-right font-semibold text-green-600 capitalize">
                                {car._airportNight ?? "included"}
                              </span>
                            </div>
<div
  className="text-center mt-3"
  style={{ cursor: "pointer", color: "#f59e0b", fontWeight: "600" }}
 onClick={() => setShowTerms(true)}
>
  other term
</div>
<Modal show={showTerms} onHide={() => setShowTerms(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Other Charges and Taxes</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
     <ul>
    <li>Vehicle and fuel charges included</li>
    <li>Driver Night Charges included</li>
    {/* <li>For Round trip bookings, all the local sightseeing in the mentioned cities is included except pickup city.</li> */}
    <li>5% GST Extra</li>
    <li>Included Kilometers will start from pickup location</li>
    {/* <li>Driver allowance includes driver's stay, food and night charges</li> */}
    {/* <li>Toll and state tax extr </li> */}
    <li>Parking charges extra if applicable</li>
    <li>AC will reklmain switch off in hill areas</li>
    <li>Toll and state tax included </li>
    {/* <li>For round trip booking, Kilometers will count from pickup location to pickup location</li> */}
</ul>
     


     
    </ul>
  </Modal.Body>

  <Modal.Footer className="justify-content-center">
    <Button variant="warning" onClick={() => setShowTerms(false)}>
  Okay
</Button>
  </Modal.Footer>
</Modal>
           



                          </>
                        ) : isLocalRental ? (
                          <>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3">
                              <span className="shrink-0 font-semibold text-[#1a1a1a]">Included:</span>
                              <span className="min-w-0 text-right font-semibold text-green-600">
                                {car.includedLabel ?? "—"}
                              </span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3">
                              <span className="shrink-0 font-semibold text-[#1a1a1a]">Extra fare/Km:</span>
                              <span className="min-w-0 text-right font-semibold tabular-nums text-green-600">
                                {car.extra}
                              </span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3">
                              <span className="shrink-0 font-semibold text-[#1a1a1a]">Extra fare/Hour:</span>
                              <span className="min-w-0 text-right font-semibold tabular-nums text-green-600">
                                {car.extraHour ?? "—"}
                              </span>
                            </div>
                            {/* <div className="my-2.5 border-t border-[#e5e5e5]" /> */}
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333]">Fuel Charges:</span>
                              <span className="text-right font-semibold text-green-600">Included</span>
                            </div>
                            
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333]">Driver Charges:</span>
                              <span className="text-right font-semibold text-green-600">Included</span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333]">Night Charges:</span>
                              <span className="text-right font-semibold text-green-600">Included</span>
                            </div>


<div
  className="text-center mt-5"
  style={{ cursor: "pointer", color: "#f59e0b", fontWeight: "600" }}
  onClick={() => setShowTerms(true)}
>
  other term
</div>
<Modal show={showTerms} onHide={() => setShowTerms(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Other Charges and Taxes</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      <li>- Vehicle and fuel charges included</li>
      <li>- Driver Night Charges included</li>
      <li>- 5% GST Extra</li>
      <li>- Included Kilometers will start from pickup location</li>
      <li>- Driver allowance includes stay, food and night charges</li>
     
      <li>- Parking charges extra if applicable</li>
     

      {/* ✅ ROUND TRIP TERMS */}
      { data.localSubType === "rental" && (
        <>
          <li>- For Round trip bookings, all the local sightseeing in the</li> 
          <li>  mentioned cities is included except pickup city.</li>
           <li>- AC will remain switch off in hill areas</li>
           <li>- Toll and state tax extra</li>
           <li>- Kilometers will count from pickup location to pickup location</li>
        </>
      )}

      {/* ✅ ONE WAY TERMS */}
     {/* {data.localSubType === "airport" ? (
  <li>- AC will remain switch off in hill areas (Airport case)</li>
) : (
  // <li>- AC will remain switch off in hill areas</li>
)} */}
     
    </ul>
  </Modal.Body>

  <Modal.Footer className="justify-content-center">
   <Button variant="warning" onClick={() => setShowTerms(false)}>
  Okay
</Button>
  </Modal.Footer>
</Modal>


                          </>
                        ) : (
                          <>
                            <div className="flex min-h-[2.25rem] items-center  justify-between gap-3" style={{fontSize:"16px !important",fontWeight:"600"}}>
                              <span className="shrink-0 font-semibold text-[#1a1a1a] ">Included Km:</span>
                              <span className="min-w-0 text-right font-semibold tabular-nums text-green-600">
                                {distanceKm != null ? `${billKm} km` : "—"}
                              </span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3">
                              <span className="shrink-0 font-semibold text-[#1a1a1a]">Extra fare/Km:</span>
                              <span className="min-w-0 text-right font-semibold tabular-nums text-green-600">{car.extra}</span>
                            </div>

                            {((data.tripMode === "round" && priceView === "inclusive") ||
                              data.tripMode === "oneway") && (
                              <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                                <span className="shrink-0 font-medium text-[#333]">Toll, State Tax :</span>
                                <span className="text-right font-semibold text-green-600">Included</span>
                              </div>
                            )}

                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333]">Fuel Charges:</span>
                              <span className="text-right font-semibold text-green-600">Included</span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333]">Driver Charges:</span>
                              <span className="text-right font-semibold text-green-600">Included</span>
                            </div>
                            <div className="flex min-h-[2.25rem] items-center justify-between gap-3 text-[#555]">
                              <span className="shrink-0 font-medium text-[#333]">Night Charges:</span>
                              <span className="text-right font-semibold text-green-600">Included</span>
                            </div>

<div
  className="text-center mt-5"
  style={{ cursor: "pointer", color: "#f59e0b", fontWeight: "600" }}
 onClick={() => setShowTerms(true)}
>
  other term
</div>

<Modal show={showTerms} onHide={() => setShowTerms(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Other Charges and Taxes</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
     <ul>

      {/* round trip vala part */}
    <li>- Vehicle and fuel charges included</li>
    <li>- Driver Night Charges included</li>
    <li>- For Round trip bookings, all the local sightseeing in the mentioned cities is included except pickup city.</li>
    <li>- 5% GST Extra</li>
    <li>- Included Kilometers will start from pickup location</li>
    <li>- Driver allowance includes driver's stay, food and night charges</li>
   
    <li>- Parking charges extra if applicable</li>
    <li>- AC will remain switch off in hill areas</li>
    <li>- For round trip booking, Kilometers will count from pickup location to pickup location</li>
</ul>

    
          {priceView === "inclusive" && (
  <ul>
    
    <li>- Toll and state tax included</li>
  </ul>
      )}


{/* {priceView === "best" && (
  <ul>
    
    <li>- Toll and state tax extra
      
    </li>

  </ul>
      )} */}


      {/* ✅ ONE WAY TERMS */}

      {/* oneWay part */}
      {data.tripMode === "oneway" && (
        <>
        <ul>
          {/* <li>- One way trip includes only pickup & drop</li> */}
          {/* <li>- Sightseeing not included in one way trip</li> */}
          {/* <li>- Toll and state tax included</li>  */}
        <li>- One way trip includes only one pickup and one drop. Additional pickup or drop on the way will incur additional charges of Rs. 250 per pickup / drop.</li>
      </ul>  </>
      )}
    </ul>
  </Modal.Body>

  <Modal.Footer className="justify-content-center">
    <Button variant="warning" onClick={() => setShowTerms(false)}>
  Okay
</Button>
  </Modal.Footer>
</Modal>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        className="w-full shrink-0 py-3.5 px-6 bg-[#ffcc00] hover:bg-[#ffaa00] active:scale-[0.98] border-none rounded-xl text-base font-bold text-black cursor-pointer transition-all duration-200 shadow-[0_4px_14px_rgba(255,170,0,0.35)]"
                        onClick={() => handleBookNowClick(car)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}




      {/* ✅ Booking Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-[5px] flex justify-center items-center z-1000 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white/95 p-[30px] max-h-[85vh] max-md:p-[24px_20px] max-md:max-h-[90vh] overflow-y-auto rounded-3xl w-[90%] z-100 max-w-[480px] relative shadow-[0_20px_40px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.5)] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <button
              className="absolute top-5 right-5 bg-[#f0f0f0] border-none text-[1.5rem] w-9 h-9 rounded-full flex justify-center items-center cursor-pointer text-[#666] transition-all duration-200 hover:bg-[#e0e0e0] hover:text-black hover:rotate-90"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="mb-[25px] text-[1.75rem] font-extrabold text-[#1a1a1a] text-center tracking-[-0.5px]">
              Complete Your Booking
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={bookingForm.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">Email</label>
                <input
                  type="text"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">Pickup Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">Pickup Time</label>
                <input
                  type="time"
                  name="time"
                  value={bookingForm.time}
                  onChange={handleInputChange}
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-[0.85rem] text-[#444] uppercase tracking-[0.5px]">
                  Pickup Address
                </label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={bookingForm.pickupAddress}
                  onChange={handleInputChange}
                  placeholder="Enter specific pickup location"
                  required
                  className="w-full p-[14px_18px] border-2 border-[#eee] rounded-xl text-[1rem] bg-[#fafafa] transition-all duration-200 focus:border-[#ffcc00] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#ffcc00]/15"
                />
              </div>
             <div className="mb-5">
  <label className="block mb-3 font-semibold text-[0.85rem] text-[#444] uppercase">
    Add On Service (Optional)
  </label>

  {ADD_ONS.map((addon) => (
    <label key={addon.id} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        onChange={() => handleAddonChange(addon)}
        checked={selectedAddons.some((a) => a.id === addon.id)}
      />
      {addon.label} for ₹ {addon.price}
    </label>
  ))}
</div>


{/* <button type="submit">
  Pay ₹{finalAmount} Advance & Book
</button> */}


              <button 
  type="submit"
  className="w-full p-[18px] bg-[#ffcc00] hover:bg-[#ffaa00] border-none rounded-[14px] text-[1.1rem] font-extrabold text-black cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] mt-[15px] hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(255,170,0,0.4)] active:-translate-y-px"
>
  Pay ₹{finalAmount} Advance & Book
</button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ FAQ yaha render hoga */}
      <FAQ />

      <Footer />
    </>
  );
}

export default Promo;
