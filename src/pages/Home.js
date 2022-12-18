//import PodCast from "../components/Podcast";
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from "react";
import HomeCard from '../components/HomeCard';
function Home() {
  const [isLoading,setLoading] = useState(true)
  const [dataPodCast, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const result = await axios(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      );
      setData(result.data.feed.entry)
      setLoading(false)
    }
    getData();
  }, [])


  return (
    <>
      {isLoading ? <p>Loading....</p>:
      <Container className='mb-5'>
      <Row>
        {dataPodCast.map((item, i) => <Col md={3} key={i}> <HomeCard data={item} /></Col>)}
      </Row>
    </Container>}
    </>
  )
}

export default Home;