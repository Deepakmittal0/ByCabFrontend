import React, { useState, useRef, useEffect, useMemo } from "react";
import { Row, Col, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { FaPhoneAlt, FaLocationArrow } from "react-icons/fa";
import taxi from "/image/taxi.jpg";
import Slider from "react-slick";
import  './Header.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { citydata } from "../../citydata/data.js";
import { FaCheck } from "react-icons/fa";
import airportListData from "../../airport/airport_list.js";
import {
  resolveAirportDestinationOptions,
  getDefaultAirportDestinationCityName,
} from "../../airport/airport_city.js";

const LOCAL_RENTAL_PACKAGES = [
  { key: "2h20km", label: "2 hours, 20 Km" },
  { key: "4h40km", label: "4 hours, 40 Km" },
  { key: "8h80km", label: "8 hours, 80 Km" },
  { key: "12h120km", label: "12 hours, 120 Km" },
];

/** Local rental cities from bundled Cabbazar snapshot (sorted A→Z, active only) */
const LOCAL_CITIES_CATALOG = [...citydata]
  .filter((c) => c?.isActive !== false)
  .sort((a, b) =>
    String(a?.cityName ?? "").localeCompare(String(b?.cityName ?? ""), undefined, {
      sensitivity: "base",
    }),
  );

/** Max rows shown in local city dropdown (focus empty vs type-ahead) */
const LOCAL_CITY_DROPDOWN_LIMIT = 15;

/** Airport search: cap when input empty (catalog is ~90; scroll inside panel) */
const AIRPORT_DROPDOWN_LIMIT = 120;

const HeroWithPromo = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("outstation");
  const [tripMode, setTripMode] = useState("oneway");
  const [mobile, setMobile] = useState("");
  const [cities, setCities] = useState(["", ""]);
  const [placeIds, setPlaceIds] = useState(["", ""]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  /** local / airport tab: rental vs airport (airport UI only for now) */
  const [localSubType, setLocalSubType] = useState("rental");
  const [localCity, setLocalCity] = useState("");
  const [localPackage, setLocalPackage] = useState("");
  const [airportDirection, setAirportDirection] = useState("");
  /** Selected airport `_id` from `airport_list.js` */
  const [airport, setAirport] = useState("");
  const [airportDestinationCity, setAirportDestinationCity] = useState("");
  const [airportQuery, setAirportQuery] = useState("");
  const [airportMenuOpen, setAirportMenuOpen] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [localCityMenuOpen, setLocalCityMenuOpen] = useState(false);

  // ✅ Debounce timer reference
  const debounceRef = useRef(null);

  const airportCatalog = useMemo(
    () =>
      [...airportListData]
        .filter((a) => a?.isActive !== false)
        .sort((a, b) =>
          String(a?.airportName ?? "").localeCompare(
            String(b?.airportName ?? ""),
            undefined,
            { sensitivity: "base" },
          ),
        ),
    [],
  );

  const selectedAirportRecord = useMemo(
    () => airportCatalog.find((a) => a._id === airport) ?? null,
    [airport, airportCatalog],
  );

  const airportCityOptions = useMemo(() => {
    if (!selectedAirportRecord) return [];
    return resolveAirportDestinationOptions(selectedAirportRecord);
  }, [selectedAirportRecord]);

  const selectedAirportCityRow = useMemo(
    () =>
      airportCityOptions.find((c) => c.cityName === airportDestinationCity) ??
      null,
    [airportCityOptions, airportDestinationCity],
  );

  useEffect(() => {
    if (!selectedAirportRecord) {
      setAirportDestinationCity("");
      return;
    }
    const opts = resolveAirportDestinationOptions(selectedAirportRecord);
    setAirportDestinationCity(getDefaultAirportDestinationCityName(opts));
  }, [selectedAirportRecord]);

  useEffect(() => {
    if (tripType !== "local" || localSubType !== "airport") {
      setAirportMenuOpen(false);
    }
  }, [tripType, localSubType]);

  const airportDropdownRows = useMemo(() => {
    const q = String(airportQuery ?? "").trim().toLowerCase();
    const pool = airportCatalog;
    if (!q) {
      return pool.slice(0, AIRPORT_DROPDOWN_LIMIT);
    }
    return pool.filter((a) =>
      String(a?.airportName ?? "").toLowerCase().includes(q),
    );
  }, [airportQuery, airportCatalog]);

  const localCityDropdownRows = useMemo(() => {
    const q = String(localCity ?? "").trim().toLowerCase();
    const pool = LOCAL_CITIES_CATALOG;
    if (!q) {
      return pool.slice(0, LOCAL_CITY_DROPDOWN_LIMIT);
    }
    return pool
      .filter((c) => String(c?.cityName ?? "").toLowerCase().includes(q))
      .slice(0, LOCAL_CITY_DROPDOWN_LIMIT);
  }, [localCity]);

  useEffect(() => {
    if (tripType !== "local" || localSubType !== "rental") {
      setLocalCityMenuOpen(false);
    }
  }, [tripType, localSubType]);

  // ✅ API CALL
  const fetchSuggestions = async (value) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API}/api/v1/get-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: value }),
        }
      );

      const data = await response.json();
      setSuggestions(data || []);
    } catch (error) {
      console.error("API Error:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Input Change Handler with Manual Debounce
  const handleCityChange = (value, index) => {
    const updated = [...cities];
    updated[index] = value;
    setCities(updated);
    const nextPlaceIds = updated.map((_, i) =>
      i === index ? "" : placeIds[i] ?? "",
    );
    setPlaceIds(nextPlaceIds);
    setActiveIndex(index);

    // Clear previous timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.length > 2) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 500); // 500ms debounce delay
    } else {
      setSuggestions([]);
    }
  };

  const addCity = () => {
    setCities([...cities, ""]);
    setPlaceIds([...placeIds, ""]);
  };

  // ✅ Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setSuggestions([]);
      setLocalCityMenuOpen(false);
      setAirportMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const showFormToast = (message) => {
    setToastMessage(message);
    setToastShow(true);
  };

  const handleCabData = () => {
    const mobileDigits = String(mobile ?? "").replace(/\D/g, "");
    if (mobileDigits.length < 10) {
      showFormToast("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (tripType === "outstation") {
      for (let i = 0; i < cities.length; i += 1) {
        if (!String(cities[i] ?? "").trim()) {
          showFormToast("Please fill in pickup, destination, and any extra cities.");
          return;
        }
        if (!String(placeIds[i] ?? "").trim()) {
          showFormToast("Select each location from the suggestions list so we can calculate distance.");
          return;
        }
      }
      const bookingdata = {
        tripType,
        tripMode,
        cities,
        placeIds,
        mobile: mobileDigits.slice(-10),
      };
      localStorage.setItem("bookingdata", JSON.stringify(bookingdata));
      navigate("/cablist");
      return;
    }

    if (localSubType === "airport") {
      if (!String(airportDirection ?? "").trim()) {
        showFormToast("Please choose From Airport or To Airport.");
        return;
      }
      if (!String(airport ?? "").trim()) {
        showFormToast("Please select an airport.");
        return;
      }
      if (!String(airportDestinationCity ?? "").trim()) {
        showFormToast("Please select a city.");
        return;
      }
      if (!selectedAirportCityRow || !selectedAirportRecord) {
        showFormToast("Could not load fare for this city. Try again.");
        return;
      }
      const airportCityFare = {
        cityName: selectedAirportCityRow.cityName,
        km: selectedAirportCityRow.km,
        includedKm: selectedAirportCityRow.includedKm,
        price: { ...selectedAirportCityRow.price },
        extraFarePerKm: { ...selectedAirportCityRow.extraFarePerKm },
        tollStateTax: selectedAirportCityRow.tollStateTax,
        fuelCharges: selectedAirportCityRow.fuelCharges,
        driverCharges: selectedAirportCityRow.driverCharges,
        nightCharges: selectedAirportCityRow.nightCharges,
      };
      const bookingdata = {
        tripType: "local",
        localSubType: "airport",
        tripMode: "airport_transfer",
        airportDirection,
        airportId: airport,
        airportName: selectedAirportRecord.airportName,
        airportState: selectedAirportRecord.state ?? "",
        destinationCity: airportDestinationCity,
        airportCityFare,
        cities: [
          selectedAirportRecord.airportName,
          airportDestinationCity,
        ],
        placeIds: [],
        mobile: mobileDigits.slice(-10),
      };
      localStorage.setItem("bookingdata", JSON.stringify(bookingdata));
      navigate("/cablist");
      return;
    }

    // Local rental
    if (!String(localCity ?? "").trim()) {
      showFormToast("Please enter your city.");
      return;
    }
    if (!localPackage) {
      showFormToast("Please select a package.");
      return;
    }

    const pkg = LOCAL_RENTAL_PACKAGES.find((p) => p.key === localPackage);
    const bookingdata = {
      tripType: "local",
      localSubType: "rental",
      localPackage,
      localPackageLabel: pkg?.label ?? localPackage,
      tripMode: "local_rental",
      cities: [String(localCity).trim(), ""],
      placeIds: [],
      mobile: mobileDigits.slice(-10),
    };
    localStorage.setItem("bookingdata", JSON.stringify(bookingdata));
    navigate("/cablist");
  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1080 }}>
        <Toast
          bg="dark"
          show={toastShow}
          onClose={() => setToastShow(false)}
          delay={4500}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">ByCab</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* HERO SECTION */}
      <div id="bookingForm" className="w-full min-h-screen bg-[url('https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/f49b1d42-200e-4457-a7b9-825341724fe3.jpeg')] bg-no-repeat bg-center bg-cover relative flex items-center max-md:bg-none max-md:min-h-auto" >
          <Row className="relative w-full z-[2] min-h-screen max-[450px]:!m-auto items-center max-md:min-h-[74vh] max-md:mt-10">
          <Col lg={5} md={6} xs={12} className="forms flex max-[450px]:!px-0  justify-start px-5 !-mt-20 max-md:!-mt-0">
            <div className="form bg-[#f3f3f3] rounded-[20px] p-[15px] w-full max-w-[380px] h-auto flex flex-col  max-md:!bg-transparent max-md:!w-full form-head" >
                {/* <div className="bg-[#f5b400]  m-head text-center rounded-[15px]  font-semibold">All India Cab Service</div> */}

<div className="text-center point-head ">
  <h2 className="text-[22px] font-bold text-black leading-tight">
    Book Cabs Across India
  </h2>
  <p className="text-[13px] text-gray-600  point d-flex">
    <p>Safe</p>
    <p>• Affordable </p>
    <p>• No Hidden Charges</p>
  </p>
</div>


<div className="flex flex-col gap-2.5 mb-[1px]">
  <Button
    className={
      tripType === "outstation"
        ? "!bg-[#f5b400] !rounded-[25px] !border-none font-semibold"
        : "!bg-[#ddd] !rounded-[25px] !border-none text-black"
    }
    onClick={() => setTripType("outstation")}
    style={{ padding: "9px" }}
  >
    Outstation
  </Button>

  <Button
    className={
      tripType === "local"
        ? "!bg-[#f5b400] !rounded-[25px] !border-none font-semibold"
        : "!bg-[#ddd] !rounded-[25px] !border-none text-black"
    }
    onClick={() => setTripType("local")}
    style={{ padding: "9px" }}
  >
    Local / Airport
  </Button>
</div>

                {tripType === "local" && (
                  <div
                    className="flex justify-between bg-[#e9e9e9] px-[15px] rounded-[15px] mb-[1px] cursor-pointer"
                    style={{ padding: "9px" }}
                  >
                    <span
                      onClick={() => setLocalSubType("rental")}
                      className="flex items-center"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setLocalSubType("rental");
                      }}
                    >
                      <span
                        className={
                          localSubType === "rental"
                            ? "h-[15px] w-[15px] bg-[#f5b400] rounded-full inline-block mr-1.5 ring-2 ring-black ring-inset"
                            : "h-[15px] w-[15px] border-2 border-[#f5b400] bg-transparent rounded-full inline-block mr-1.5"
                        }
                      />
                      Local Rental
                    </span>
                    <span
                      onClick={() => setLocalSubType("airport")}
                      className="flex items-center"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setLocalSubType("airport");
                      }}
                    >
                      <span
                        className={
                          localSubType === "airport"
                            ? "h-[15px] w-[15px] bg-[#f5b400] rounded-full inline-block mr-1.5 ring-2 ring-black ring-inset"
                            : "h-[15px] w-[15px] border-2 border-[#f5b400] bg-transparent rounded-full inline-block mr-1.5"
                        }
                      />
                      Airport Transfer
                    </span>
                  </div>
                )}

                {tripType === "outstation" && (
                  <div className="flex justify-between bg-[#e9e9e9]  px-[15px] rounded-[15px] mb-[1px] cursor-pointer" style={{padding:"9px"}}>
                    <span onClick={() => setTripMode("round")} className="flex items-center">
                      <span
                        className={
                          tripMode === "round"
                            ? "h-[15px] w-[15px] bg-[#f5b400] rounded-full inline-block mr-1.5 ring-2 ring-black ring-inset"
                            : "h-[15px] w-[15px] border-2 border-black rounded-full inline-block mr-1.5"
                        }
                      ></span>
                      Round Trip
                    </span>

                    <span onClick={() => setTripMode("oneway")} className="flex items-center">
                      <span
                        className={
                          tripMode === "oneway"
                            ? "h-[15px] w-[15px] bg-[#f5b400] rounded-full inline-block mr-1.5 ring-2 ring-black ring-inset"
                            : "h-[15px] w-[15px] border-2 border-black rounded-full inline-block mr-1.5"
                        }
                      ></span>
                      One Way Trip
                    </span>
                  </div>
                )}

                <Form onClick={(e) => e.stopPropagation()}>
                  {tripType === "outstation" &&
                    cities.map((city, index) => (
                      <Form.Group key={index} className="p-1 relative">
                        <Form.Control
                          type="text"
                          placeholder={
                            index === 0
                              ? "Enter pickup city"
                              : "Enter destination city"
                          }
                          value={city}
                          onChange={(e) =>
                            handleCityChange(e.target.value, index)
                          }
                          autoComplete="off"
                          className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9]"
                        />

                        <FaLocationArrow className="absolute right-[15px] top-[12px] text-gray-500" />

                        {activeIndex === index &&
                          (suggestions.length > 0 || loading) && (
                            <div className="bg-white absolute w-full top-[45px] rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-[99]">
                              {loading && (
                                <div className="px-3 py-2 cursor-pointer">
                                  Loading...
                                </div>
                              )}

                              {!loading &&
                                suggestions.map((item) => (
                                  <div
                                    key={item.place_id}
                                    className="px-3 py-2 cursor-pointer hover:bg-[#f5b400]"
                                    onClick={() => {
                                      const updated = [...cities];
                                      updated[index] = item.description;
                                      setCities(updated);
                                      const nextIds = [...placeIds];
                                      nextIds[index] = item.place_id;
                                      setPlaceIds(nextIds);
                                      setSuggestions([]);
                                    }}
                                  >
                                    <strong>
                                      {
                                        item.structured_formatting
                                          ?.main_text
                                      }
                                    </strong>
                                    <small className="text-muted d-block">
                                      {
                                        item.structured_formatting
                                          ?.secondary_text
                                      }
                                    </small>
                                  </div>
                                ))}
                            </div>
                          )}
                      </Form.Group>
                    ))}

                  {/* {tripType === "outstation" && (
                    <div
                      className="bg-[#e9d9b6] p-2.5 rounded-xl mb-[8px] mt-[3px] text-center cursor-pointer"
                      onClick={addCity}
                    >
                      + Add More City
                    </div>
                  )} */}

                  {tripType === "local" && localSubType === "rental" && (
                    <>
                      <Form.Group
                        className="p-1 relative mb-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Select City"
                          value={localCity}
                          onChange={(e) => {
                            setLocalCity(e.target.value);
                            setLocalCityMenuOpen(true);
                          }}
                          onFocus={() => setLocalCityMenuOpen(true)}
                          autoComplete="off"
                          className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9]"
                        />
                        <FaLocationArrow className="absolute right-[15px] top-[12px] text-gray-500 pointer-events-none" />
                        {localCityMenuOpen && (
                          <div className="bg-white absolute w-full top-[45px] rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-[99] max-h-[min(320px,55vh)] overflow-y-auto border border-[#eee]">
                            {localCityDropdownRows.length === 0 && (
                              <div className="px-3 py-2.5 text-sm text-muted">
                                No matching city
                              </div>
                            )}
                            {localCityDropdownRows.map((row) => (
                                <div
                                  key={row._id ?? row.cityName}
                                  className="px-3 py-2 cursor-pointer hover:bg-[#f5b400] border-b border-[#f0f0f0] last:border-b-0"
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() => {
                                    setLocalCity(String(row.cityName ?? ""));
                                    setLocalCityMenuOpen(false);
                                  }}
                                >
                                  <strong className="text-[#1a1a1a]">
                                    {row.cityName}
                                  </strong>
                                  {row.state ? (
                                    <small className="text-muted d-block">
                                      {row.state}
                                    </small>
                                  ) : null}
                                </div>
                            ))}
                          </div>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-1 relative">
                        <Form.Select
                          value={localPackage}
                          onChange={(e) => setLocalPackage(e.target.value)}
                          className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9] appearance-auto"
                        >
                          <option value="">Select package</option>
                          {LOCAL_RENTAL_PACKAGES.map((p) => (
                            <option key={p.key} value={p.key}>
                              {p.label}
                            </option>
                          ))}
                        </Form.Select>
                        <FaLocationArrow className="absolute right-[15px] top-[12px] text-gray-500 pointer-events-none opacity-60" />
                      </Form.Group>
                    </>
                  )}

                  {tripType === "local" && localSubType === "airport" && (
                    <>
                      <Form.Group className="mb-1">
                        <Form.Select
                          value={airportDirection}
                          onChange={(e) => {
                            setAirportDirection(e.target.value);
                          }}
                          className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9]"
                        >
                          <option value="">From Airport / To Airport</option>
                          <option value="from">From Airport</option>
                          <option value="to">To Airport</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        className="p-1 relative mb-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Select Airport"
                          value={airportQuery}
                          onChange={(e) => {
                            const v = e.target.value;
                            setAirportQuery(v);
                            setAirportMenuOpen(true);
                            const picked = selectedAirportRecord;
                            if (
                              picked &&
                              v.trim() !==
                                String(picked.airportName ?? "").trim()
                            ) {
                              setAirport("");
                            }
                          }}
                          onFocus={() => setAirportMenuOpen(true)}
                          autoComplete="off"
                          className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9]"
                        />
                        <FaLocationArrow className="absolute right-[15px] top-[12px] text-gray-500 pointer-events-none" />
                        {airportMenuOpen && (
                          <div className="bg-white absolute w-full top-[45px] rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-[99] max-h-[min(320px,55vh)] overflow-y-auto border border-[#eee]">
                            {airportDropdownRows.length === 0 && (
                              <div className="px-3 py-2.5 text-sm text-muted">
                                No matching airport
                              </div>
                            )}
                            {airportDropdownRows.map((a) => (
                              <div
                                key={a._id}
                                className="px-3 py-2 cursor-pointer hover:bg-[#f5b400] border-b border-[#f0f0f0] last:border-b-0"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setAirport(a._id);
                                  setAirportQuery(String(a.airportName ?? ""));
                                  setAirportMenuOpen(false);
                                }}
                              >
                                <strong className="text-[#1a1a1a] text-sm font-normal leading-snug block">
                                  {a.airportName}
                                </strong>
                                {a.state ? (
                                  <small className="text-muted d-block">
                                    {a.state}
                                  </small>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-1">
                        <Form.Select
                          value={airportDestinationCity}
                          onChange={(e) => {
                            setAirportDestinationCity(e.target.value);
                          }}
                          disabled={!airport}
                          className="!rounded-xl !py-3 !pr-10 !pl-[15px] !border-none !bg-[#e8e8e8c9]"
                        >
                          <option value="">Select city</option>
                          {airportCityOptions.map((c) => (
                            <option key={`${c.cityName}-${c.km}`} value={c.cityName}>
                              {c.cityName}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </>
                  )}

                  <Form.Group className="mb-3 relative">
                    <div className="relative flex items-stretch rounded-xl overflow-hidden !bg-[#e8e8e8c9] border-none">
                      <span className="flex items-center pl-[15px] pr-2 text-gray-600 text-sm shrink-0 select-none">
                        +91
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        className="!rounded-none !rounded-r-xl !py-3 !pr-10 !pl-0 !border-none !bg-transparent shadow-none focus:shadow-none"
                      />
                      <FaPhoneAlt className="absolute right-[15px] top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </Form.Group>

<div className="flex justify-between items-center mt-3 mb-3 text-[12px] text-gray-700">
  
  <div className="flex items-center gap-1">
   <span className="bg-green-600 rounded-full w-4 h-4 flex items-center justify-center">
  <FaCheck className="text-white text-[9px]" />
</span>
    <span>Instant Price</span>
  </div>

  <div className="flex items-center gap-1">
   <span className="bg-green-600 rounded-full w-4 h-4 flex items-center justify-center">
  <FaCheck className="text-white text-[9px]" />
</span>
    <span>Verified Drivers</span>
  </div>

  <div className="flex items-center gap-1">
    <span className="bg-green-600 rounded-full w-4 h-4 flex items-center justify-center">
  <FaCheck className="text-white text-[9px]" />
</span>
    <span>Reliable Service</span>
  </div>

</div>

                  <Button
                    type="button"
                    onClick={handleCabData}
                    className="w-full m-btn !bg-[#f5b400] !border-none p-2.5 !m-0 font-bold !rounded-[30px] flex justify-center items-center text-black"
                  >
                    Check Price &amp; Book Cab
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>

          
      </div>
       {/* <div>
            <p>Instant Price</p>
            <p>Verified Drivers</p>
            <p>No Hidden Charges</p>
            <p></p>
          </div> */}

      {/* PROMO SECTION */}
      
      <div className="hidden max-md:none h-[350px] bg-[url('https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/f49b1d42-200e-4457-a7b9-825341724fe3.jpeg')] bg-no-repeat bg-center bg-cover" ></div>
    </>
  );
};

export default HeroWithPromo;