import {Row,Col,Image} from 'react-bootstrap';
import { Link } from "react-router-dom";

function HomeCard({ data }) {
  const image = data['im:image']['2']['label'];
  const title = data['im:name']['label'];
  const artist = data['im:artist']['label']
  const id= data.id.attributes['im:id'];

  return (
    <Row md={4} className="justify-content-md-center mt-5" style={{ margin: "0 4px 0 4px" }}>
      <Col md={6} >
        <Link to={`/podcast/${id}`}>
        <Image src={image} roundedCircle={true} fluid={true} />
        </Link>
      </Col>
      <Col md={12}
        style={{ textAlign: 'center', border: '1px solid #E5E5E5', borderRadius: '5px', margin: '-40px 0 0 0', zIndex: '-1',height:'145px' }}
        className='shadow'>
        <p className='h6 mt-5 mb-0'>{title}</p>
        <p>Author: {artist}</p>

      </Col>
    </Row>
  )
}

export default HomeCard;