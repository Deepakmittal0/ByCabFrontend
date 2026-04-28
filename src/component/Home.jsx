import  Navbar  from './Navbar/Navbar'
import Header from './header/Header'
import OutstationSection from './OutstationSection/OutstationSection'
import WhyTravel from './whyTravel/WhyTravel'
import Testimonials from './Testimonials/Testimonials'
import ContactSection from './ContactSection/ContactSection'
import Whybook from './Whybook/Whybook'
import Popularcity from './Popularcity/Popularcity'
import Feature from './Feature/Feature'
import Faq from './Faq/Faq'
import Map from './Map/Map'
import Footer from './Footer/Footer'

  
function HeroSection() {
  return (
    <>
<Navbar/>
     <Header/>
 
   <WhyTravel/>
  
   <Whybook/>
   
   <OutstationSection/>
   <Popularcity/>
   <Map/>
  
   <Faq/>
   <Testimonials/>
   
   <ContactSection/>
   <Footer/>
  
    </>
  )
}


export default HeroSection