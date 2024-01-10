import Sidebar from "../sidebar/Sidebar";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Sidebar */}
      <Sidebar />
      <div className="wrapper">
        <span>Searan Kuganesan</span>
        <div className="social">
          <a target="_blank" href="https://github.com/Skugane6">
            <img src="/github.png" alt="" />
          </a>
          <a href="mailto:searan.kuganesan4@gmail.com">
            <img src="/email.png" alt="Email" />
          </a>
          <a
            href="https://www.linkedin.com/in/searan-kuganesan-58b6b5244/"
            target="_blank"
          >
            <img src="/linkedin.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
