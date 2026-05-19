// app.jsx — Neon Bloom landing page composition

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff3d8a",
  "showScanlines": true,
  "showCrownWarn": true,
  "heroTreatment": "split"
} /*EDITMODE-END*/;

function Nav() {
  return (
    <nav className="nav">
      <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0, width: "100%" }}>
        <div className="nav-mark"><span className="dot"></span> NEON BLOOM</div>
        <div className="nav-links">
          <a href="#world">World</a>
          <a href="#cargo">Cargo</a>
          <a href="#gameplay">Gameplay</a>
          <a href="#story">Story</a>
          <a href="#media">Media</a>
        </div>
        <div className="nav-meta">
          <span className="pill"><span className="live"></span> Bloom network active</span>
          <button className="btn btn-ghost" style={{ height: 36, padding: "0 14px" }}>Wishlist</button>
        </div>
      </div>
    </nav>);

}

function Hero() {
  return (
    <section className="hero-full">
      <div className="hero-scan"></div>
      <div className="stage-corner tl"></div>
      <div className="stage-corner tr"></div>
      <div className="stage-corner bl"></div>
      <div className="stage-corner br"></div>
      <div className="hero-signal"></div>

      <div className="hero-inner">
        <div className="hero-strip-top">
          <span>OPERATIVE · COURIER-07 // SECTOR 04 · NORTHWALL</span>
          <span className="live-dot"><span className="d"></span> LIVE FEED · 22:41 LOCAL</span>
          <span style={{ color: "var(--crown)" }}>⚠ CROWN PROXIMITY · 1.2KM</span>
        </div>

        <div className="hero-copy">
          <div className="hero-meta">
            <span className="eyebrow" style={{ color: "var(--bloom-2)" }}>● SIGNAL DETECTED · FREQ 0xA7</span>
            <span className="eyebrow">FILE · PX-01 / SEALED</span>
          </div>
          <h1 className="hero-title">
            <span className="ln">NEON</span>
            <span className="ln bloom">BLOOM</span>
          </h1>
          <p className="hero-tag">Deliver the signal. <em>Defy the Crown.</em></p>
          <p className="hero-intro">A vibrant open-world cyberpunk adventure where a lone courier is pulled into a conflict over the living network known as Bloom.</p>
          <div className="hero-ctas">
            <button className="btn btn-primary">Watch Trailer <span className="arr">▶</span></button>
            <button className="btn">Explore the World <span className="arr">→</span></button>
            <button className="btn btn-ghost">Wishlist Now</button>
          </div>
        </div>

        <div className="hero-strip-bot">
          <div className="cell"><span className="k">Genre</span><span className="v">Open-World Action</span></div>
          <div className="cell"><span className="k">Engine</span><span className="v">Bloom Runtime</span></div>
          <div className="cell"><span className="k">Release</span><span className="v">2027 · Q2</span></div>
          <div className="cell"><span className="k">Platforms</span><span className="v">PC · PS · XB</span></div>
          <div className="cell"><span className="k">Cargo</span><span className="v ok">PX-01 · SEALED</span></div>
          <div className="cell"><span className="k">Route</span><span className="v warn">RT-44 → DISTRICT 09</span></div>
        </div>
      </div>
    </section>);

}

function SectionHd({ num, title, right }) {
  return (
    <div className="section-hd">
      <div>
        <div className="num">{num}</div>
        <h2 style={{ marginTop: 14 }}>{title}</h2>
      </div>
      <div className="right">{right}</div>
    </div>);

}

function Intro() {
  const cards = [
  { tag: "01 · WORLD", title: "Open World", text: "Explore megacities, rooftops, transit tunnels and wide bloomfields." },
  { tag: "02 · MOVEMENT", title: "High-Speed Routes", text: "Deliver cargo across hostile zones by foot, vehicle and instinct." },
  { tag: "03 · NARRATIVE", title: "Story-Driven Action", text: "Uncover the truth behind Bloom and the faction trying to control it." }];

  return (
    <section className="intro" id="intro">
      <SectionHd num="§ 01 · OVERVIEW" title="A courier. A living network. A city under control." right={<>BLOOM NETWORK<br />STATUS: ACTIVE</>} />
      <div className="intro-body">
        <div className="eyebrow">— BRIEFING / 22:41 LOCAL</div>
        <p>Neon Bloom is an open-world cyberpunk action-adventure set across towering cities, dangerous transit routes and vast bloomfields. You play as a freelance courier whose latest delivery makes him the target of The Crown Division.</p>
      </div>
      <div className="feature-grid">
        {cards.map((c, i) =>
        <div className="fcard" key={i}>
            <div className="head">
              <span className="tag">{c.tag}</span>
              <span className="idx">F·{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
            <div className="strip"></div>
          </div>
        )}
      </div>
    </section>);

}

function Cassettes() {
  return (
    <section className="cassettes" id="cargo">
      <SectionHd num="§ 02 · COURIER PAYLOAD ARCHIVE" title="Classified Cargo" right={<>6 SEALED MODULES<br />FLIP TO INSPECT</>} />
      <div className="intro-body" style={{ padding: "28px 0 0" }}>
        <div className="eyebrow">— PAYLOAD MANIFEST</div>
        <p>Every delivery carries a fragment of the world. Hover each module to uncover the route, the threat, and the signal hidden inside.</p>
      </div>
      <CassetteGrid />
    </section>);

}

function World() {
  return (
    <section className="world" id="world">
      <SectionHd num="§ 03 · TERRAIN" title="A world between neon towers and open bloomfields" right={<>CITIES · BLOOMFIELDS<br />SCAN COMPLETE</>} />
      <div className="world-grid">
        <article className="panel">
          <div className="ribbon"></div>
          <div className="img-stage">
            <div className="panel-meta"><span>ZONE · INNER CITY</span><span>SCAN 09·44·12N</span></div>
            <image-slot id="world-city" placeholder="Drop city imagery"></image-slot>
          </div>
          <div className="panel-body">
            <span className="eyebrow" style={{ color: "var(--bloom)" }}>· THE CITIES</span>
            <h3>The Cities</h3>
            <p>Dense vertical districts, crowded markets, rooftop routes and surveillance-heavy transit zones. The city is beautiful, fast, and always watching.</p>
          </div>
        </article>
        <article className="panel">
          <div className="ribbon"></div>
          <div className="img-stage">
            <div className="panel-meta"><span>ZONE · OUTER FRONTIER</span><span>RELAY · OFFLINE</span></div>
            <image-slot id="world-fields" placeholder="Drop bloomfields landscape"></image-slot>
          </div>
          <div className="panel-body">
            <span className="eyebrow" style={{ color: "var(--bloom)" }}>· THE BLOOMFIELDS</span>
            <h3>The Bloomfields</h3>
            <p>Beyond the towers lies a vast open frontier of pink terrain, giant trees, relay stations and forgotten routes shaped by the living network.</p>
          </div>
        </article>
      </div>
    </section>);

}

function Gameplay() {
  const cards = [
  { tag: "PILLAR 01", n: "01", title: "Traversal", text: "Move through rooftops, alleys, tunnels and vertical city structures with speed and precision." },
  { tag: "PILLAR 02", n: "02", title: "Vehicle Chases", text: "Escape Crown pursuit across city streets, open roads and hostile transit lines." },
  { tag: "PILLAR 03", n: "03", title: "Combat", text: "Fight with mobility, gadgets and precision while protecting high-value cargo." },
  { tag: "PILLAR 04", n: "04", title: "Exploration", text: "Discover lost routes, hidden bloom zones, abandoned stations and fragments of the world's history." }];

  return (
    <section className="gameplay" id="gameplay">
      <SectionHd num="§ 04 · GAMEPLAY PILLARS" title="Run the routes. Break the system." right={<>4 PILLARS<br />SYSTEMIC PLAY</>} />
      <div className="gp-grid">
        {cards.map((c, i) =>
        <div className="gp" key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span className="tag">{c.tag}</span>
              <span className="num">{c.n}</span>
            </div>
            <div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          </div>
        )}
      </div>
    </section>);

}

function Story() {
  return (
    <section className="story" id="story">
      <div className="story-grid">
        <div className="story-copy">
          <span className="eyebrow">§ 05 · NARRATIVE HOOK</span>
          <h2>One delivery <em style={{ color: "var(--bloom)", fontStyle: "normal" }}>changed everything</em></h2>
          <p>You were supposed to move cargo — not start a war. But when a sealed module reveals a link to Bloom, your route becomes a target, your clients disappear, and The Crown Division begins to close in.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button className="btn btn-primary">Follow the Signal <span className="arr">→</span></button>
            <button className="btn btn-ghost">Read Lore Brief</button>
          </div>
        </div>
        <div className="story-img scanlines">
          <div className="panel-meta">
            <span>SURVEILLANCE LOG · 03:18</span>
            <span style={{ color: "var(--crown)" }}>⚠ CROWN PROXIMITY</span>
          </div>
          <image-slot id="story-courier" placeholder="Drop tense courier + glowing cargo scene"></image-slot>
          <div className="warn-tag">⚠ CROWN DIVISION · TRACKING</div>
          <div className="warn-strip"></div>
        </div>
      </div>
    </section>);

}

function Faction() {
  return (
    <section className="faction" id="faction">
      <SectionHd num="§ 06 · FACTIONS" title="Power has a color" right={<>BLOOM vs CROWN<br />READ THE FIELD</>} />
      <div className="fac-grid">
        <div className="fac fac--bloom">
          <div className="stamp">FRIENDLY · NETWORK</div>
          <span className="ftag">— THE LIVING SIGNAL</span>
          <h3>BLOOM</h3>
          <p>The living network pulsing through cities, machines and landscapes. A source of energy, memory and freedom.</p>
          <div className="mono" style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--mute)" }}>
            <span>PINK · WHITE · CYAN</span>
            <span>FREQ · 0xA7</span>
          </div>
        </div>
        <div className="fac fac--crown">
          <div className="stamp">HOSTILE · ARMED</div>
          <span className="ftag">— AUTHORITARIAN CONTROL</span>
          <h3>THE CROWN DIVISION</h3>
          <p>A militarized authority built on surveillance, transit control and force. If yellow appears, danger is near.</p>
          <div className="mono" style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 14, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--mute)" }}>
            <span>BLACK · GRAY · YELLOW</span>
            <span>FREQ · CR-Ω</span>
          </div>
        </div>
      </div>
    </section>);

}

function Gallery() {
  const items = [
  { c: "g1", k: "CAP-001", t: "City Vista", id: "gal-1" },
  { c: "g2", k: "CAP-002", t: "Bloomfields", id: "gal-2" },
  { c: "g3", k: "CAP-003", t: "Courier · Action", id: "gal-3" },
  { c: "g4", k: "CAP-004", t: "Vehicle Chase", id: "gal-4" },
  { c: "g5", k: "CAP-005", t: "Crown Operative", id: "gal-5" },
  { c: "g6", k: "CAP-006", t: "Courier · Close-Up", id: "gal-6" },
  { c: "g7", k: "CAP-007", t: "Bloom Network", id: "gal-7" },
  { c: "g8", k: "CAP-008", t: "Skyline · District 09", id: "gal-8" }];

  return (
    <section className="gallery" id="media">
      <SectionHd num="§ 07 · MEDIA" title="Scenes from the route" right={<>8 CAPTURES<br />FIELD ARCHIVE</>} />
      <div className="gal-grid">
        {items.map((it) =>
        <div className={`gal ${it.c}`} key={it.id}>
            <div className="corner">{it.k}</div>
            <image-slot id={it.id} placeholder={`Drop ${it.t}`}></image-slot>
            <div className="label">
              <span className="t">{it.t}</span>
              <span className="k">{it.k}</span>
            </div>
          </div>
        )}
      </div>
    </section>);

}

function Finale() {
  const tickerItems = [
  "BLOOM NETWORK ACTIVE", "● SIGNAL DETECTED", "ROUTE UNSTABLE", "⚠ CROWN PROXIMITY",
  "CARGO SEALED", "COURIER-07 LIVE", "FREQ 0xA7", "SECTOR 04 NORTHWALL",
  "RT-44 → DISTRICT 09", "FOLLOW THE SIGNAL"];

  return (
    <section className="finale">
      <div className="grid-bg"></div>
      <div className="page finale-inner">
        <span className="eyebrow">§ 08 · ENLIST</span>
        <h2 style={{ fontSize: "96px", letterSpacing: "-1.9px", lineHeight: "1" }}>The signal is moving. <em style={{ fontSize: "9px", lineHeight: "1", letterSpacing: "-2.1px" }}>Are you?</em></h2>
        <p>Join the route, uncover the truth behind Bloom, and stay one step ahead of The Crown Division.</p>
        <div className="ctas">
          <button className="btn btn-primary">Wishlist Now <span className="arr">→</span></button>
          <button className="btn">Watch Trailer <span className="arr">▶</span></button>
          <button className="btn btn-ghost">Join the Newsletter</button>
        </div>
      </div>
      <div className="ticker">
        <div className="run">
          {[...tickerItems, ...tickerItems].map((t, i) =>
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className="dot"></span>{t}
            </span>
          )}
        </div>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <div className="foot-mark"><span className="dot"></span> NEON BLOOM</div>
          <p style={{ maxWidth: 340, marginTop: 14, fontSize: 13, lineHeight: 1.6, color: "var(--paper-dim)" }}>
            A fictional open-world cyberpunk action-adventure. Concept design for portfolio purposes only.
          </p>
        </div>
        <div className="foot">
          <h4>Network</h4>
          <ul>
            <li><a href="#world">World</a></li>
            <li><a href="#gameplay">Gameplay</a></li>
            <li><a href="#story">Story</a></li>
            <li><a href="#media">Media</a></li>
          </ul>
        </div>
        <div className="foot">
          <h4>Signal</h4>
          <ul>
            <li><a href="#">Press Kit</a></li>
            <li><a href="#">Bloom Devlog</a></li>
            <li><a href="#">Discord</a></li>
            <li><a href="#">X / Bluesky</a></li>
          </ul>
        </div>
        <div className="foot news">
          <h4>Join the Route</h4>
          <p style={{ fontSize: 13, color: "var(--paper-dim)", margin: "0 0 10px" }}>Mission updates. Cargo drops. No spam.</p>
          <input type="email" placeholder="OPERATIVE@NETWORK" />
          <div className="row">
            <button className="btn btn-primary" style={{ height: 42, padding: "0 18px" }}>Enlist →</button>
          </div>
        </div>
      </div>
      <div className="foot-bot">
        <span>© 2027 BLOOM RUNTIME · ALL ROUTES RESERVED</span>
        <span>FICTIONAL CONCEPT · PORTFOLIO DESIGN</span>
        <span>BUILD 0.44 · NORTHWALL</span>
      </div>
    </footer>);

}

function TweaksUI({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Bloom" />
      <TweakColor label="Accent" value={t.accent}
      options={["#ff3d8a", "#ff86b6", "#69b4ff", "#ffd60a", "#b388ff"]}
      onChange={(v) => {
        setTweak("accent", v);
        document.documentElement.style.setProperty("--bloom", v);
      }} />
      <TweakSection label="Atmosphere" />
      <TweakToggle label="Scanlines" value={t.showScanlines}
      onChange={(v) => setTweak("showScanlines", v)} />
      <TweakToggle label="Crown warning strip" value={t.showCrownWarn}
      onChange={(v) => setTweak("showCrownWarn", v)} />
    </TweaksPanel>);

}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--bloom", t.accent);
    document.body.classList.toggle("no-scan", !t.showScanlines);
    document.body.classList.toggle("no-crown", !t.showCrownWarn);
  }, [t.accent, t.showScanlines, t.showCrownWarn]);

  return (
    <>
      <div className="page">
        <Nav />
        <Hero />
      </div>
      <hr className="signal-line" />
      <div className="page"><Intro /></div>
      <hr className="signal-line" />
      <div className="page"><Cassettes /></div>
      <hr className="signal-line" />
      <div className="page"><World /></div>
      <hr className="signal-line" />
      <div className="page"><Gameplay /></div>
      <hr className="signal-line" />
      <div className="page"><Story /></div>
      <hr className="signal-line" />
      <div className="page"><Faction /></div>
      <hr className="signal-line" />
      <div className="page"><Gallery /></div>
      <Finale />
      <div className="page"><Footer /></div>
      <TweaksUI t={t} setTweak={setTweak} />
    </>);

}

// Toggle helpers
const __extraStyle = document.createElement("style");
__extraStyle.textContent = `
  body.no-scan .scanlines::after{display:none}
  body.no-crown .warn-strip,body.no-crown .warn-tag{display:none}
`;
document.head.appendChild(__extraStyle);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);