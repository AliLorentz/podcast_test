import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ListPodcast({episodes}) {
  const { podcastId } = useParams();

  function convertMinutesToHours(minutes) {
    if(typeof minutes === 'undefined'){
      return '00:00'
    } 

    let minuteCurrent = minutes['__text'];

    if (minuteCurrent.indexOf(':') !== -1) {
      return minuteCurrent
    }

    var hours = Math.floor(minuteCurrent / 60);
    var leftoverMinutes = minuteCurrent % 60;
    return hours + ":" + leftoverMinutes +":00";
  }

  function getTitle(item){
    if(typeof item.title === 'object'){
      return item.title[0]
    }
    if(typeof item.title === 'string'){
      return item.title
    }
    
    return "Not available"
  }

  function getDate(currentDate){
    const date = new Date(Date.parse(currentDate));

// Format the date using toLocaleDateString()
const formattedDate = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric"
});
return formattedDate

  }

  return (
    <Table responsive="sm" striped bordered hover>
      <thead>
        <tr>
          <th >Title</th>
          <th>Date</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
       
     {
      episodes ?
      episodes.map((item,i)=> <tr key={i}>
        <td><Link to={`/podcast/${podcastId}/episode/${i}`}>{getTitle(item)}</Link></td>
        <td>{getDate(item.pubDate)}</td>
        <td>{convertMinutesToHours(item.duration)}</td>
      </tr>): <tr></tr>
     }
      </tbody>
    </Table>
  )
}

export default ListPodcast;