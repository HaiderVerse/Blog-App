import Instagram from "./instagram";
import Facebook from "./facebook";
import LinkedIn from "./linkedIn";
import Twitter from "./twitter";
import EyeOpen from "./eyeOpen";
import EyeClose from "./eyeClose";
import BoxImage from "./box-image";


const Icons = ({ type, width = "24px", height = "24px" }) => {
  switch (type) {
    case "instagram":
      return <Instagram width={width} height={height} />;
    case "facebook":
      return <Facebook width={width} height={height} />;
    case "linkedin":
      return <LinkedIn width={width} height={height} />;
    case "twitter":
      return <Twitter width={width} height={height} />;
    case "eyeOpen":
      return <EyeOpen width={width} height={height} />;
    case "eyeClose":
      return <EyeClose width={width} height={height} />;
    case "boxImage":
      return <BoxImage width={width} height={height} />;
    default:
      return null;
  }
};

export default Icons;
