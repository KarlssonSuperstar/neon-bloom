// cassettes.jsx — 3D flip cassettes for Neon Bloom

const CASSETTE_DATA = [
  {
    id: "PX-01", label: "Priority Payload", title: "THE DELIVERY",
    backTitle: "The Delivery",
    text: "A routine courier job becomes a city-wide manhunt when a sealed module reveals a signal The Crown Division will do anything to recover.",
    cta: "Read Story", variant: "", route: "RT-44 / NORTHWALL", status: "SEALED", sig: "0xA7-BLOOM",
  },
  {
    id: "CR-02", label: "Courier Profile", title: "THE COURIER",
    backTitle: "The Courier",
    text: "You are a freelance courier built for dangerous routes — fast on foot, fast behind the wheel, and impossible to track for long.",
    cta: "Meet the Courier", variant: "", route: "OPERATIVE / FREELANCE", status: "ACTIVE", sig: "PINK-01",
  },
  {
    id: "TH-03", label: "Threat Archive", title: "CROWN DIVISION",
    backTitle: "The Crown Division",
    text: "An elite force controlling transit, surveillance and information. If they reclaim the cargo, they tighten their grip on the entire network.",
    cta: "View Faction", variant: "crown", route: "GRID / OMNI-CONTROL", status: "HOSTILE", sig: "CR-OMEGA",
  },
  {
    id: "BL-04", label: "Network Archive", title: "BLOOM",
    backTitle: "Bloom",
    text: "A living bio-tech network woven through the cities, the machines and the land itself. Beautiful, unstable, and worth fighting for.",
    cta: "Explore Bloom", variant: "", route: "LIVING NETWORK", status: "PULSING", sig: "BL-INF",
  },
  {
    id: "ZN-05", label: "Zone Scan: Inner City", title: "THE CITY",
    backTitle: "The City",
    text: "Move through crowded markets, elevated streets, transit tunnels and vertical districts where every route hides danger — and opportunity.",
    cta: "See the City", variant: "sky", route: "DISTRICT 09 / VERTICAL", status: "MAPPED", sig: "ZN-CITY",
  },
  {
    id: "OT-06", label: "Outer Terrain", title: "BLOOMFIELDS",
    backTitle: "The Bloomfields",
    text: "Beyond the towers lies an open frontier of pink terrain, forgotten relay routes and vast landscapes shaped by the pulse of Bloom.",
    cta: "Discover the Frontier", variant: "", route: "OUTER FRONTIER", status: "UNSTABLE", sig: "OT-FAR",
  },
];

function Cassette({ data, idx }) {
  const [flipped, setFlipped] = React.useState(false);
  const cls = `cassette ${data.variant ? "cass--" + data.variant : ""} ${flipped ? "flipped" : ""}`;
  return (
    <div className={cls}
         onClick={() => setFlipped(f => !f)}
         onMouseLeave={() => setFlipped(false)}>
      <div className="cass-inner">
        {/* FRONT */}
        <div className="face cass-front">
          <div className="cass-top">
            <div className="cass-id">MOD-ID · {data.id}</div>
            <div className="cass-pill">{data.label}</div>
          </div>
          <div className="cass-mid">
            <div className="cass-bars">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className="cass-spool"></div>
            <div className="cass-title">{data.title}</div>
          </div>
          <div className="cass-bot">
            <span>RT · {data.route}</span>
            <span className="ok">{data.status}</span>
            <span>SIG · {data.sig}</span>
          </div>
        </div>
        {/* BACK */}
        <div className="face back cass-back">
          <div className="top">
            <span>FILE · {data.id}</span>
            <span>↺ FLIPPED</span>
          </div>
          <div>
            <div className="mono" style={{fontSize:10,letterSpacing:".18em",color:"var(--bloom)",textTransform:"uppercase"}}>{data.label}</div>
            <h4>{data.backTitle}</h4>
            <p>{data.text}</p>
          </div>
          <div className="cass-cta">
            <span>{data.cta}</span>
            <span className="arr">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CassetteGrid() {
  return (
    <div className="cass-grid">
      {CASSETTE_DATA.map((d, i) => <Cassette key={d.id} data={d} idx={i} />)}
    </div>
  );
}

Object.assign(window, { Cassette, CassetteGrid, CASSETTE_DATA });
