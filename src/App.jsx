import { Routes, Route } from "react-router-dom";
import Home1 from "./component/Home1";
import Promo from "./component/Promo/Promo";
import ContactThankYou from "./component/ContactSection/ContactThankYou";
import Refund from "./component/Promo/Refund"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home1 />} />
      <Route path="/cablist" element={<Promo />} />
      <Route path="/contact/thank-you" element={<ContactThankYou />} />
      <Route path="/refund" element={<Refund />} />

    </Routes>
  );
}

export default App
