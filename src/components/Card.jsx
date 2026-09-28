function Card({ imageUrl, id }) {
  console.log(imageUrl);
  return (
    <div>
      <img
        src={imageUrl}
        alt="White Stripes album cover"
        id={id}
      />
    </div>
  )
}

export default Card;
