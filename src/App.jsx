import { Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Promo from "./component/Promo/Promo";
import ContactThankYou from "./component/ContactSection/ContactThankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cablist" element={<Promo />} />
      <Route path="/contact/thank-you" element={<ContactThankYou />} />
    </Routes>
  );
}

export default App
