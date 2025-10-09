import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './gamePortfolio.scss';

const GamePortfolio = () => {
  const gameRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Talking Objects",
      img: "./TO0.png",
      desc: "An interactive application that brings everyday objects to life through AI-powered conversations. Users can engage with various objects, each with unique personalities and knowledge, creating an immersive and educational experience.",
      url: "https://talkobj.vercel.app/",
      tech: ["React", "AI", "Node.js"]
    },
    {
      id: 2,
      title: "Portfolio Risk Dashboard",
      img: "./PR1.png",
      desc: "A comprehensive portfolio risk management dashboard that provides real-time analytics and visualizations for investment portfolios. Features advanced risk metrics, performance tracking, and interactive charts to help investors make informed decisions.",
      url: "https://github.com/Skugane6/Portfolio-Risk-Dashboard",
      tech: ["React", "D3.js", "Finance APIs"]
    },
    {
      id: 3,
      title: "Pet Recommendation App",
      img: "./pet.png",
      desc: "The pet recommendation app, developed with React.js (frontend) and Express.js (backend), connects seamlessly with the Petfinder API. It empowers users to explore adoptable pets using a sophisticated algorithm that analyzes their responses to personalized questions. Users can provide feedback for continuous improvement.",
      url: "https://www.youtube.com/watch?v=0Tip-LDCYig&t=87s",
      tech: ["React", "Express.js", "Petfinder API"]
    },
    {
      id: 4,
      title: "Eye Tracking Mouse",
      img: "./eye.png",
      desc: "This Python program utilizes the MediaPipe, OpenCV, and PyAutoGUI libraries to track the location of the user's eyes and adjust the cursor accordingly. MediaPipe is employed for facial landmark detection, OpenCV is utilized for image processing and eye tracking, and PyAutoGUI is responsible for tracking cursor movement.",
      url: "https://github.com/Skugane6/eye-mouse",
      tech: ["Python", "MediaPipe", "OpenCV"]
    },
    {
      id: 5,
      title: "iFinance Application",
      img: "./ifinance.png",
      desc: "I designed and partially developed a flexible Personal Finance Management System featuring user authentication and creation. The system is crafted using Java, SQL, and JavaFX. It incorporates the core principles of double-entry bookkeeping, enabling users to oversee assets, liabilities, income, expenses, and ensuring precise tracking of financial transactions within the platform.",
      url: "https://github.com/Skugane6/iFinance",
      tech: ["Java", "SQL", "JavaFX"]
    },
    {
      id: 6,
      title: "Avatar Game",
      img: "./avatargame.png",
      desc: "Become the Avatar in this thrilling game! Fight elemental monsters across 4 levels, collecting coins after each victory. Upgrade stats at the shop. Face off against Prince Zuko in an epic boss battle!",
      url: "https://github.com/Skugane6/avatar-game",
      tech: ["Python", "Pygame"]
    },
  ];

  useEffect(() => {
    class GameScene extends Phaser.Scene {
      constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.cursors = null;
        this.platforms = null;
        this.questionBlocks = [];
        this.velocity = 200;
        this.jumpVelocity = -600;
      }

      preload() {
        // Load stick figure sprites
        const spriteBasePath = './Stick Figure Character Sprites 2D/Fighter sprites/';

        // Load idle frames
        for (let i = 1; i <= 8; i++) {
          const frameNum = String(i).padStart(4, '0');
          this.load.image(`idle_${i}`, `${spriteBasePath}fighter_Idle_${frameNum}.png`);
        }

        // Load walk frames
        for (let i = 9; i <= 16; i++) {
          const frameNum = String(i).padStart(4, '0');
          this.load.image(`walk_${i}`, `${spriteBasePath}fighter_walk_${frameNum}.png`);
        }

        // Load run frames
        for (let i = 17; i <= 24; i++) {
          const frameNum = String(i).padStart(4, '0');
          this.load.image(`run_${i}`, `${spriteBasePath}fighter_run_${frameNum}.png`);
        }

        // Load jump frames
        for (let i = 43; i <= 47; i++) {
          const frameNum = String(i).padStart(4, '0');
          this.load.image(`jump_${i}`, `${spriteBasePath}fighter_jump_${frameNum}.png`);
        }

        // Load lucky block image
        this.load.image('luckyBlock', `${spriteBasePath}luckyblock.png`);

        // Load background
        this.load.image('background', './background.png');

        // Create simple colored rectangles for game objects
        this.createPlaceholderAssets();
      }

      createPlaceholderAssets() {

        // Platform
        const platformGraphics = this.add.graphics();
        platformGraphics.fillStyle(0x8B4513, 1);
        platformGraphics.fillRect(0, 0, 400, 32);
        platformGraphics.generateTexture('platform', 400, 32);
        platformGraphics.destroy();

        // Ground
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x654321, 1);
        groundGraphics.fillRect(0, 0, 800, 64);
        groundGraphics.generateTexture('ground', 800, 64);
        groundGraphics.destroy();

        // Contact coin
        const contactGraphics = this.add.graphics();
        contactGraphics.fillStyle(0xFF0000, 1);
        contactGraphics.fillCircle(32, 32, 32);
        contactGraphics.generateTexture('contactCoin', 64, 64);
        contactGraphics.destroy();

        // About coin
        const aboutGraphics = this.add.graphics();
        aboutGraphics.fillStyle(0x00BFFF, 1);
        aboutGraphics.fillCircle(32, 32, 32);
        aboutGraphics.generateTexture('aboutCoin', 64, 64);
        aboutGraphics.destroy();
      }

      create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Set world bounds for scrolling
        this.physics.world.setBounds(0, 0, 3000, height);

        // Add background image
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Scale background to fit screen
        const scaleX = width / 1920;
        const scaleY = height / 1080;
        const scale = Math.max(scaleX, scaleY); // Use max to ensure it covers the screen
        bg.setScale(scale);
        bg.setScrollFactor(0); // Fixed background, doesn't scroll

        // Create animations
        this.anims.create({
          key: 'idle',
          frames: [
            { key: 'idle_1' },
            { key: 'idle_2' },
            { key: 'idle_3' },
            { key: 'idle_4' },
            { key: 'idle_5' },
            { key: 'idle_6' },
            { key: 'idle_7' },
            { key: 'idle_8' }
          ],
          frameRate: 10,
          repeat: -1
        });

        this.anims.create({
          key: 'walk',
          frames: [
            { key: 'walk_9' },
            { key: 'walk_10' },
            { key: 'walk_11' },
            { key: 'walk_12' },
            { key: 'walk_13' },
            { key: 'walk_14' },
            { key: 'walk_15' },
            { key: 'walk_16' }
          ],
          frameRate: 12,
          repeat: -1
        });

        this.anims.create({
          key: 'run',
          frames: [
            { key: 'run_17' },
            { key: 'run_18' },
            { key: 'run_19' },
            { key: 'run_20' },
            { key: 'run_21' },
            { key: 'run_22' },
            { key: 'run_23' },
            { key: 'run_24' }
          ],
          frameRate: 15,
          repeat: -1
        });

        this.anims.create({
          key: 'jump',
          frames: [
            { key: 'jump_43' },
            { key: 'jump_44' },
            { key: 'jump_45' },
            { key: 'jump_46' },
            { key: 'jump_47' }
          ],
          frameRate: 10,
          repeat: 0
        });

        // Create platforms group
        this.platforms = this.physics.add.staticGroup();

        // Ground
        for (let i = 0; i < 4; i++) {
          this.platforms.create(i * 800 + 400, height - 32, 'ground');
        }

        // Create player with idle sprite
        this.player = this.physics.add.sprite(100, height - 200, 'idle_1');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.8); // Smaller character size
        this.player.play('idle');

        // Single platform height - just high enough for player to jump and hit
        const platformHeight = height - 200;
        const blockHeight = platformHeight - 100; // Blocks 100px above platform

        // Create question blocks for each project - all at same level
        const blockPositions = [
          { x: 400, y: blockHeight },
          { x: 650, y: blockHeight },
          { x: 900, y: blockHeight },
          { x: 1150, y: blockHeight },
          { x: 1400, y: blockHeight },
          { x: 1650, y: blockHeight },
        ];

        projects.forEach((project, index) => {
          if (blockPositions[index]) {
            const block = this.physics.add.sprite(
              blockPositions[index].x,
              blockPositions[index].y,
              'luckyBlock'
            );
            block.setImmovable(true);
            block.body.allowGravity = false;
            block.projectData = project;
            block.setScale(0.3); // Smaller scale for lucky blocks
            this.questionBlocks.push(block);

            // Add floating animation
            this.tweens.add({
              targets: block,
              y: block.y - 10,
              duration: 1000,
              yoyo: true,
              repeat: -1,
              ease: 'Sine.easeInOut'
            });
          }
        });

        // Create special coins - About at beginning, Contact at end
        const aboutCoin = this.physics.add.sprite(200, blockHeight, 'aboutCoin');
        aboutCoin.body.allowGravity = false;
        aboutCoin.setImmovable(true);
        aboutCoin.isAbout = true;
        this.questionBlocks.push(aboutCoin);

        const aboutText = this.add.text(200, blockHeight, 'i', {
          fontSize: '36px',
          color: '#FFFFFF',
          fontFamily: '"Press Start 2P", cursive'
        });
        aboutText.setOrigin(0.5);

        this.tweens.add({
          targets: aboutCoin,
          angle: 360,
          duration: 2000,
          repeat: -1,
          ease: 'Linear'
        });

        const contactCoin = this.physics.add.sprite(1900, blockHeight, 'contactCoin');
        contactCoin.body.allowGravity = false;
        contactCoin.setImmovable(true);
        contactCoin.isContact = true;
        this.questionBlocks.push(contactCoin);

        const contactText = this.add.text(1900, blockHeight, 'C', {
          fontSize: '36px',
          color: '#FFFFFF',
          fontFamily: '"Press Start 2P", cursive'
        });
        contactText.setOrigin(0.5);

        this.tweens.add({
          targets: contactCoin,
          angle: 360,
          duration: 2000,
          repeat: -1,
          ease: 'Linear'
        });

        // Physics
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.questionBlocks, this.hitBlock, null, this);

        // Camera follows player
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, 3000, height);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Instructions text
        const instructionsText = this.add.text(100, 50,
          'Arrow Keys to Move | Space/Up to Jump | Hit blocks from below!\nAbout (i) → Projects (?) → Contact (C)',
          {
            fontSize: '14px',
            fill: '#000',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 },
            align: 'center',
            fontFamily: '"Press Start 2P", cursive'
          }
        );
        instructionsText.setScrollFactor(0);
      }

      hitBlock(player, block) {
        if (player.body.touching.up && block.body.touching.down) {
          if (block.isContact) {
            window.dispatchEvent(new CustomEvent('showContact'));
          } else if (block.isAbout) {
            window.dispatchEvent(new CustomEvent('showAbout'));
          } else if (block.projectData) {
            window.dispatchEvent(new CustomEvent('showProject', {
              detail: block.projectData
            }));
          }

          // Bump animation
          this.tweens.add({
            targets: block,
            y: block.y - 20,
            duration: 100,
            yoyo: true,
            ease: 'Linear'
          });
        }
      }

      update() {
        if (!this.player) return;

        const onGround = this.player.body.touching.down;

        // Horizontal movement
        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-this.velocity);
          this.player.flipX = true;
          if (onGround) {
            this.player.play('run', true);
          }
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(this.velocity);
          this.player.flipX = false;
          if (onGround) {
            this.player.play('run', true);
          }
        } else {
          this.player.setVelocityX(0);
          if (onGround) {
            this.player.play('idle', true);
          }
        }

        // Jump
        if ((this.cursors.up.isDown || this.spaceKey.isDown) && onGround) {
          this.player.setVelocityY(this.jumpVelocity);
          this.player.play('jump', true);
        }

        // If in air and not jumping animation, show jump
        if (!onGround && this.player.anims.currentAnim?.key !== 'jump') {
          this.player.play('jump', true);
        }
      }
    }

    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1200 },
          debug: false
        }
      },
      scene: GameScene,
      backgroundColor: '#87CEEB'
    };

    const game = new Phaser.Game(config);

    // Event listeners
    const handleShowProject = (e) => setSelectedProject(e.detail);
    const handleShowContact = () => setShowContact(true);
    const handleShowAbout = () => setShowAbout(true);

    window.addEventListener('showProject', handleShowProject);
    window.addEventListener('showContact', handleShowContact);
    window.addEventListener('showAbout', handleShowAbout);

    // Handle resize
    const handleResize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('showProject', handleShowProject);
      window.removeEventListener('showContact', handleShowContact);
      window.removeEventListener('showAbout', handleShowAbout);
      window.removeEventListener('resize', handleResize);
      game.destroy(true);
    };
  }, []);

  return (
    <div className="game-portfolio">
      <div ref={gameRef} className="game-container" />

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            <div className="modal-body">
              <img src={selectedProject.img} alt={selectedProject.title} className="project-image" />
              <h2>{selectedProject.title}</h2>
              <div className="tech-stack">
                {selectedProject.tech.map((tech, idx) => (
                  <span key={idx} className="tech-badge">{tech}</span>
                ))}
              </div>
              <p>{selectedProject.desc}</p>
              <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="project-link">
                View Project →
              </a>
            </div>
          </div>
        </div>
      )}

      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowContact(false)}>×</button>
            <div className="modal-body">
              <h2>Contact Me</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <img src="./email.png" alt="Email" />
                  <div>
                    <h3>Email</h3>
                    <a href="mailto:searan.kuganesan4@gmail.com">searan.kuganesan4@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <img src="./github.png" alt="GitHub" />
                  <div>
                    <h3>GitHub</h3>
                    <a href="https://github.com/Skugane6" target="_blank" rel="noopener noreferrer">@Skugane6</a>
                  </div>
                </div>
                <div className="contact-item">
                  <img src="./linkedin.png" alt="LinkedIn" />
                  <div>
                    <h3>LinkedIn</h3>
                    <a href="https://linkedin.com/in/searan-kuganesan" target="_blank" rel="noopener noreferrer">Searan Kuganesan</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span style={{fontSize: '2rem'}}>📱</span>
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
          <div className="modal-content about-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowAbout(false)}>×</button>
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
              <a href="./Searan_Resume.pdf" download="Searan_Kuganesan_Resume.pdf" className="resume-btn">
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
