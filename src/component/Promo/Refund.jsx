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
        <div style={{ marginTop: "80px", marginBottom: "40px" }}>
      <Container>
        <Card className="shadow-sm p-4 border-0">
          <h2 className="mb-3 text-center fw-bold">
            Cancellation and Refund Policy
          </h2>

          <p className="text-center text-muted">
            Last updated: March 5, 2021
          </p>

          <hr />

          {/* Cancellation Policy */}
          <h4 className="mt-3">1. Cancellation Policy</h4>

          <p>
            <strong>1.1</strong> You may cancel your booking any time before the
            scheduled pickup date and time by calling our 24x7 Customer Care
            helpline number 9045454224. If driver/car details are already
            provided, cancellation charges will apply.
          </p>

          <p>
            <strong>1.2</strong> No cancellation fee shall be payable unless Cab
            Bazar confirms cancellation as per terms.
          </p>

          <p>
            <strong>1.3 Cancellation Fees:</strong>
          </p>

          <ul>
            <li>
              1.3.1 Free cancellation if driver/car details are not provided.
            </li>
            <li>
              1.3.2 If driver/car details are provided, advance amount will be
              forfeited as cancellation fee.
            </li>
            <li>
              1.3.3 If driver waits 45 minutes or wrong pickup details provided,
              charges may apply as per vehicle type.
            </li>
            <li>
              1.3.4 Force majeure situations may result in voucher issuance
              instead of refund.
            </li>
          </ul>

          {/* Refund Policy */}
          <h4 className="mt-4">2. Refund Policy</h4>

          <p>
            <strong>2.1</strong> Refunds will be processed within 7–10 business
            days. Cab Bazar is not responsible for incorrect bank details.
          </p>

          <p>
            <strong>2.2 Voucher cases:</strong>
          </p>

          <ul>
            <li>
              Driver cancellation without replacement → full voucher provided.
            </li>
            <li>Car breakdown not resolved → full voucher provided.</li>
            <li>Force majeure events → voucher instead of refund.</li>
            <li>
              Trip modification approved by Cab Bazar → voucher issued.
            </li>
          </ul>

          <p>
            <strong>2.3</strong> Cab Bazar is not responsible for any payments
            made directly to driver outside invoice.
          </p>

          <p>
            <strong>2.4</strong> Cab Bazar is not liable for loss/damage during
            ride caused by third-party drivers but will assist reasonably.
          </p>

          <p>
            <strong>2.5</strong> Misbehavior with driver may lead to forfeiture
            of advance payment and legal action.
          </p>
        </Card>
      </Container>
    </div>
    <Footer/>
    </>
  );
}

export default RefundPolicy;