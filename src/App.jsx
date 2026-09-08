import { Routes, Route } from "react-router-dom";

import Home from "./component/Home";
import Promo from "./component/Promo/Promo";
import Thank from "./component/thank/Thank";
import ContactThankYou from "./component/ContactSection/ContactThankYou";
import Refund from "./component/Promo/Refund";

import FloatingButtons from "./component/FloatingButtons/FloatingButtons";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cablist" element={<Promo />} />
        <Route
          path="/contact/thank-you"
          element={<ContactThankYou />}
        />
        <Route path="/refund" element={<Refund />} />
        <Route path="/thank-you" element={<Thank />} />
        
      </Routes>

      <FloatingButtons />
    </>
  );
}

export default App; 