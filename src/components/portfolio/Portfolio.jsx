import { useRef, useState, useEffect } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";

const Portfolio = ({ onEnterMuseum }) => {
  const ref = useRef();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    // Check for saved dark mode preference, default to dark mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'false') {
      setIsDarkMode(false);
      document.body.classList.remove('dark-mode');
    } else {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !isDarkMode);
  };

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

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const contactCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const Single = ({ item, index }) => {
    const singleRef = useRef();
    const isInView = useInView(singleRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
      target: singleRef,
      offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

    const projectVariants = {
      hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    };

    return (
      <section>
        <div className="container">
          <motion.div
            className="wrapper"
            ref={singleRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={projectVariants}
          >
            <motion.div
              className="imageContainer"
              style={{ scale, opacity }}
            >
              <img src={item.img} alt={item.title} />
            </motion.div>
            <motion.div className="textContainer" style={{ y }}>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <button>View Project</button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };

  const AboutSection = () => {
    const sectionRef = useRef();
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
      <section className="about-section" ref={sectionRef}>
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="about-description"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          4th Year Software Engineering Student at Western University with professional experience as a Full Stack Developer & Data Analyst at Mitsubishi Heavy Industries.
          Passionate about building innovative full-stack applications, implementing machine learning solutions, and creating impactful user experiences.
        </motion.p>

        <motion.div
          className="skills-container"
          variants={skillsContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="skill-category" variants={skillCardVariants}>
            <h3>Languages</h3>
            <div className="skill-tags">
              <span className="skill-tag">Java</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">C/C++/C#</span>
              <span className="skill-tag">SQL</span>
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
            </div>
          </motion.div>

          <motion.div className="skill-category" variants={skillCardVariants}>
            <h3>Frameworks & Libraries</h3>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Angular</span>
              <span className="skill-tag">Flask</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express.js</span>
              <span className="skill-tag">TensorFlow.js</span>
              <span className="skill-tag">OpenCV</span>
              <span className="skill-tag">NumPy/Pandas</span>
              <span className="skill-tag">scikit-learn</span>
            </div>
          </motion.div>

          <motion.div className="skill-category" variants={skillCardVariants}>
            <h3>Tools & Technologies</h3>
            <div className="skill-tags">
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">Oracle/SQL Server</span>
              <span className="skill-tag">AWS</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Jira</span>
              <span className="skill-tag">D3.js</span>
              <span className="skill-tag">Chart.js</span>
              <span className="skill-tag">MediaPipe</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="experience-highlights"
          variants={skillsContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="highlight-card" variants={skillCardVariants}>
            <div className="card-number">01</div>
            <h4>Full Stack Development</h4>
            <p>Built component tracking systems serving 2,000+ aircraft with React.js, Python/Flask, and interactive visualizations</p>
          </motion.div>
          <motion.div className="highlight-card" variants={skillCardVariants}>
            <div className="card-number">02</div>
            <h4>Data Analysis & ML</h4>
            <p>Engineered fleet prediction platforms processing 400,000+ monthly records with machine learning trend analysis</p>
          </motion.div>
          <motion.div className="highlight-card" variants={skillCardVariants}>
            <div className="card-number">03</div>
            <h4>Database Architecture</h4>
            <p>Designed Oracle database systems with optimized indexing for 2,000+ entities</p>
          </motion.div>
        </motion.div>
      </section>
    );
  };

  const ContactSection = () => {
    const sectionRef = useRef();
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
      <section className="contact-section" ref={sectionRef}>
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="section-subheading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let's connect! I'm always open to discussing new opportunities, projects, or collaborations.
        </motion.p>
        <motion.div
          className="contact-grid"
          variants={skillsContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="contact-card" variants={contactCardVariants}>
            <div className="contact-icon">
              <img src="./email.png" alt="Email" />
            </div>
            <h3>Email</h3>
            <a href="mailto:searan.kuganesan4@gmail.com">
              searan.kuganesan4@gmail.com
            </a>
          </motion.div>
          <motion.div className="contact-card" variants={contactCardVariants}>
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
          </motion.div>
          <motion.div className="contact-card" variants={contactCardVariants}>
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
          </motion.div>
          <motion.div className="contact-card" variants={contactCardVariants}>
            <div className="contact-icon-emoji">📱</div>
            <h3>Phone</h3>
            <p>(647) 854-4416</p>
          </motion.div>
        </motion.div>
      </section>
    );
  };

  return (
    <div className="portfolio" ref={ref}>
      <motion.button
        className="museum-button"
        onClick={onEnterMuseum}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Enter Museum
      </motion.button>
      <motion.button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: 0 }}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </motion.button>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="geometric-bg">
          <motion.div
            className="geo-circle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          ></motion.div>
          <motion.div
            className="geo-square"
            initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 45, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          ></motion.div>
          <motion.div
            className="geo-triangle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          ></motion.div>
        </div>
        <motion.div
          className="hero-content"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-image" variants={heroItemVariants}>
            <img src="./hero.png" alt="Searan Kuganesan" />
          </motion.div>
          <motion.h1 variants={heroItemVariants}>Searan Kuganesan</motion.h1>
          <motion.h2 variants={heroItemVariants}>Software Engineering Student</motion.h2>
          <motion.p className="hero-description" variants={heroItemVariants}>
            Passionate about creating innovative solutions through code.
            Specialized in full-stack development, AI integration, and building
            user-centric applications.
          </motion.p>
          <motion.a
            href="./Searan_Resume.pdf"
            download="Searan_Kuganesan_Resume.pdf"
            className="resume-button"
            variants={heroItemVariants}
            whileHover={{ scale: 1.05, x: 4, y: 4 }}
            whileTap={{ scale: 0.95, x: 0, y: 0 }}
          >
            Download Resume
          </motion.a>
        </motion.div>
      </section>

      <AboutSection />

      <div className="progress">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Works
        </motion.h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item, index) => (
        <Single item={item} key={item.id} index={index} />
      ))}

      <ContactSection />

      <footer className="footer">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          © 2025 Searan Kuganesan. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
};

export default Portfolio;
