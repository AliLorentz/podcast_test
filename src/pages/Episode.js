import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import DetailEpisode from '../components/DetailEpisode';
import { useSelector } from '../redux/store';
import { useParams } from 'react-router-dom';
import DetailPodcast from '../components/DetailPodcast';


function Episode() {
  const { episodeId } = useParams();

  const { data: useData, isLoading } = useSelector((state) => state.podcast);
  return (
    <Container className='mt-5'>
      <Row>
        <DetailPodcast />

        <Col md={{ span: 8, offset: 1 }}>
          {isLoading ? <p>Loading...</p> : <DetailEpisode dataEpisode={useData.episodes[episodeId]} />}
        </Col>

      </Row>

    </Container>
  )
}

export default Episode