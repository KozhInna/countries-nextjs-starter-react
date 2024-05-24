import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigateTo = useNavigate();
  return (
    <div className="d-lg-flex home">
      <div className="align-self-center d-flex flex-column align-items-center justify-content-center home home-intro p-2">
        <h1>Countries app</h1>
        <p>This React application allows you to discover the world.</p>
        <h3>Technologies</h3>
        <ul className="d-flex flex-column justify-content-start">
          <li>React</li>
          <li>Redux Toolkit</li>
          <li>React Router DOM</li>
          <li>Firebase (authentication, database)</li>
          <li>Bootstrap</li>
          <li>MUI</li>
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
      <div className="container rightBox" onClick={() => navigateTo("/login")}>
        <div className="photo1 photoHome">
          <p className="img-description">Great Britain, London</p>
        </div>
        <div className="photo2 photoHome">
          <p className="img-description">Finland, Helsinki</p>
        </div>
        <div className="photo3 photoHome">
          <p className="img-description">Peru, Lima</p>
        </div>
        <div className="photo4 photoHome">
          <p className="img-description">France, Paris</p>
        </div>
        <div className="photo5 photoHome">
          <p className="img-description"> Korea, Seoul</p>
        </div>

        <div className="photo6 photoHome">
          <p className="img-description">Italy, Rome</p>
        </div>
        <div className="photo7 photoHome">
          <p className="img-description">United States, New York</p>
        </div>
        <div className="photo8 photoHome">
          <p className="img-description">Australia, Canberra</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
