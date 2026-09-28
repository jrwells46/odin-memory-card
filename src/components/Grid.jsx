import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import Scoreboard from './Scoreboard.jsx';

function Grid() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickedImages, setClickedImages] = useState([]);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const ALBUM_IDS = [
      '5c5589a7-1561-3b45-9ea9-650888413b4e',
      '17d13708-d267-3e28-9f7a-dc27eaaf2eb1',
      'c5a0411f-374e-360d-9364-3ddec3007162',
      'd85b9684-4277-3565-b89b-115c8b4b7fd3',
      'e6960f09-7b61-370e-9f42-71bb4be41af1',
      '2956b5fb-fd54-3da7-b742-690bc6788e99',
      '605d10c5-704a-4cea-b871-caed694d391f',
    ];

    async function fetchData() {
      try {
        const cardData = [];
        for (const albumId of ALBUM_IDS) {
          const response = await fetch(`https://coverartarchive.org/release-group/${albumId}`);
          const result = await response.json();
          cardData.push(...result.images
              .filter(image => image.front || image.back)
              .map(image => ({ key: crypto.randomUUID(), imageUrl: image.image }))
          );
        }
        setData(cardData);
      } catch (error) {
        console.error('Failed fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Fetching card images...</div>;
  }

  const handleClick = ({ target }) => {
    if (target.matches('img')) {
      const newArray = data.slice();
      let index = newArray.length;

      while (index > 0) {
        let randomIndex = Math.floor(Math.random() * index);
        index -= 1;
        [newArray[index], newArray[randomIndex]] = [newArray[randomIndex], newArray[index]];
      }

      setData(newArray);
      if (clickedImages.includes(target.id)) {
        setClickedImages([]);
      } else {
        setHighScore(Math.max(highScore, clickedImages.length + 1));
        setClickedImages([...clickedImages, target.id]);
      }
    }
  };

  return (
    <>
      <Scoreboard currentScore={clickedImages.length} highScore={highScore} />
      <section onClick={handleClick}>
        {data.map((cardData) => (
          <Card
            key={cardData.key}
            imageUrl={cardData.imageUrl}
            id={cardData.key}
          />
        ))}
      </section>
    </>
  )
}

export default Grid;
