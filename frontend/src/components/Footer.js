//file imports
import FooterImage from '../assets/FooterImage.png'



//home component
const Footer = () => {
    return (  
        <div className="footer">
            <a href="https://github.com/TypeMania/TypeMania.github.io">
           <img src={FooterImage} alt="FooterImage" className='FooterImage'/>
           </a>
           
        </div>   
    );
}

export default Footer;
