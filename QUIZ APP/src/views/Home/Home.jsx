import HomeButtons from '../../components/HomeButtons/HomeButtons'
import ListFeedback from '../../components/ListFeedback/ListFeedback'
import SliderHome from '../../components/Slider/Slider'
import SignUp from '../SignUp/SignUp'
import { useContext } from 'react'
import AppContext from '../../context/AuthContext'

const Home = () => {
  const { user } = useContext(AppContext)

  return (
        <>
            <SliderHome />
            <HomeButtons />
            <ListFeedback />
            {!user && <SignUp />}
        </>
  )
}
export default Home
