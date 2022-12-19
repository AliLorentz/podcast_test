

import { Row, Col, Card,Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import X2JS from 'x2js';
import ListPodcast from '../components/ListPodcast';
import { useDispatch } from "../redux/store"
import { setData as setDataPodcast } from '../redux/slices/podcast';
import { setLoadingNavBar } from '../redux/slices/navBarLoading';
import { useNavigate } from "react-router-dom";
import DetailPodcast from '../components/DetailPodcast';
import { getDayHasPassed } from '../utils/DayHasPassed';


function Podcast() {
  const navigate = useNavigate();
  const DEFAULT_DAY = 'Mon Dec 19 1998 01:06:49 GMT+0100 (hora estándar de Europa central)'
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true)
  const [useData, setData] = useState({})
  const { podcastId } = useParams();

  useEffect(() => {
    dispatch(
      setLoadingNavBar(true)
    )
    async function fetchData() {
      const goToHomePage = () => navigate('/');
      const dataLocalStorage =
        JSON.parse(localStorage.getItem(`${podcastId}`)) || { day: DEFAULT_DAY, data: [] }
      const oneDayPassed = getDayHasPassed(dataLocalStorage)

      if (!oneDayPassed) {
        try {
          const data = await axios(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}`)}`)
          const result = JSON.parse(data.data.contents)
          const dataPodcast = await axios(result.results[0].feedUrl);

          var x2js = new X2JS();
          var jsonObj = x2js.xml2js(dataPodcast.data);
          jsonObj = jsonObj[Object.keys(jsonObj)[0]];

          const dataPodcastObject = {
            image: result.results[0]['artworkUrl600'],
            description: jsonObj.channel.description,
            artist: result.results[0]['artistName'],
            title: jsonObj.channel.title,
            episodes: jsonObj.channel.item,
            total: jsonObj.channel.item.length
          }

          setData({
            ...dataPodcastObject
          })
          dispatch(
            setDataPodcast({
              ...dataPodcastObject
            })
          )
          const today = new Date();
          localStorage.setItem(`${podcastId}`, JSON.stringify({
            day: today, useData: {
              ...dataPodcastObject
            }
          }))
          setLoading(false)
          dispatch(
            setLoadingNavBar(false)
          )
        } catch (e) {
          console.log("Error:", e)
          dispatch(
            setLoadingNavBar(false)
          )
          goToHomePage();
        }
      } else {
        setData({
          ...dataLocalStorage.useData
        })
        dispatch(
          setDataPodcast({
            ...dataLocalStorage.useData
          })
        )
        setLoading(false)
        dispatch(
          setLoadingNavBar(false)
        )
      }
    }
    fetchData();
  }, [dispatch, navigate, podcastId]);
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <DetailPodcast />

        <Col>
          <Card className=' shadow mb-4' style={{ padding: '10px' }}>
            <p className='h5'>Episodes: {useData.total}</p>
          </Card>
          {isLoading ? <p>Loading... </p> : <ListPodcast episodes={useData.episodes} />}
        </Col>

      </Row>

    </Container>
  )
}


export default Podcast;

