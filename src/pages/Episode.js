import { Row, Col, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import DetailEpisode from '../components/DetailEpisode';
import { useSelector } from '../redux/store';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Episode() {
  const { episodeId,podcastId } = useParams();
  
  const { data: useData, isLoading } = useSelector((state) => state.podcast);
  return (
    <Container className='mt-5'>
      <Row>
        <Col md={3}>
          <Row className="p-4 shadow" style={{ border: "1px solid #E5E5E5" }} >
            <Col md={12} style={{ textAlign: 'center' }}>
              <Link to={`/podcast/${podcastId}`}>
              <Image src={useData.image} rounded={true} fluid={true} style={{ width: "200px", padding: "0px" }} />
              </Link>
            </Col>
            <Col md={12}>
              <Link to={`/podcast/${podcastId}`} style={{ 'textDecoration': 'none', 'color':'black'}}>
              <p className='h6 mt-4 mb-0'>{useData.title}</p>
            
              <p style={{'textDecoration':'none'}}>by : {useData.artist}</p>
              </Link>
            </Col>
            <Col md={12}>
              <p className='h6 mt-4 mb-0'>Description</p>
              <div dangerouslySetInnerHTML={{ __html: useData.description }} ></div>

            </Col>
          </Row>
        </Col>

        <Col md={{ span: 8, offset: 1 }}>
          {isLoading ? <p>Loading...</p> : <DetailEpisode dataEpisode={useData.episodes[episodeId]} />}
        </Col>

      </Row>

    </Container>
  )
}

export default Episode