

import { Row, Col, Image, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import X2JS from 'x2js';
import ListPodcast from '../components/ListPodcast';


function Podcast() {
  const [isLoading,setLoading] = useState(true)
  const [useData, setData] = useState({})
  const { podcastId } = useParams();

  useEffect(() => {
    async function fetchData() {
      let urlData;
      let image, artist;
      await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}`)}`)
        .then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
        })
        .then(data => {
          const result = JSON.parse(data.contents)
          image = result.results[0]['artworkUrl600'];
          artist = result.results[0]['artistName']

          const url = result.results[0].feedUrl;
          urlData = url

        });

      const data2 = await axios(
        urlData
      );
      var x2js = new X2JS();

      var jsonObj = x2js.xml2js(data2.data);
      jsonObj = jsonObj[Object.keys(jsonObj)[0]];


      setData({
        image,
        description: jsonObj.channel.description,
        artist,
        title: jsonObj.channel.title,
        episodes: jsonObj.channel.item,
        total: jsonObj.channel.item.length
      })
      setLoading(false)
    }
    fetchData();
  }, []);
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col md={3}>
          <Row className="p-4 shadow" style={{ border: "1px solid #E5E5E5" }} >
            <Col md={12} style={{ textAlign: 'center' }}>
              <Image src={useData.image} rounded={true} fluid={true} style={{ width: "200px", padding: "0px" }} />
            </Col>
            <Col md={12}>
              <p className='h6 mt-4 mb-0'>{useData.title}</p>
              <p>by : {useData.artist}</p>
            </Col>
            <Col md={12}>
              <p className='h6 mt-4 mb-0'>Description</p>
              <div dangerouslySetInnerHTML={{ __html: useData.description }} ></div>
            </Col>
          </Row>
        </Col>

        <Col>
          <Card className=' shadow mb-4' style={{ padding: '10px' }}>
            <p className='h5'>Episodes: {useData.total}</p>
          </Card>
          {isLoading ? <p>Loading... </p> :  <ListPodcast episodes={useData.episodes}/>}
        </Col>

      </Row>

    </Container>
  )
}


export default Podcast;

