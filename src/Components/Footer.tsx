import logo from "../assets/react.svg";
const Footer: React.FC<any> = () => {
  return (
    <footer className="bg-black">
      <div className="row m-0">
        <div className="col-3">
          <img src={logo} alt="SomeLogo" />
          <p>SomeName</p>
        </div>
        <div className="col-3">
          <a href="#">Link1</a>
          <a href="#">Link2</a>
          <a href="#">Link3</a>
        </div>
        <div className="col-3">
          <a href="#">Link1</a>
          <a href="#">Link2</a>
        </div>
        <div className="col-3">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Resources</a>
        </div>
        <hr />
        <div className="row">
          <section>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </section>
          <p>Copyright: {new Date().getFullYear() + " - now"}</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
