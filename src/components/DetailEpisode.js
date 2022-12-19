function DetailEpisode({ dataEpisode }) {

  function getTitle(item) {
    if (item.title === undefined) {
      return 'Not Available'
    }

    if (typeof item.title === 'object') {
      return item.title[0]
    }
    if (typeof item.title === 'string') {
      return item.title
    }

    return "Not available"
  }


  return (
    <div className="shadow" style={{ padding: '20px' }}>
      <p className="h3">
        {getTitle(dataEpisode)}
      </p>
      <div dangerouslySetInnerHTML={{ __html: dataEpisode.description }} ></div>

      <audio controls autoPlay loop>
        <source src="#" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

    </div>
  )
}

export default DetailEpisode;