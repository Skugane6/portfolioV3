import { useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Pet Recommendation App",
    img: "./pet.png",
    desc: "The pet recommendation app is built using React.js for the frontend and Express.js for the backend, seamlessly connecting with the Petfinder API. This integration empowers users to effortlessly explore and discover adoptable pets, complete with detailed information and images. To enhance the adoption experience, the app utilizes a sophisticated algorithm. It dynamically analyzes user responses to a set of questions, enabling personalized and well-matched pet recommendations. Users can also offer feedback on their experience with the application, fostering continuous improvement.",
    url: "https://www.youtube.com/watch?v=0Tip-LDCYig&t=87s"
  },
  {
    id: 2,
    title: "Eye Tracking Mouse",
    img: "./eye.png",
    desc: "This Python program utilizes the MediaPipe, OpenCV, and PyAutoGUI libraries to track the location of the user's eyes and adjust the cursor accordingly. MediaPipe is employed for facial landmark detection, OpenCV is utilized for image processing and eye tracking, and PyAutoGUI is responsible for tracking cursor movement.",
    url: "https://github.com/Skugane6/eye-mouse"
  },
  {
    id: 3,
    title: "iFinance Application",
    img: "./ifinance.png",
    desc: "I designed and partially developed a flexible Personal Finance Management System featuring user authentication and creation. The system is crafted using Java, SQL, and JavaFX. It incorporates the core principles of double-entry bookkeeping, enabling users to oversee assets, liabilities, income, expenses, and ensuring precise tracking of financial transactions within the platform.",
    url: "https://github.com/Skugane6/iFinance"
  },
  {
    id: 4,
    title: "Avatar Game",
    img: "./avatargame.png",
    desc: "Become the Avatar in this thrilling game! Fight elemental monsters across 4 levels, collecting coins after each victory. Upgrade stats at the shop. Face off against Prince Zuko in an epic boss battle!",
    url: "https://github.com/Skugane6/avatar-game"
  },
];

const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
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

const Portfolio = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Featured Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;