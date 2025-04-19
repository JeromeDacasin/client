import EmblaCarousel from "./../../common/EmblaCarousel/EmblaCarousel";
import './../Dashboard.css';
import solution from './../../../assets/solution.png';
import globalWarming from './../../../assets/global-warming.png';
import borrowingPolicy from './../../../assets/borrowing-policy.png';
import policy from './../../../assets/policy.png';

const slidesData = [
    {
      image: solution,
      belowData: "Learn about our platform's key features and how they can benefit you."
    },
    {
      image: globalWarming,
      belowData: "Important information regarding our commitment to sustainability."
    },
    {
      image: borrowingPolicy,
      belowData: "Details on borrowing limits, loan periods, and renewals."
    },
    {
      image: policy,
      belowData: "General terms and conditions for using our services."
    },
  ];
const ClientDashboard = () => {
    return (
      <div className="client-dashboard">
         <h1 className="welcome-message">Welcome to the Sta. Catalina Library !</h1>
            <EmblaCarousel slides={slidesData} />
      </div>
    );
  };

export default ClientDashboard