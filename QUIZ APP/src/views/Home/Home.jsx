import HomeButtons from "../../components/HomeButtons/HomeButtons";
import ListFeedback from "../../components/ListFeedback/ListFeedback";
import SliderHome from "../../components/Slider/Slider";
import SignUp from "../SignUp/SignUp";

const Home = () => {
    return (
        <>
            <SliderHome />
            <HomeButtons />
            <ListFeedback />
            <SignUp />
        </>


    )
}
export default Home;