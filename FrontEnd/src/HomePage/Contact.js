import NavbarComp from "./NavBar";

import './contactUs.css'

export const Contact = () => {

    return(
        <>
        <NavbarComp></NavbarComp>
        <div className="main">
                 <div className="sub-main">
                               
                             <div className="details" >
                               <h3 >Fes</h3>
                               <r>9757 </r><r>Aspen Lane South Richmond Hill, NY 11419</r>
                               </div>
                               <div className="details">
                               <h3 >Contact Info</h3>
                               <r>T: +1 (291) 939 9321  E: info@mywebsite.com</r>
                               </div>
                
            </div>
        </div>

        </>
        
    )
};

export default Contact;