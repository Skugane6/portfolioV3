import { useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Portfolio = ({ onEnterMuseum }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const items = [
  {
    id: 1,
    title: "Talking Objects",
    img: "./TO0.png",
    desc: "An interactive application that brings everyday objects to life through AI-powered conversations. Users can engage with various objects, each with unique personalities and knowledge, creating an immersive and educational experience.",
    url: "https://talkobj.vercel.app/"
  },
  {
    id: 2,
    title: "Portfolio Risk Dashboard",
    img: "./PR1.png",
    desc: "A comprehensive portfolio risk management dashboard that provides real-time analytics and visualizations for investment portfolios. Features advanced risk metrics, performance tracking, and interactive charts to help investors make informed decisions.",
    url: "https://github.com/Skugane6/Portfolio-Risk-Dashboard"
  },
  {
    id: 3,
    title: "Pet Recommendation App",
    img: "./pet.png",
    desc: "The pet recommendation app, developed with React.js (frontend) and Express.js (backend), connects seamlessly with the Petfinder API. It empowers users to explore adoptable pets using a sophisticated algorithm that analyzes their responses to personalized questions. Users can provide feedback for continuous improvement.",
    url: "https://www.youtube.com/watch?v=0Tip-LDCYig&t=87s"
  },
  {
    id: 4,
    title: "Eye Tracking Mouse",
    img: "./eye.png",
    desc: "This Python program utilizes the MediaPipe, OpenCV, and PyAutoGUI libraries to track the location of the user's eyes and adjust the cursor accordingly. MediaPipe is employed for facial landmark detection, OpenCV is utilized for image processing and eye tracking, and PyAutoGUI is responsible for tracking cursor movement.",
    url: "https://github.com/Skugane6/eye-mouse"
  },
  {
    id: 5,
    title: "iFinance Application",
    img: "./ifinance.png",
    desc: "I designed and partially developed a flexible Personal Finance Management System featuring user authentication and creation. The system is crafted using Java, SQL, and JavaFX. It incorporates the core principles of double-entry bookkeeping, enabling users to oversee assets, liabilities, income, expenses, and ensuring precise tracking of financial transactions within the platform.",
    url: "https://github.com/Skugane6/iFinance"
  },
  {
    id: 6,
    title: "Avatar Game",
    img: "./avatargame.png",
    desc: "Become the Avatar in this thrilling game! Fight elemental monsters across 4 levels, collecting coins after each victory. Upgrade stats at the shop. Face off against Prince Zuko in an epic boss battle!",
    url: "https://github.com/Skugane6/avatar-game"
  },
];

  const Single = ({ item }) => {
    const singleRef = useRef();

    const { scrollYProgress } = useScroll({
      target: singleRef,
    });

    const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    return (
      <section>
        <div className="container">
          <div className="wrapper">
            <div className="imageContainer" ref={singleRef}>
              <img src={item.img} alt="" />
            </div>
            <motion.div className="textContainer" style={{ y }}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <button>View Project</button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="portfolio" ref={ref}>
      <button className="museum-button" onClick={onEnterMuseum}>
        Enter Museum
      </button>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-image">
            <img src="./hero.png" alt="Searan Kuganesan" />
          </div>
          <h1>Searan Kuganesan</h1>
          <h2>Third Year Software Engineering Student</h2>
          <p className="hero-description">
            Passionate about creating innovative solutions through code.
            Specialized in full-stack development, AI integration, and building
            user-centric applications.
          </p>
          <a
            href="./Searan_Resume.pdf"
            download="Searan_Kuganesan_Resume.pdf"
            className="resume-button"
          >
            Download Resume
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section className="about-section">
        <h2 className="section-heading">About Me</h2>
        <div className="qualities-grid">
          <div className="quality-item">Analytical</div>
          <div className="quality-item">Innovative</div>
          <div className="quality-item">Adaptable</div>
          <div className="quality-item">Detail-oriented</div>
          <div className="quality-item">Collaborative</div>
          <div className="quality-item">Problem-solver</div>
        </div>
      </section>

      <div className="progress">
        <h1>Featured Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}

      {/* Contact Section */}
      <section className="contact-section">
        <h2 className="section-heading">Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">
              <img src="./email.png" alt="Email" />
            </div>
            <h3>Email</h3>
            <a href="mailto:searan.kuganesan4@gmail.com">
              searan.kuganesan4@gmail.com
            </a>
          </div>
          <div className="contact-card">
            <div className="contact-icon">
              <img src="./github.png" alt="GitHub" />
            </div>
            <h3>GitHub</h3>
            <a
              href="https://github.com/Skugane6"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Skugane6
            </a>
          </div>
          <div className="contact-card">
            <div className="contact-icon">
              <img src="./linkedin.png" alt="LinkedIn" />
            </div>
            <h3>LinkedIn</h3>
            <a
              href="https://linkedin.com/in/searan-kuganesan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Searan Kuganesan
            </a>
          </div>
          <div className="contact-card">
            <div className="contact-icon-emoji">📱</div>
            <h3>Phone</h3>
            <p>(647) 854-4416</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Searan Kuganesan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;