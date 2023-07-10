import Footer from "../Component/Footer";
import Header from "../Component/Header";

export default function DefaultTemplate({ children }) {
  return(
    <div className="container-fluid">
    <Header />
    <div className="row" style={{minHeight:"580px"}}>{children}</div>
    <Footer/>
  </div>
  );
}
