import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import "./gamePortfolio.scss";

const GamePortfolio = () => {
  const gameRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const gameInstance = useRef(null);

  // Function to re-enable painting interactions
  const enablePaintings = () => {
    if (gameInstance.current && gameInstance.current.scene.scenes[0]) {
      const scene = gameInstance.current.scene.scenes[0];
      if (scene.paintings) {
        scene.paintings.forEach(p => p.setInteractive({ useHandCursor: true }));
      }
    }
  };

  // Handle start button click
  const handleStartClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowStartScreen(false);
      // Enable paintings after start screen is dismissed
      if (gameInstance.current && gameInstance.current.scene.scenes[0]) {
        const scene = gameInstance.current.scene.scenes[0];
        if (scene.paintings) {
          scene.paintings.forEach(p => p.setInteractive({ useHandCursor: true }));
        }
      }
    }, 800); // Match animation duration (0.8s)
  };

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
      img: "./eye_fitted.png",
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
        this.player = null;
        this.cursors = null;
        this.joystick = null;
        this.joystickBase = null;
        this.joystickThumb = null;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isJumping = false;
        this.jumpStartTime = 0;
        this.jumpDuration = 600; // Jump lasts 600ms (quick jump)
      }

      preload() {
        // Load images
        console.log("Loading images...");
        this.load.image("background", "./background.png");
        this.load.image("painting", "./painting.png");
        this.load.image("aboutmepainting", "./aboutmepainting.png");
        this.load.image("contactmepainting", "./contactmepainting.png");
        this.load.image("rope", "./rope.png");
        this.load.image("window", "./window.png");
        this.load.image("windowOpen", "./windowOpen.png");

        // Load character sprites
        const spriteBasePath = "./Stick Figure Character Sprites 2D/Fighter sprites/";

        // Load idle frames (1-8)
        for (let i = 1; i <= 8; i++) {
          const frameNum = String(i).padStart(4, "0");
          this.load.image(`idle_${i}`, `${spriteBasePath}fighter_Idle_${frameNum}.png`);
        }

        // Load run frames (17-24)
        for (let i = 17; i <= 24; i++) {
          const frameNum = String(i).padStart(4, "0");
          this.load.image(`run_${i}`, `${spriteBasePath}fighter_run_${frameNum}.png`);
        }

        // Load jump frames (43-47)
        for (let i = 43; i <= 47; i++) {
          const frameNum = String(i).padStart(4, "0");
          this.load.image(`jump_${i}`, `${spriteBasePath}fighter_jump_${frameNum}.png`);
        }

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

        // Calculate scale factor based on HEIGHT to fit everything vertically
        // Width will extend horizontally and be scrollable
        const bgScale = height / bgHeight;

        // Set world bounds - background width scaled to screen height
        const scaledBgWidth = bgWidth * bgScale;
        this.cameras.main.setBounds(0, 0, scaledBgWidth, height);

        // Add background - it fills the height perfectly and extends horizontally
        const background = this.add.image(0, 0, "background").setOrigin(0, 0);
        background.setScale(bgScale);
        background.setScrollFactor(1);
        console.log(
          "Background added with scale:",
          bgScale,
          "Width:",
          scaledBgWidth,
          "Height:",
          height
        );

        // Enable physics
        this.physics.world.setBounds(0, 0, scaledBgWidth, height);

        // Create animations
        this.anims.create({
          key: "idle",
          frames: Array.from({ length: 8 }, (_, i) => ({ key: `idle_${i + 1}` })),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "run",
          frames: Array.from({ length: 8 }, (_, i) => ({ key: `run_${i + 17}` })),
          frameRate: 12,
          repeat: -1,
        });

        this.anims.create({
          key: "jump",
          frames: Array.from({ length: 5 }, (_, i) => ({ key: `jump_${i + 43}` })),
          frameRate: 15,
          repeat: 0,
        });

        // Create player character - anchored to background like everything else
        // Position at a fixed point on the background (820px on original 1024px background = 80%)
        const groundY = 820 * bgScale; // Same relative position on all screen sizes
        this.player = this.physics.add.sprite(200, groundY, "idle_1");
        this.player.setScale(bgScale * 1.5); // Scaled relative to background
        this.player.body.setAllowGravity(false); // No gravity
        this.player.setDepth(10);

        // Store ground Y and jump height (both scaled relative to background)
        this.groundY = groundY;
        this.jumpHeight = 200 * bgScale; // Jump height also scales with background

        // Start idle animation immediately
        this.player.anims.play("idle", true);

        // Camera follows player
        this.cameras.main.startFollow(this.player, true, 0.1, 0);

        // Create mobile joystick if on mobile
        if (this.isMobile) {
          const joystickSize = 80 * bgScale; // Scaled with background
          const joystickX = joystickSize + 30 * bgScale; // Scaled padding
          const joystickY = height - joystickSize - 30 * bgScale; // Scaled padding from bottom

          // Joystick base - pixelated rectangle
          this.joystickBase = this.add.rectangle(joystickX, joystickY, joystickSize, joystickSize, 0x888888, 0.5);
          this.joystickBase.setScrollFactor(0);
          this.joystickBase.setDepth(1001);
          this.joystickBase.setStrokeStyle(2 * bgScale, 0x000000, 1); // Pixelated border

          // Joystick thumb - pixelated rectangle (smaller)
          const thumbSize = (joystickSize * 2) / 3;
          this.joystickThumb = this.add.rectangle(joystickX, joystickY, thumbSize, thumbSize, 0xcccccc, 0.8);
          this.joystickThumb.setScrollFactor(0);
          this.joystickThumb.setDepth(1002);
          this.joystickThumb.setStrokeStyle(2 * bgScale, 0x000000, 1); // Pixelated border
          this.joystickThumb.setInteractive({ draggable: true });

          // Joystick data
          this.joystick = {
            base: { x: joystickX, y: joystickY },
            thumb: this.joystickThumb,
            force: { x: 0, y: 0 },
            radius: joystickSize / 2,
          };

          // Joystick drag events
          this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this.joystickThumb) {
              const distance = Phaser.Math.Distance.Between(
                this.joystick.base.x,
                this.joystick.base.y,
                pointer.x,
                pointer.y
              );

              const angle = Phaser.Math.Angle.Between(
                this.joystick.base.x,
                this.joystick.base.y,
                pointer.x,
                pointer.y
              );

              if (distance < this.joystick.radius) {
                this.joystickThumb.x = pointer.x;
                this.joystickThumb.y = pointer.y;
              } else {
                this.joystickThumb.x = this.joystick.base.x + Math.cos(angle) * this.joystick.radius;
                this.joystickThumb.y = this.joystick.base.y + Math.sin(angle) * this.joystick.radius;
              }

              const clampedDistance = Math.min(distance, this.joystick.radius);
              this.joystick.force.x = (Math.cos(angle) * clampedDistance) / this.joystick.radius;
              this.joystick.force.y = (Math.sin(angle) * clampedDistance) / this.joystick.radius;
            }
          });

          this.input.on("dragend", (pointer, gameObject) => {
            if (gameObject === this.joystickThumb) {
              this.joystickThumb.x = this.joystick.base.x;
              this.joystickThumb.y = this.joystick.base.y;
              this.joystick.force.x = 0;
              this.joystick.force.y = 0;
            }
          });

          // Jump button for mobile - pixelated rectangle
          const jumpButtonSize = 60 * bgScale; // Scaled with background
          const jumpButton = this.add.rectangle(
            width - jumpButtonSize - 30 * bgScale,
            height - jumpButtonSize - 30 * bgScale,
            jumpButtonSize,
            jumpButtonSize,
            0xff6666,
            0.7
          );
          jumpButton.setScrollFactor(0);
          jumpButton.setDepth(1001);
          jumpButton.setStrokeStyle(2 * bgScale, 0x000000, 1); // Pixelated border
          jumpButton.setInteractive();

          const jumpText = this.add.text(
            width - jumpButtonSize - 30 * bgScale,
            height - jumpButtonSize - 30 * bgScale,
            "JUMP",
            { fontSize: `${14 * bgScale}px`, fill: "#fff", fontFamily: '"Press Start 2P", cursive' }
          );
          jumpText.setOrigin(0.5);
          jumpText.setScrollFactor(0);
          jumpText.setDepth(1002);

          jumpButton.on("pointerdown", () => {
            // Trigger jump if not already jumping
            if (!this.isJumping) {
              this.isJumping = true;
              this.jumpStartTime = this.time.now;
              this.player.anims.play("jump", true);
            }
          });
        }

        // Calculate spacing - 8 paintings across the background
        const spacing = scaledBgWidth / 8;

        // Painting dimensions: 1536x1024 - make 50% smaller, then 20% bigger
        const paintingScale = bgScale * 0.5 * 1.2;
        const scaledPaintingWidth = 1536 * paintingScale;
        const scaledPaintingHeight = 1024 * paintingScale;

        // Rope dimensions: 1536x1024 - scale with adjustments (30% bigger, 50% wider)
        const ropeScaleX = bgScale * 0.25 * 1.5; // 50% wider
        const ropeScaleY = bgScale * 0.25 * 1.3; // 30% bigger (taller)
        const scaledRopeHeight = 1024 * ropeScaleY;

        // Window dimensions: 500x500 - make 50% of current size
        const windowScale = bgScale * 0.5 * 1.3 * 0.5; // 50% smaller
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

          // Determine what to display on each painting
          let displayText = "";
          let isAbout = false;
          let isContact = false;
          let projectData = null;
          let paintingTexture = "painting"; // Default texture

          if (i === 0) {
            // First painting - About
            displayText = "ABOUT";
            isAbout = true;
            paintingTexture = "aboutmepainting";
          } else if (i === 7) {
            // Last painting - Contact
            displayText = "CONTACT";
            isContact = true;
            paintingTexture = "contactmepainting";
          } else if (projects[i - 1]) {
            // Middle 6 paintings - Projects
            projectData = projects[i - 1];
            displayText = projectData.title.toUpperCase();
          }

          // Create painting with appropriate texture
          const painting = this.add.image(x, paintingY, paintingTexture);

          // Apply different scaling for aboutmepainting and contactmepainting
          // Regular paintings are 1536x1024, new paintings are 612x408
          // Scale factor needed: 1536/612 = 2.51 for width, 1024/408 = 2.51 for height
          if (paintingTexture === "aboutmepainting" || paintingTexture === "contactmepainting") {
            const scaleMultiplier = 1536 / 612; // ~2.51
            painting.setScale(paintingScale * scaleMultiplier);
          } else {
            painting.setScale(paintingScale);
          }

          painting.setInteractive({ useHandCursor: true });

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
                // Position relative to painting frame using percentages for consistent placement
                let yOffset = paintingY - scaledPaintingHeight * 0.1;
                yOffset += scaledPaintingHeight * 0.09; // Proportional offset

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

                // Apply consistent sizing for all project images (scale proportionally)
                const finalScaleX = thumbnailScale * 1.015; // 1.5% wider
                const finalScaleY = thumbnailScale * 1.012; // 1.2% taller
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

          // Make painting clickable (but disabled initially)
          if (isAbout) {
            painting.on("pointerdown", () => {
              // Disable all painting interactions
              this.paintings.forEach(p => p.disableInteractive());
              window.dispatchEvent(new CustomEvent("showAbout"));
            });
          } else if (isContact) {
            painting.on("pointerdown", () => {
              // Disable all painting interactions
              this.paintings.forEach(p => p.disableInteractive());
              window.dispatchEvent(new CustomEvent("showContact"));
            });
          } else if (projectData) {
            painting.on("pointerdown", () => {
              // Disable all painting interactions
              this.paintings.forEach(p => p.disableInteractive());
              window.dispatchEvent(
                new CustomEvent("showProject", {
                  detail: projectData,
                })
              );
            });
          }

          // Start with paintings disabled - will be enabled after start screen
          painting.disableInteractive();

          // Store the painting's base scale for hover animations
          const basePaintingScale = (paintingTexture === "aboutmepainting" || paintingTexture === "contactmepainting")
            ? paintingScale * (1536 / 612)
            : paintingScale;
          painting.basePaintingScale = basePaintingScale;

          // Add hover effect
          painting.on("pointerover", () => {
            painting.setScale(painting.basePaintingScale * 1.05);
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
            painting.setScale(painting.basePaintingScale);
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
            windowSprite.setInteractive({ useHandCursor: true });

            // Store initial state
            windowSprite.isOpen = false;

            // Toggle window on click
            windowSprite.on("pointerdown", () => {
              if (windowSprite.isOpen) {
                windowSprite.setTexture("window");
                windowSprite.isOpen = false;
              } else {
                windowSprite.setTexture("windowOpen");
                windowSprite.isOpen = true;
              }
            });

            this.windows.push(windowSprite);
          }
        }

        // Add instruction text (scaled to background like everything else)
        const instructionsText = this.add.text(
          width / 2,
          30 * bgScale, // Anchored to background scale
          "Click on paintings to view projects | Use Arrow Keys to Navigate",
          {
            fontSize: `${16 * bgScale}px`, // Scaled with background
            fill: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: { x: 20 * bgScale, y: 10 * bgScale }, // Scaled padding
            align: "center",
            fontFamily: '"Press Start 2P", cursive',
          }
        );
        instructionsText.setOrigin(0.5);
        instructionsText.setScrollFactor(0);
        instructionsText.setDepth(1000);

        // Camera controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Start camera at the left
        this.cameras.main.scrollX = 0;

        // Touch support
        this.input.addPointer(2);
      }

      update() {
        if (!this.player) return;

        const moveSpeed = 600; // Twice as fast (was 300)
        let velocityX = 0;
        let isMoving = false;

        // Handle mobile joystick input
        if (this.isMobile && this.joystick) {
          velocityX = this.joystick.force.x * moveSpeed;
          isMoving = Math.abs(this.joystick.force.x) > 0.1;

          // Flip character based on movement direction
          if (this.joystick.force.x < -0.1) {
            this.player.setFlipX(true);
          } else if (this.joystick.force.x > 0.1) {
            this.player.setFlipX(false);
          }
        }
        // Handle keyboard input for desktop
        else {
          if (this.cursors.left.isDown) {
            velocityX = -moveSpeed;
            isMoving = true;
            this.player.setFlipX(true);
          } else if (this.cursors.right.isDown) {
            velocityX = moveSpeed;
            isMoving = true;
            this.player.setFlipX(false);
          }

          // Jump with spacebar or up arrow
          if ((this.cursors.up.isDown || this.cursors.space?.isDown) && !this.isJumping) {
            this.isJumping = true;
            this.jumpStartTime = this.time.now;
            this.player.anims.play("jump", true);
          }
        }

        // Apply horizontal velocity
        this.player.setVelocityX(velocityX);

        // Handle jump arc (smooth parabolic motion)
        if (this.isJumping) {
          const elapsed = this.time.now - this.jumpStartTime;
          const progress = Math.min(elapsed / this.jumpDuration, 1);

          // Parabolic arc: goes up then down
          // At progress 0 -> 0, at 0.5 -> 1 (peak), at 1 -> 0 (back to ground)
          const jumpOffset = Math.sin(progress * Math.PI) * this.jumpHeight;
          this.player.y = this.groundY - jumpOffset;

          // End jump when duration is complete
          if (progress >= 1) {
            this.isJumping = false;
            this.player.y = this.groundY;
          }
        } else {
          // Keep character at fixed ground height when not jumping
          this.player.y = this.groundY;
        }

        // Handle animations based on player state
        if (!this.isJumping) {
          if (isMoving) {
            if (this.player.anims.currentAnim?.key !== "run") {
              this.player.anims.play("run", true);
            }
          } else {
            if (this.player.anims.currentAnim?.key !== "idle") {
              this.player.anims.play("idle", true);
            }
          }
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
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);
    gameInstance.current = game;

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
      {showStartScreen && (
        <div className={`start-screen ${fadeOut ? 'fade-out' : ''}`}>
          <div className="start-screen-content">
            <h1 className="pixel-title">SEARAN'S<br />PORTFOLIO</h1>
            <button className="pixel-start-button" onClick={handleStartClick}>
              <span className="button-text">START</span>
            </button>
            <div className="pixel-instructions">
              Press START to enter the museum
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={() => { setSelectedProject(null); enablePaintings(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => { setSelectedProject(null); enablePaintings(); }}
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
              {selectedProject.title === "Talking Objects" && (
                <a
                  href="https://talkobj.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#4a9eff",
                    textDecoration: "underline",
                    fontSize: "14px",
                    marginTop: "-10px",
                    display: "block",
                    fontFamily: '"Press Start 2P", cursive'
                  }}
                >
                  talkobj.vercel.app
                </a>
              )}
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
        <div className="modal-overlay" onClick={() => { setShowContact(false); enablePaintings(); }}>
          <div
            className="modal-content contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => { setShowContact(false); enablePaintings(); }}>
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
        <div className="modal-overlay" onClick={() => { setShowAbout(false); enablePaintings(); }}>
          <div
            className="modal-content about-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => { setShowAbout(false); enablePaintings(); }}>
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
