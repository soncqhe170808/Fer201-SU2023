import Footer from "../Component/Footer";
import Header from "../Component/Header";

export default function DefaultTemplate({ children }) {
  return(
    <div className="container-fluid">
    <Header />
    <div className="row">{children}</div>
    <Footer/>
  </div>
  );
}
