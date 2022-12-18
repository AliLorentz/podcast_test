//import PodCast from "../components/Podcast";
import { Row, Col, Container } from 'react-bootstrap';
import { useEffect } from "react";
import HomeCard from '../components/HomeCard';
import { useDispatch,useSelector } from "../redux/store"
import { setDataHome } from '../redux/slices/homePodcast';
function Home() {
  const dispatch = useDispatch();
  const { dataPodcast:dataPodCast,isLoading } = useSelector((state) => state.home);
  useEffect(()=>{
    if(isLoading){
      dispatch(
        setDataHome()
      )
    }
  },[])
  return (
    <>
      {isLoading ? <p>Loading....</p>:
      <Container className='mb-5'>
      <Row>
        {!dataPodCast ? <p>Loading</p> : dataPodCast.map((item, i) => <Col md={3} key={i}> <HomeCard data={item} /></Col>)}
      </Row>
    </Container>}
    </>
  )
}

export default Home;