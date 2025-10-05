import React, { useState, useEffect, useRef } from 'react';
import ProfilePhoto from './ProfilePhoto';

const Terminal = ({ language = 'en' }) => {
  const [currentView, setCurrentView] = useState('welcome');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Translations
  const translations = {
    en: {
      commands: {
        'whoami': 'welcome',
        'profile': 'profile',
        'about': 'profile',
        'experience': 'experience', 
        'career': 'experience',
        'work': 'experience',
        'skills': 'skills',
        'tech': 'skills',
        'architecture': 'skills',
        'stack': 'skills',
        'contact': 'contact',
        'connect': 'contact',
        'help': 'help',
        'clear': 'clear',
        'ls': 'help',
        'up': 'scroll',
        'down': 'scroll',
        'exit': 'welcome',
        'home': 'welcome'
      },
      terminal: {
        prompt: 'terminal@dinahasina-os:~$',
        welcome: {
          title: '🚀 Welcome to Dinahasina\'s Digital Universe',
          subtitle: '🎯 Software Architect & Full-Stack Developer | Born 1998 • Same Age as Google 🌐',
          experience: '⚡ 7 Years of Experience | Dedicated to Crafting Clean, High-Performance Software',
          about: {
            title: '💎 About Me:',
            content: 'I approach development with precision and purpose — focusing on code quality, architectural clarity, and long-term maintainability. Every system I design is built to perform, evolve, and remain elegant over time.'
          },
          philosophy: {
            title: '🎯 Philosophy:',
            content: 'I\'m deeply driven by the pursuit of technical excellence, combining clean design principles with advanced optimization techniques to deliver software that\'s both powerful and efficient.'
          },
          innovation: {
            title: '🚀 Innovation:',
            content: 'I embrace modern development accelerators — from AI-assisted coding to workflow automation — tools that amplify speed, consistency, and creative flow without ever compromising quality.'
          },
          navigation: {
            title: '🔍 Quick Navigation:',
            skills: 'skills - Discover my tech arsenal',
            experience: 'experience - Journey through my career',
            contact: 'contact - Get in touch'
          },
          ready: '💡 Ready to explore? Use the navigation buttons or type a command above.'
        },
        help: {
          title: '📋 Available Commands:',
          commands: {
            'whoami': 'Show welcome message',
            'profile': 'Display personal information',
            'experience': 'Show career history',
            'skills': 'Display technical skills',
            'contact': 'Show contact information',
            'help': 'Show this help message',
            'clear': 'Clear the terminal'
          }
        }
      }
    },
    fr: {
      commands: {
        'qui': 'welcome',
        'profil': 'profile',
        'moi': 'profile',
        'experience': 'experience', 
        'carriere': 'experience',
        'travail': 'experience',
        'competences': 'skills',
        'tech': 'skills',
        'architecture': 'skills',
        'stack': 'skills',
        'contact': 'contact',
        'connecter': 'contact',
        'aide': 'help',
        'effacer': 'clear',
        'ls': 'help',
        'haut': 'scroll',
        'bas': 'scroll',
        'sortir': 'welcome',
        'accueil': 'welcome'
      },
      terminal: {
        prompt: 'terminal@dinahasina-os:~$',
        welcome: {
          title: '🚀 Bienvenue dans l\'Univers Numérique de Dinahasina',
          subtitle: '🎯 Architecte Logiciel & Développeur Full-Stack | Né en 1998 • Même âge que Google 🌐',
          experience: '⚡ 7 Ans d\'Expérience | Dédié à la Création de Logiciels Propres et Performants',
          about: {
            title: '💎 À Propos de Moi :',
            content: 'J\'aborde le développement avec précision et détermination — en me concentrant sur la qualité du code, la clarté architecturale, et la maintenabilité à long terme. Chaque système que je conçois est construit pour performer, évoluer, et rester élégant au fil du temps.'
          },
          philosophy: {
            title: '🎯 Philosophie :',
            content: 'Je suis profondément motivé par la poursuite de l\'excellence technique, combinant des principes de conception propres avec des techniques d\'optimisation avancées pour livrer des logiciels puissants et efficaces.'
          },
          innovation: {
            title: '🚀 Innovation :',
            content: 'J\'embrasse les accélérateurs de développement modernes — du codage assisté par IA à l\'automatisation des workflows — des outils qui amplifient la vitesse, la cohérence, et le flux créatif sans jamais compromettre la qualité.'
          },
          navigation: {
            title: '🔍 Navigation Rapide :',
            skills: 'competences - Découvrir mon arsenal technologique',
            experience: 'experience - Parcourir ma carrière',
            contact: 'contact - Me contacter'
          },
          ready: '💡 Prêt à explorer ? Utilise les boutons de navigation ou tape une commande ci-dessus.'
        },
        help: {
          title: '📋 Commandes Disponibles :',
          commands: {
            'qui': 'Afficher le message de bienvenue',
            'profil': 'Afficher les informations personnelles',
            'experience': 'Montrer l\'historique de carrière',
            'competences': 'Afficher les compétences techniques',
            'contact': 'Afficher les informations de contact',
            'aide': 'Afficher ce message d\'aide',
            'effacer': 'Effacer le terminal'
          }
        }
      }
    }
  };

  const t = translations[language];
  const commands = t.commands;

  useEffect(() => {
    // Focus on input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentView]);

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Ensure terminal starts at the top when component mounts or view changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = 0;
    }
  }, [currentView, commandHistory]);

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    if (cleanCmd === '') return;

    // Add command to history
    const newHistory = [...commandHistory, { command: cmd, output: '' }];
    setCommandHistory(newHistory);

    if (commands[cleanCmd]) {
      if (cleanCmd === 'clear') {
        setCommandHistory([]);
        setCurrentView('welcome');
      } else if (cleanCmd === 'up' || cleanCmd === 'down') {
        handleScroll(cleanCmd);
      } else {
        setCurrentView(commands[cleanCmd]);
      }
    } else {
      // Unknown command
      const errorHistory = [...newHistory];
      errorHistory[errorHistory.length - 1] = {
        ...errorHistory[errorHistory.length - 1],
        output: `Command not found: ${cmd}. Type 'help' for available commands.`
      };
      setCommandHistory(errorHistory);
    }
    
    setCurrentCommand('');
  };

  const handleScroll = (direction) => {
    if (direction === 'up') {
      // Scroll up in the terminal
      if (terminalRef.current) {
        terminalRef.current.scrollTop -= 100;
      }
    } else if (direction === 'down') {
      // Scroll down in the terminal
      if (terminalRef.current) {
        terminalRef.current.scrollTop += 100;
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
    }
  };

  const renderWelcome = () => (
    <div>
      <div className="welcome-section">
        <ProfilePhoto />
        <div className="welcome-text">
          <div className="ascii-art">
{`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                             ┃
┃   ██████╗ ██╗███╗   ██╗ █████╗ ██╗  ██╗ █████╗ ███████╗██╗███╗   ██╗ █████╗ ┃
┃   ██╔══██╗██║████╗  ██║██╔══██╗██║  ██║██╔══██╗██╔════╝██║████╗  ██║██╔══██╗┃
┃   ██║  ██║██║██╔██╗ ██║███████║███████║███████║███████╗██║██╔██╗ ██║███████║┃
┃   ██║  ██║██║██║╚██╗██║██╔══██║██╔══██║██╔══██║╚════██║██║██║╚██╗██║██╔══██║┃
┃   ██████╔╝██║██║ ╚████║██║  ██║██║  ██║██║  ██║███████║██║██║ ╚████║██║  ██║┃
┃   ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝┃
┃                                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
`}
          </div>
          
          <div className="command-output">
            <div className="output-line">{t.terminal.welcome.title}</div>
            <div className="output-line">{t.terminal.welcome.subtitle}</div>
            <div className="output-line">{t.terminal.welcome.experience}</div>
            <div className="output-line"> </div>
            <div className="output-line">{t.terminal.welcome.about.title}</div>
            <div className="output-line">{t.terminal.welcome.about.content}</div>
            <div className="output-line"> </div>
            <div className="output-line">{t.terminal.welcome.philosophy.title}</div>
            <div className="output-line">{t.terminal.welcome.philosophy.content}</div>
            <div className="output-line"> </div>
            <div className="output-line">{t.terminal.welcome.innovation.title}</div>
            <div className="output-line">{t.terminal.welcome.innovation.content}</div>
            <div className="output-line"> </div>
            <div className="output-line">{t.terminal.welcome.navigation.title}</div>
            <div className="output-line">  <span className="command-help">{language === 'fr' ? 'competences' : 'skills'}</span> - {t.terminal.welcome.navigation.skills}</div>
            <div className="output-line">  <span className="command-help">experience</span> - {t.terminal.welcome.navigation.experience}</div>
            <div className="output-line">  <span className="command-help">contact</span> - {t.terminal.welcome.navigation.contact}</div>
            <div className="output-line"> </div>
            <div className="output-line">{t.terminal.welcome.ready}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div>
      <div className="command-output">
        <div className="output-line">Name: Dinahasina Ralaivao</div>
        <div className="output-line">Birth_Year: 1998 # Google's birth year too 🎂</div>
        <div className="output-line">Experience: 7+ years in the matrix</div>
        <div className="output-line">Current_Role: Software Architect</div>
        <div className="output-line">Philosophy: where (code.vibes == ∞) && (technical.skills == elite)</div>
        <div className="output-line">Status: [████████████████████] 100% Coding</div>
        <div className="output-line"> </div>
        <div className="output-line">"Code is poetry written in logic, and I'm here to compose symphonies that scale." 🎵</div>
        <div className="output-line"> </div>
        <div className="output-line">Passionate about building scalable solutions and creating innovative software architectures that make a difference.</div>
        <div className="output-line">Specialized in Python, React, C++, and automation with n8n.</div>
        <div className="output-line">Currently focusing on SaaS platforms, microservices, and modern UI/UX architectures.</div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div>
      <div className="command-output">
        <div className="output-line">[2024-07 → Present] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="output-line">│ </div>
        <div className="output-line">│ 🌍 Remote | Fullstack Developer | Freelance</div>
        <div className="output-line">│ ├─ ⚛️  Frontend Development: React, Next.js</div>
        <div className="output-line">│ ├─ 🐍 Backend Development: Django, Node.js</div>
        <div className="output-line">│ └─ 🔄 Methodology: Agile Development & Project Leadership</div>
        <div className="output-line">│ </div>
        <div className="output-line">│ 🏢 Remote | MFC C++ Developer | RID Informatique</div>
        <div className="output-line">│ ├─ 🎨 UX Ergonomic Redesign & UI Modernization</div>
        <div className="output-line">│ ├─ ⚡ Optimization: GDI, Memory, Threads</div>
        <div className="output-line">│ ├─ 🔧 Code Refactoring & Source Maintenance</div>
        <div className="output-line">│ └─ 🔐 Implementation of Asymmetric Encryption in Messaging</div>
        <div className="output-line">└━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="output-line"> </div>
        <div className="output-line">[2022-09 → 2024-08] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="output-line">│ </div>
        <div className="output-line">│ 🏢 Antananarivo | Fullstack Developer | Natix-Group (ATSCOM)</div>
        <div className="output-line">│ ├─ ☁️  SaaS Conception & Development</div>
        <div className="output-line">│ ├─ ⚛️  Frontend: React, Next.js</div>
        <div className="output-line">│ ├─ 🐍 Backend REST: Django, Node.js</div>
        <div className="output-line">│ └─ ⛓️  Blockchain: Ethereum ERC20 Token Development</div>
        <div className="output-line">└━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="output-line"> </div>
        <div className="output-line">[2019-04 → 2022-06] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="output-line">│ </div>
        <div className="output-line">│ 🏢 Antananarivo | C++ Developer | Futurmap Data</div>
        <div className="output-line">│ ├─ 🗺️  AutoCAD & QGIS Plugin Development</div>
        <div className="output-line">│ ├─ 🎨 Modern & Optimized Qt Interfaces</div>
        <div className="output-line">│ ├─ 🔄 Unified Format: AutoCAD ↔ QGIS ↔ Terrascan</div>
        <div className="output-line">│ └─ 🧪 Unit Testing & Automated Documentation</div>
        <div className="output-line">└━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="output-line"> </div>
        <div className="output-line">Career trajectory: 7+ years of continuous growth</div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div>
      <div className="command-output">
        <div className="output-line">architecture_stack/</div>
        <div className="output-line">├── languages/</div>
        <div className="output-line">├── frameworks/</div>
        <div className="output-line">└── patterns/</div>
        <div className="output-line"> </div>
        <div className="output-line">┌─────────────────────────────────────────────────────────────┐</div>
        <div className="output-line">│ CORE_LANGUAGES/                                             │</div>
        <div className="output-line">├─────────────────────────────────────────────────────────────┤</div>
        <div className="output-line">│ 🐍 Python        ████████████████████ 95%</div>
        <div className="output-line">│ ⚛️  React         ████████████████████ 95%</div>
        <div className="output-line">│ ⚙️  C++/MFC       ██████████████████   90%</div>
        <div className="output-line">│ 🟢 Node.js       ███████████████████  92%</div>
        <div className="output-line">│ ⚡ Next.js       ███████████████████  92%</div>
        <div className="output-line">└─────────────────────────────────────────────────────────────┘</div>
        <div className="output-line"> </div>
        <div className="output-line">┌─────────────────────────────────────────────────────────────┐</div>
        <div className="output-line">│ FRAMEWORKS_&_TOOLS/                                         │</div>
        <div className="output-line">├─────────────────────────────────────────────────────────────┤</div>
        <div className="output-line">│ 🎸 Django        ████████████████████ 95%</div>
        <div className="output-line">│ 🤖 n8n           ██████████████████   88%</div>
        <div className="output-line">│ 🎨 Qt            ████████████████     82%</div>
        <div className="output-line">│ ⛓️  Ethereum      ███████████████      78%</div>
        <div className="output-line">│ 🔄 Agile/Scrum   ████████████████████ 96%</div>
        <div className="output-line">└─────────────────────────────────────────────────────────────┘</div>
        <div className="output-line"> </div>
        <div className="output-line">┌─────────────────────────────────────────────────────────────┐</div>
        <div className="output-line">│ ARCHITECTURE_PATTERNS/                                      │</div>
        <div className="output-line">├─────────────────────────────────────────────────────────────┤</div>
        <div className="output-line">│ • REST API Design & Microservices Architecture</div>
        <div className="output-line">│ • SaaS Platform Development & Scalability</div>
        <div className="output-line">│ • Modern UI/UX Architecture & Component Design</div>
        <div className="output-line">│ • Workflow Orchestration & Automation Systems</div>
        <div className="output-line">│ • Performance Optimization & Code Refactoring</div>
        <div className="output-line">│ • Security Architecture (Asymmetric Encryption)</div>
        <div className="output-line">│ • Plugin Architecture & Extensible Systems</div>
        <div className="output-line">└─────────────────────────────────────────────────────────────┘</div>
        <div className="output-line"> </div>
        <div className="output-line">Skills analysis complete - Ready for deployment</div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div>
      <div className="command-output">
        <div className="output-line">┌─────────────────────────────────────────────────────┐</div>
        <div className="output-line">  [TRANSMISSION READY]                               </div>
        <div className="output-line">  Awaiting connection request...                     </div>
        <div className="output-line">  Status: ONLINE ● Available for projects            </div>
        <div className="output-line">└─────────────────────────────────────────────────────┘</div>
        <div className="output-line"> </div>
        <div className="output-line">📧 Email: dinahasina.s217@gmail.com</div>
        <div className="output-line">💼 LinkedIn: <a href="https://linkedin.com/in/dinahasina" target="_blank" rel="noopener noreferrer">linkedin.com/in/dinahasina</a></div>
        <div className="output-line">🐙 GitHub: <a href="https://github.com/dinahasina1" target="_blank" rel="noopener noreferrer">github.com/dinahasina1</a></div>
        <div className="output-line">🌐 Portfolio: <a href="https://dinahasina1.github.io/dinahasina1" target="_blank" rel="noopener noreferrer">dinahasina-portfolio.com</a></div>
        <div className="output-line"> </div>
        <div className="output-line">class SoftwareArchitect:</div>
        <div className="output-line">    def __init__(self):</div>
        <div className="output-line">        self.name = "Dinahasina Ralaivao"</div>
        <div className="output-line">        self.role = "Software Architect"</div>
        <div className="output-line">        self.location = "🌍 Remote"</div>
        <div className="output-line">        self.current_focus = [</div>
        <div className="output-line">            "Building scalable SaaS platforms",</div>
        <div className="output-line">            "Automating everything with n8n",</div>
        <div className="output-line">            "Crafting beautiful React interfaces",</div>
        <div className="output-line">            "Optimizing legacy systems"</div>
        <div className="output-line">        ]</div>
        <div className="output-line"> </div>
        <div className="output-line"># Active instance</div>
        <div className="output-line">dina = SoftwareArchitect()</div>
        <div className="output-line">dina.say_hi()</div>
        <div className="output-line"> </div>
        <div className="output-line">┌─────────────────────────────────────────────────────────────────────┐</div>
        <div className="output-line">                                                                     </div>
        <div className="output-line">   > System Status: ✅ OPERATIONAL                                   </div>
        <div className="output-line">   > Coffee Level: ████████░░ 80%                                    </div>
        <div className="output-line">   > Code Quality: ████████████ 100%                                 </div>
        <div className="output-line">   > Passion:      ∞                                                 </div>
        <div className="output-line">                                                                     </div>
        <div className="output-line">   "Building the future, one commit at a time."                     </div>
        <div className="output-line">                                                                     </div>
        <div className="output-line">   $ npm install @architect/dinahasina                              </div>
        <div className="output-line">   [✓] Package '@architect/dinahasina' already at latest version    </div>
        <div className="output-line">                                                                     </div>
        <div className="output-line">└─────────────────────────────────────────────────────────────────────┘</div>
        <div className="output-line"> </div>
        <div className="output-line">⚡ "Code. Create. Innovate. Repeat." ⚡</div>
        <div className="output-line">Always open to new opportunities and exciting projects</div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div>
      <div className="command-output">
        <div className="output-line">{t.terminal.help.title}</div>
        <div className="output-line"> </div>
        {Object.entries(t.terminal.help.commands).map(([cmd, desc]) => (
          <div key={cmd} className="output-line">
            <span className="command-help">{cmd}</span> - {desc}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return renderWelcome();
      case 'profile':
        return renderProfile();
      case 'experience':
        return renderExperience();
      case 'skills':
        return renderSkills();
      case 'contact':
        return renderContact();
      case 'help':
        return renderHelp();
      default:
        return renderWelcome();
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
          </div>
          <span>{t.terminal.prompt}</span>
        </div>
        
        <div className="terminal-content" ref={terminalRef}>
          {/* Command History */}
          {commandHistory.map((entry, index) => (
            <div key={index}>
              <div className="command-line">
                <span className="command-prompt">dina@matrix:~$</span>
                <span className="command-text">{entry.command}</span>
              </div>
              {entry.output && (
                <div className="command-output">
                  <div className="output-line">{entry.output}</div>
                </div>
              )}
            </div>
          ))}

          {/* Current View Content */}
          {renderCurrentView()}

          {/* Current Command Input */}
          <div className="command-line">
            <span className="command-prompt">dina@matrix:~$</span>
            <span className="command-text">
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                className="command-input"
                autoFocus
                spellCheck={false}
              />
              {showCursor && <span className="command-cursor">█</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="terminal-nav">
        <button className="nav-btn" onClick={() => handleScroll('up')}>↑</button>
        <button className="nav-btn" onClick={() => handleScroll('down')}>↓</button>
        <button className="nav-btn" onClick={() => setCurrentView('welcome')}>🏠 {language === 'fr' ? 'Accueil' : 'Home'}</button>
        <button className="nav-btn" onClick={() => setCurrentView('profile')}>👤 {language === 'fr' ? 'Profil' : 'Profile'}</button>
        <button className="nav-btn" onClick={() => setCurrentView('experience')}>💼 {language === 'fr' ? 'Expérience' : 'Experience'}</button>
        <button className="nav-btn" onClick={() => setCurrentView('skills')}>⚡ {language === 'fr' ? 'Compétences' : 'Skills'}</button>
        <button className="nav-btn" onClick={() => setCurrentView('contact')}>📞 {language === 'fr' ? 'Contact' : 'Contact'}</button>
      </div>
    </div>
  );
};

export default Terminal;
