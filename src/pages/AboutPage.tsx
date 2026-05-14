import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <div className="stack aboutPage">
      <div className="pageHeader">
        <div>
          <h1>Sobre · About</h1>
          <p className="muted">
            Environmental purpose of <strong>EntulhoZero</strong> — for your science project and presentation.
          </p>
        </div>
        <Link className="btnSecondary" to="/">
          ← Home
        </Link>
      </div>

      <p className="aboutLead card">
        EntulhoZero is a prototype that connects people with <strong>leftover construction materials</strong> (tiles, wood,
        bricks, etc.) to neighbors who can reuse them. The sections below answer the core environmental questions in{' '}
        <strong>English</strong>, as typically required in international school assignments.
      </p>

      <article className="card aboutBlock">
        <h2 className="aboutQuestion">What are the environmental issues that the app will address?</h2>
        <div className="aboutAnswer">
          <p>
            Construction and renovation produce large amounts of <strong>construction and demolition waste (CDW)</strong>.
            In many cities, a significant share of urban solid waste comes from building sites. Usable leftovers are often
            discarded because there is no simple, fast way to match <strong>surplus with local demand</strong>.
          </p>
          <p>EntulhoZero targets this gap by focusing on:</p>
          <ul>
            <li>
              <strong>Preventable disposal</strong> — materials that are still functional (e.g., extra tiles, lumber offcuts)
              but end up as mixed waste.
            </li>
            <li>
              <strong>Logistics and distance</strong> — when reuse is inconvenient, people default to dumpsters and landfills,
              which increases truck trips and local nuisance (dust, noise, illegal dumping in some contexts).
            </li>
            <li>
              <strong>Low visibility of reuse options</strong> — without a structured channel, reuse depends on luck, word
              of mouth, or scattered social media posts.
            </li>
          </ul>
        </div>
      </article>

      <article className="card aboutBlock">
        <h2 className="aboutQuestion">How will the app contribute to environmental conservation?</h2>
        <div className="aboutAnswer">
          <p>
            The app supports conservation by making <strong>reuse the easier default</strong> for small surpluses. When
            neighbors exchange materials locally, several conservation mechanisms align:
          </p>
          <ul>
            <li>
              <strong>Waste diversion</strong> — usable mass is redirected away from landfills and mixed demolition streams.
            </li>
            <li>
              <strong>Reduced demand for virgin inputs (at the margin)</strong> — a neighbor fixing a wall with reclaimed
              tiles or wood may avoid buying new packs for a small job.
            </li>
            <li>
              <strong>Shorter material loops</strong> — local pickup can mean fewer long-distance transport routes compared
              to centralized disposal or distant buyers.
            </li>
            <li>
              <strong>Education through behavior</strong> — the product narrative reinforces that construction leftovers are
              resources, not “automatic trash.”
            </li>
          </ul>
          <p className="muted aboutNote">
            MVP scope: the prototype demonstrates the <em>coordination layer</em> (listings, deadlines, chat). Payments,
            verified weights, and professional recycling partners can be described as future extensions.
          </p>
        </div>
      </article>

      <article className="card aboutBlock">
        <h2 className="aboutQuestion">What positive environmental changes can come as a result of using the app?</h2>
        <div className="aboutAnswer">
          <p>With adoption, measurable and narrative outcomes can include:</p>
          <ul>
            <li>
              <strong>Lower landfill pressure</strong> — fewer bulky items entering mixed CDW streams for minor surpluses.
            </li>
            <li>
              <strong>Fewer disposal trips</strong> — especially when multiple small exchanges replace repeated dumpster
              cycles (context-dependent).
            </li>
            <li>
              <strong>Extended product lifetimes</strong> — materials remain in the economy longer under the circular
              economy principle.
            </li>
            <li>
              <strong>Community-scale circularity</strong> — environmental benefits compound when reuse becomes a visible,
              repeatable neighborhood habit.
            </li>
          </ul>
          <p>
            For a science fair, you can frame indicators such as <strong>kilograms diverted</strong>, <strong>number of
            successful exchanges</strong>, or <strong>estimated avoided disposal cost</strong> as evaluation metrics—even if
            simulated in the MVP.
          </p>
        </div>
      </article>

      <article className="card aboutBlock">
        <h2 className="aboutQuestion">What environmental values does the app support?</h2>
        <div className="aboutAnswer">
          <ul className="aboutValues">
            <li>
              <strong>Waste hierarchy</strong> — prioritize reuse and redistribution before disposal.
            </li>
            <li>
              <strong>Circular economy</strong> — treat leftovers as resources with remaining utility.
            </li>
            <li>
              <strong>Local stewardship</strong> — environmental action starts where waste is generated: near homes and job
              sites.
            </li>
            <li>
              <strong>Transparency and responsibility</strong> — users declare materials honestly; chat creates a minimal
              audit trail of intent (not a substitute for regulation, but aligned with informed choice).
            </li>
            <li>
              <strong>Efficiency without greenwashing</strong> — the app claims realistic levers (coordination, locality,
              reuse) rather than promising to “solve” national CDW alone.
            </li>
          </ul>
        </div>
      </article>

      <div className="row aboutFooter">
        <Link className="btn" to="/explorar">
          Explore listings
        </Link>
        <Link className="btnSecondary" to="/novo">
          Create a listing
        </Link>
      </div>
    </div>
  )
}
