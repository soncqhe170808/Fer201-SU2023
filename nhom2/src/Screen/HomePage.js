import BannerCarousel from "../Component/Banner";
import Joblist from "../Component/JobList";
import RecruiterList from "../Component/RecruiterList";
import DefaultTemplate from "../Template/DefaultTemplate";

import "../style/stylingSon.css"
export default function HomePage() {
  return (
    <DefaultTemplate>
     
      <div className="row Banner">
        <BannerCarousel/>
      </div>
      <Joblist/>
      <RecruiterList/>
    </DefaultTemplate>
  );
}
