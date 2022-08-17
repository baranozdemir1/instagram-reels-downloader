import { useState } from "react";
import axios from "axios";

function App() {

  const [userName, setUserName] = useState('')
  const [items, setItems] = useState([])

  const headers = {
    'X-RapidAPI-Key': 'f7aafdff2amshb0f44d90bad7e8bp1bb8bfjsn8333e2bedcf0',
    'X-RapidAPI-Host': 'instagram188.p.rapidapi.com',
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

          <img crossOrigin="anonymous" src={item.media.image_versions2.additional_candidates.first_frame.url} width={500} height={500}/>
          {item.media.video_versions[0].url}
          
          
        </div>
        
      ))
    }
    
    </>
  );
}

export default App;
