const Home = () => {
  return (
    <div className="d-lg-flex home">
      <div className="align-self-center d-flex flex-column align-items-center justify-content-center home  home-intro">
        <h1>Countries app</h1>
        <p>This React application allows you to discovery the world.</p>
        <h3>Technologies</h3>
        <ul className="d-flex flex-column justify-content-start">
          <li>React</li>
          <li>Redux Toolkit</li>
          <li>React Router DOM</li>
          <li>Firebase (authentication, data storage)</li>
          <li>Bootstrap</li>
          <li>Mui</li>
          <li>axios</li>
          <li>react-google-maps</li>
        </ul>
        <h3>Resources</h3>
        <ul className="d-flex flex-column align-items-start">
          <li>REST Countries API</li>
          <li>Open weather API</li>
          <li>Google Maps Javascript API</li>
          <li>www.unsplash.com</li>
        </ul>
      </div>
      <div className="container rightBox">
        <div className="photo1 photoHome"></div>
        <div className="photo2 photoHome"></div>
        <div className="photo3 photoHome"></div>
        <div className="photo4 photoHome"></div>
        <div className="photo5 photoHome"></div>
        <div className="photo6 photoHome"></div>
        <div className="photo7 photoHome"></div>
        <div className="photo8 photoHome"></div>
      </div>
    </div>
  );
};

export default Home;
