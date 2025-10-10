import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import "./gamePortfolio.scss";

const GamePortfolio = () => {
  const gameRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Talking Objects",
      img: "./TO_fitted.png",
      desc: "An interactive application that brings everyday objects to life through AI-powered conversations. Users can engage with various objects, each with unique personalities and knowledge, creating an immersive and educational experience.",
      url: "https://talkobj.vercel.app/",
      tech: ["React", "AI", "Node.js"],
    },
    {
      id: 2,
      title: "Portfolio Risk Dashboard",
      img: "./PR1_fitted.png",
      desc: "A comprehensive portfolio risk management dashboard that provides real-time analytics and visualizations for investment portfolios. Features advanced risk metrics, performance tracking, and interactive charts to help investors make informed decisions.",
      url: "https://github.com/Skugane6/Portfolio-Risk-Dashboard",
      tech: ["React", "D3.js", "Finance APIs"],
    },
    {
      id: 3,
      title: "Pet Recommendation App",
      img: "./pet_fitted.png",
      desc: "The pet recommendation app, developed with React.js (frontend) and Express.js (backend), connects seamlessly with the Petfinder API. It empowers users to explore adoptable pets using a sophisticated algorithm that analyzes their responses to personalized questions. Users can provide feedback for continuous improvement.",
      url: "https://www.youtube.com/watch?v=0Tip-LDCYig&t=87s",
      tech: ["React", "Express.js", "Petfinder API"],
    },
    {
      id: 4,
      title: "Eye Tracking Mouse",
      img: "./eye.png",
      desc: "This Python program utilizes the MediaPipe, OpenCV, and PyAutoGUI libraries to track the location of the user's eyes and adjust the cursor accordingly. MediaPipe is employed for facial landmark detection, OpenCV is utilized for image processing and eye tracking, and PyAutoGUI is responsible for tracking cursor movement.",
      url: "https://github.com/Skugane6/eye-mouse",
      tech: ["Python", "MediaPipe", "OpenCV"],
    },
    {
      id: 5,
      title: "iFinance Application",
      img: "./ifinance_fitted.png",
      desc: "I designed and partially developed a flexible Personal Finance Management System featuring user authentication and creation. The system is crafted using Java, SQL, and JavaFX. It incorporates the core principles of double-entry bookkeeping, enabling users to oversee assets, liabilities, income, expenses, and ensuring precise tracking of financial transactions within the platform.",
      url: "https://github.com/Skugane6/iFinance",
      tech: ["Java", "SQL", "JavaFX"],
    },
    {
      id: 6,
      title: "Avatar Game",
      img: "./avatargame_fitted.png",
      desc: "Become the Avatar in this thrilling game! Fight elemental monsters across 4 levels, collecting coins after each victory. Upgrade stats at the shop. Face off against Prince Zuko in an epic boss battle!",
      url: "https://github.com/Skugane6/avatar-game",
      tech: ["Python", "Pygame"],
    },
  ];

  useEffect(() => {
    class GalleryScene extends Phaser.Scene {
      constructor() {
        super({ key: "GalleryScene" });
        this.paintings = [];
        this.ropes = [];
        this.windows = [];
      }

      preload() {
        // Load images
        console.log("Loading images...");
        this.load.image("background", "./background.png");
        this.load.image("painting", "./painting.png");
        this.load.image("rope", "./rope.png");
        this.load.image("window", "./window.png");

        this.load.on("complete", () => {
          console.log("All images loaded successfully");
        });

        this.load.on("loaderror", (file) => {
          console.error("Error loading file:", file.key, file.url);
        });
      }

      create() {
        console.log("Create scene called");
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        console.log("Canvas size:", width, "x", height);

        // Background dimensions (in pixels)
        const bgWidth = 12288;
        const bgHeight = 1024;

        // Background fits 8 paintings of 1536 pixels each: 8 * 1536 = 12288
        // So each painting takes up exactly 1/8 of the background width

        // Calculate scale factor based on screen height to fit background
        const scaleY = height / bgHeight;

        // Set world bounds - background width scaled to screen
        const scaledBgWidth = bgWidth * scaleY;
        this.cameras.main.setBounds(0, 0, scaledBgWidth, height);

        // Add background - it should fill the height and extend horizontally
        const background = this.add.image(0, 0, "background").setOrigin(0, 0);
        background.setScale(scaleY);
        background.setScrollFactor(1);
        console.log(
          "Background added with scale:",
          scaleY,
          "Width:",
          scaledBgWidth
        );

        // Calculate spacing - 8 paintings across the background
        const spacing = scaledBgWidth / 8;

        // Painting dimensions: 1536x1024 - make 50% smaller, then 20% bigger
        const paintingScale = scaleY * 0.5 * 1.2;
        const scaledPaintingWidth = 1536 * paintingScale;
        const scaledPaintingHeight = 1024 * paintingScale;

        // Rope dimensions: 1536x1024 - scale with adjustments (30% bigger, 50% wider)
        const ropeScaleX = scaleY * 0.25 * 1.5; // 50% wider
        const ropeScaleY = scaleY * 0.25 * 1.3; // 30% bigger (taller)
        const scaledRopeHeight = 1024 * ropeScaleY;

        // Window dimensions: 500x500 - make 50% smaller, then 30% bigger
        const windowScale = scaleY * 0.5 * 1.3;
        const scaledWindowSize = 500 * windowScale;

        // Position paintings lower on the wall (moved down)
        const paintingY = height * 0.45;

        // Position ropes near the bottom (moved down more)
        const ropeY = height - scaledRopeHeight / 2 - height * 0.02;

        // Position windows at the same level as the middle of the paintings
        const windowY = paintingY;

        // Create 8 paintings with overlaid information
        for (let i = 0; i < 8; i++) {
          const x = spacing * i + spacing / 2;

          // Create painting
          const painting = this.add.image(x, paintingY, "painting");
          painting.setScale(paintingScale);
          painting.setInteractive({ useHandCursor: true });

          // Determine what to display on each painting
          let displayText = "";
          let isAbout = false;
          let isContact = false;
          let projectData = null;

          if (i === 0) {
            // First painting - About
            displayText = "ABOUT";
            isAbout = true;
          } else if (i === 7) {
            // Last painting - Contact
            displayText = "CONTACT";
            isContact = true;
          } else if (projects[i - 1]) {
            // Middle 6 paintings - Projects
            projectData = projects[i - 1];
            displayText = projectData.title.toUpperCase();
          }

          // Add text overlay on painting with pixelated font
          if (displayText) {
            const textStyle = {
              fontSize: `${Math.floor(scaledPaintingWidth * 0.08)}px`,
              fill: "#ffffff",
              fontFamily: '"Press Start 2P", cursive',
              align: "center",
              wordWrap: { width: scaledPaintingWidth * 0.8 },
              stroke: "#000000",
              strokeThickness: 4,
              shadow: {
                offsetX: 3,
                offsetY: 3,
                color: "#000000",
                blur: 0,
                stroke: true,
                fill: true,
              },
            };

            const text = this.add.text(
              x,
              paintingY + scaledPaintingHeight * 0.35,
              displayText,
              textStyle
            );
            text.setOrigin(0.5);
            text.setDepth(2); // Text above images (depth 1) but below ropes (depth 3)

            // Add project image thumbnail if it's a project
            if (projectData && projectData.img) {
              // Load and display project thumbnail
              const thumbnailKey = `project_${i}`;
              this.load.image(thumbnailKey, projectData.img);
              this.load.once("complete", () => {
                // Apply consistent positioning for all project images
                let yOffset = paintingY - scaledPaintingHeight * 0.1;
                yOffset += 50; // Move all project images down 50 pixels

                const thumbnail = this.add.image(x, yOffset, thumbnailKey);

                // Calculate scale to fit thumbnail within painting (max 70% of painting width/height)
                const texture = thumbnail.texture;
                const imgWidth = texture.getSourceImage().width;
                const imgHeight = texture.getSourceImage().height;

                const maxWidth = scaledPaintingWidth * 0.7;
                const maxHeight = scaledPaintingHeight * 0.5;

                const scaleX = maxWidth / imgWidth;
                const scaleY = maxHeight / imgHeight;
                let thumbnailScale = Math.min(scaleX, scaleY);

                // Apply consistent sizing for all project images
                const widthIncrease = 10 / imgWidth;
                const heightIncrease = 8 / imgHeight;
                const finalScaleX = thumbnailScale + widthIncrease;
                const finalScaleY = thumbnailScale + heightIncrease;
                thumbnail.setScale(finalScaleX, finalScaleY);
                thumbnail.setOrigin(0.5);
                thumbnail.setDepth(1); // Images below text (depth 2)

                // Store thumbnail reference on painting for hover animations
                painting.thumbnail = thumbnail;
                painting.thumbnailScaleX = finalScaleX;
                painting.thumbnailScaleY = finalScaleY;
                painting.thumbnailYOffset = yOffset;
              });
              this.load.start();
            }
          }

          // Make painting clickable
          if (isAbout) {
            painting.on("pointerdown", () => {
              window.dispatchEvent(new CustomEvent("showAbout"));
            });
          } else if (isContact) {
            painting.on("pointerdown", () => {
              window.dispatchEvent(new CustomEvent("showContact"));
            });
          } else if (projectData) {
            painting.on("pointerdown", () => {
              window.dispatchEvent(
                new CustomEvent("showProject", {
                  detail: projectData,
                })
              );
            });
          }

          // Add hover effect
          painting.on("pointerover", () => {
            painting.setScale(paintingScale * 1.05);
            this.tweens.add({
              targets: painting,
              y: paintingY - 20,
              duration: 200,
              ease: "Power2",
            });

            // Animate thumbnail with painting if it exists
            if (painting.thumbnail) {
              painting.thumbnail.setScale(
                painting.thumbnailScaleX * 1.05,
                painting.thumbnailScaleY * 1.05
              );
              this.tweens.add({
                targets: painting.thumbnail,
                y: painting.thumbnailYOffset - 20,
                duration: 200,
                ease: "Power2",
              });
            }
          });

          painting.on("pointerout", () => {
            painting.setScale(paintingScale);
            this.tweens.add({
              targets: painting,
              y: paintingY,
              duration: 200,
              ease: "Power2",
            });

            // Reset thumbnail animation if it exists
            if (painting.thumbnail) {
              painting.thumbnail.setScale(
                painting.thumbnailScaleX,
                painting.thumbnailScaleY
              );
              this.tweens.add({
                targets: painting.thumbnail,
                y: painting.thumbnailYOffset,
                duration: 200,
                ease: "Power2",
              });
            }
          });

          this.paintings.push(painting);

          // Create rope under the painting
          const rope = this.add.image(x, ropeY, "rope");
          rope.setScale(ropeScaleX, ropeScaleY); // Different X and Y scales
          rope.setDepth(3); // Ropes above text (depth 2) and images (depth 1)
          this.ropes.push(rope);

          // Create window between paintings (except for the last position)
          if (i < 7) {
            const windowX = x + spacing / 2;
            const windowSprite = this.add.image(windowX, windowY, "window");
            windowSprite.setScale(windowScale);
            this.windows.push(windowSprite);
          }
        }

        // Add instruction text
        const instructionsText = this.add.text(
          width / 2,
          30,
          "Click on paintings to view projects | Use Arrow Keys or Drag to Navigate",
          {
            fontSize: "16px",
            fill: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: { x: 20, y: 10 },
            align: "center",
            fontFamily: '"Press Start 2P", cursive',
          }
        );
        instructionsText.setOrigin(0.5);
        instructionsText.setScrollFactor(0);
        instructionsText.setDepth(1000);

        // Camera controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Start camera at the left
        this.cameras.main.scrollX = 0;

        // Enable drag scrolling
        this.input.on("pointerdown", (pointer) => {
          this.isDragging = true;
          this.dragStartX = pointer.x;
          this.dragStartScrollX = this.cameras.main.scrollX;
        });

        this.input.on("pointermove", (pointer) => {
          if (this.isDragging) {
            const dragDistance = this.dragStartX - pointer.x;
            this.cameras.main.scrollX = Phaser.Math.Clamp(
              this.dragStartScrollX + dragDistance,
              0,
              Math.max(0, scaledBgWidth - width)
            );
          }
        });

        this.input.on("pointerup", () => {
          this.isDragging = false;
        });

        // Touch support
        this.input.addPointer(2);
      }

      update() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const bgWidth = 12288;
        const scaleY = height / 1024;
        const scaledBgWidth = bgWidth * scaleY;
        const scrollSpeed = 10;

        // Keyboard scrolling
        if (this.cursors.left.isDown) {
          this.cameras.main.scrollX = Phaser.Math.Clamp(
            this.cameras.main.scrollX - scrollSpeed,
            0,
            Math.max(0, scaledBgWidth - width)
          );
        } else if (this.cursors.right.isDown) {
          this.cameras.main.scrollX = Phaser.Math.Clamp(
            this.cameras.main.scrollX + scrollSpeed,
            0,
            Math.max(0, scaledBgWidth - width)
          );
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: GalleryScene,
      backgroundColor: "#000000",
    };

    const game = new Phaser.Game(config);

    // Event listeners
    const handleShowProject = (e) => setSelectedProject(e.detail);
    const handleShowContact = () => setShowContact(true);
    const handleShowAbout = () => setShowAbout(true);

    window.addEventListener("showProject", handleShowProject);
    window.addEventListener("showContact", handleShowContact);
    window.addEventListener("showAbout", handleShowAbout);

    // Handle resize
    const handleResize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("showProject", handleShowProject);
      window.removeEventListener("showContact", handleShowContact);
      window.removeEventListener("showAbout", handleShowAbout);
      window.removeEventListener("resize", handleResize);
      game.destroy(true);
    };
  }, []);

  return (
    <div className="game-portfolio">
      <div ref={gameRef} className="game-container" />

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <div className="modal-body">
              <img
                src={selectedProject.img}
                alt={selectedProject.title}
                className="project-image"
              />
              <h2>{selectedProject.title}</h2>
              <div className="tech-stack">
                {selectedProject.tech.map((tech, idx) => (
                  <span key={idx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
              <p>{selectedProject.desc}</p>
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project →
              </a>
            </div>
          </div>
        </div>
      )}

      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div
            className="modal-content contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowContact(false)}>
              ×
            </button>
            <div className="modal-body">
              <h2>Contact Me</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <img src="./email.png" alt="Email" />
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:searan.kuganesan4@gmail.com">
                      searan.kuganesan4@gmail.com
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <img src="./github.png" alt="GitHub" />
                  <div>
                    <h3>GitHub</h3>
                    <a
                      href="https://github.com/Skugane6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @Skugane6
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <img src="./linkedin.png" alt="LinkedIn" />
                  <div>
                    <h3>LinkedIn</h3>
                    <a
                      href="https://linkedin.com/in/searan-kuganesan"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Searan Kuganesan
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <span style={{ fontSize: "2rem" }}>📱</span>
                  <div>
                    <h3>Phone</h3>
                    <p>(647) 854-4416</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div
            className="modal-content about-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowAbout(false)}>
              ×
            </button>
            <div className="modal-body">
              <h2>About Searan Kuganesan</h2>
              <img src="./hero.png" alt="Searan" className="about-image" />
              <h3>Third Year Software Engineering Student</h3>
              <div className="qualities">
                <span className="quality-badge">Analytical</span>
                <span className="quality-badge">Innovative</span>
                <span className="quality-badge">Adaptable</span>
                <span className="quality-badge">Detail-oriented</span>
                <span className="quality-badge">Collaborative</span>
                <span className="quality-badge">Problem-solver</span>
              </div>
              <a
                href="./Searan_Resume.pdf"
                download="Searan_Kuganesan_Resume.pdf"
                className="resume-btn"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePortfolio;
