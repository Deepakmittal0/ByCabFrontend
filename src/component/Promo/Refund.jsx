import React from "react";
import { Container, Card } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";


function RefundPolicy() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <>
    <Navbar/>
     <div style={{ marginTop: "90px", marginBottom: "50px" }}>
  <Container>
    <Card
      className="border-0 shadow-lg rounded-4 overflow-hidden"
      style={{ background: "#fff" }}
    >

      {/* Header */}
      <div className="bg-dark text-white text-center py-5 px-4">
        <h1 className="fw-bold mb-2">
          Cancellation and Refund Policy
        </h1>

        <p className="mb-0 text-light">
          Please read all terms carefully before booking your ride with ByCab.
        </p>
      </div>

      <div className="p-4 p-md-5">

        {/* Cancellation Policy */}
        <div className="mb-5">

          <div className="d-flex align-items-center mb-4">
            <div
              className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{ width: "55px", height: "55px" }}
            >
              <i className="fa-solid fa-ban text-dark"></i>
            </div>

            <h3 className="fw-bold mb-0">
              Cancellation Policy
            </h3>
          </div>

          <div className="bg-light rounded-4 p-4">

            <ul className="list-group list-group-flush">

              <li className="list-group-item bg-transparent border-0 px-0">
                You may cancel your booking with us any time before the
                schedule date and time of your pick-up only by calling us on
                our 24x7 Customer Care helpline number
                <strong> +91 9045454224</strong>. If you cancel when the driver
                and/or car details provided you will be charged a cancellation
                fee.
              </li>

              <li className="list-group-item bg-transparent border-0 px-0">
                No cancellation fee shall be payable unless ByCab confirms the
                cancellation of your ride in accordance with the terms of use
                and Cancellation and refund policy.
              </li>

            </ul>

            <div className="alert alert-warning mt-4 fw-bold">
              Cancellation Fees
            </div>

            <ul className="list-group list-group-flush">

              <li className="list-group-item bg-transparent">
                A booking request can be cancelled free of charge where driver
                or car details are not provided.
              </li>

              <li className="list-group-item bg-transparent">
                If a booking request is cancelled for any reason whatsoever
                when the driver and/or car details provided, you'll be charged
                a cancellation fee as forfeiture of the complete advance amount
                paid by you for the booking.
              </li>

              <li className="list-group-item bg-transparent">
                Drivers are also able to cancel a ride request if they've
                waited 45 minutes at the pickup location and/or for any reason
                whatsoever you have provided wrong details of pickup location
                or you are not reachable at phone, mobile number and email
                address you have provided. You may be charged either a
                cancellation fee as forfeiture of the complete advance amount
                paid by you for the booking or Rs. 3.5 per minute for
                hatchback / Sedan car, Rs. 4 per minute for SUV / Innova car,
                Rs. 10 per minute for Tempo traveller, after 45 minutes
                completed at the sole discretion of ByCab.
              </li>

              <li className="list-group-item bg-transparent">
                In case, cancellation is due to external factors which human
                being by the exercise of reasonable diligence cannot avoid such
                as epidemic, tornadoes, earthquakes, hurricanes, floods, fire,
                strikes, lockouts or other industrial disturbances; war,
                terrorist acts, riot, or other civil disturbance; epidemics; or
                other similar forces or due to force majeure which lead to the
                roads closed, voucher for the complete advance amount paid by
                you for the booking, in ByCab’s sole discretion shall be issued
                without expiry to use in future.
              </li>

            </ul>

          </div>
        </div>

        {/* Refund Policy */}
        <div>

          <div className="d-flex align-items-center mb-4">
            <div
              className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{ width: "55px", height: "55px" }}
            >
              <i className="fa-solid fa-wallet text-white"></i>
            </div>

            <h3 className="fw-bold mb-0">
              Refund Policy
            </h3>
          </div>

          <div className="bg-light rounded-4 p-4">

            <ul className="list-group list-group-flush">

              <li className="list-group-item bg-transparent border-0 px-0">
                As per the cancellation and refund policy, the refund will be
                processed. It may take 7 to 10 business days for the refund to
                reflect into your account. In case wrong or incorrect banking
                details/ account details provided by you, ByCab shall not be
                responsible for any loss and/or damages whatsoever.
              </li>

            </ul>

            <div className="alert alert-success mt-4 fw-bold">
              You shall be entitled for the vouchers without expiry to use in
              future in ByCab’s sole discretion in the following cases:
            </div>

            <ul className="list-group list-group-flush">

              <li className="list-group-item bg-transparent">
                Where the allocated driver cancels the ride without assigning
                any valid and reasonable reason at the last hour and the ByCab
                fails to arrange another ride in a reasonable time you shall be
                entitled for the voucher for the complete advance amount paid
                by you for the booking.
              </li>

              <li className="list-group-item bg-transparent">
                Where the car breaks down during the trip and the ByCab or
                driver does not rectify it within reasonable time, you shall be
                provided the voucher for the complete advance amount paid by
                you.
              </li>

              <li className="list-group-item bg-transparent">
                In case, cancellation is due to external factors which human
                being by the exercise of reasonable diligence cannot avoid such
                as epidemic, tornadoes, earthquakes, hurricanes, floods, fire,
                strikes, lockouts or other industrial disturbances; war,
                terrorist acts, riot, or other civil disturbance; epidemics; or
                other similar forces or due to force majeure which lead to the
                roads closed, voucher for the complete advance amount paid by
                you for the booking, in ByCab’s sole discretion shall be issued
                without expiry to use in future.
              </li>

              <li className="list-group-item bg-transparent">
                Where you want to change car type or want to increase/decrease
                trip duration or need some correction in itinerary, you shall
                inform ByCab well in advance and after confirmation by ByCab,
                you shall be provided the voucher for the complete advance
                amount paid by you in ByCab’s sole discretion.
              </li>

              <li className="list-group-item bg-transparent">
                ByCab shall not be responsible to refund and/or to provide
                voucher in any case where you give any money or goods to the
                Driver except as mentioned in the invoice. ByCab shall not be
                liable to pay any damages, if any, arises from any loss accrued
                to you.
              </li>

              <li className="list-group-item bg-transparent">
                ByCab shall not be held responsible for any loss or damage
                happened during the ride on account of the driver who is a
                third party agency. However, ByCab shall assist you in all the
                reasonable manner to recover your loss or damage.
              </li>

              <li className="list-group-item bg-transparent">
                ByCab reserves the right to withhold the complete advance
                amount paid by you for the booking on account of any misbehave
                or misconduct viz. physically, orally or mentally with the
                driver. ByCab also reserves the right jointly and/or severally
                with the driver to take any action against you as available as
                per the law applicable at the time of the incident.
              </li>

            </ul>

          </div>
        </div>

      </div>
    </Card>
  </Container>
</div>
    <Footer/>
    </>
  );
}

export default RefundPolicy;