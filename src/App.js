import { useState } from "react";
import axios from "axios";

function App() {

  const [userName, setUserName] = useState('')
  const [items, setItems] = useState([])

  const headers = {
    'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_X_RAPIDAPI_HOST,
    'Access-Control-Allow-Origin': '*',
  }

  const findUserID = async () => {

    const userNameOptions = {
      method: 'GET',
      url: `https://instagram188.p.rapidapi.com/userid/${userName}`,
      headers
    };

    try {
      const res = await axios.request(userNameOptions)
      console.log("findUserID is working")
      return res.data.data
    } catch (error) {
      console.error(error)
    }

  }

  const submitHandle = async (e) => {
    e.preventDefault()

    const userID = await findUserID();

    const userIdOptions = {
      method: 'GET',
      url: `https://instagram188.p.rapidapi.com/userreels/${userID}/12/%7Bend_cursor%7D`,
      headers
    };

    axios.request(userIdOptions).then(function (response) {
      setItems(response.data.data.items);
      console.log("submitHandle is working")
    }).catch(function (error) {
      console.error(error);
    });
  }

  console.log(items)

  return (
    <>

    <form onSubmit={submitHandle}>
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <button type="submit">Fetch</button>
    </form>

    {
      items?.map((item, index) => (
        <div key={index}>

          <img alt="video cover" crossOrigin="anonymous" src={item.media.image_versions2.additional_candidates.first_frame.url} width={500} height={500}/>
          {item.media.video_versions[0].url}

          {console.log(item.media.video_versions[0].url)}
          
          
        </div>
        
      ))
    }
    
    </>
  );
}

export default App;
