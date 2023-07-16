
import "../style/stylingSon.css"

export default function BannerCarousel(){
    
      return (
        <div className="Banner Col-12">
          <img style={{width: "100%"}} src={process.env.PUBLIC_URL + 'asset/img/Banner-blog-TopCV.jpg'}/>
        </div>
      );
    
}