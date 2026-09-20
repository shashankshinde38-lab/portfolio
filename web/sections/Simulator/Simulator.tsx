import { Terminal } from "lucide-react";
import InteractiveTestRunner from "@/web/components/InteractiveTestRunner/InteractiveTestRunner";
import BugSpotterLab from "@/web/sections/BugSpotterLab/BugSpotterLab";

export default function Simulator() {
  return (
    <section id="simulator" className="section section-lined page-container" aria-labelledby="simulator-heading">
      <div className="section-heading section-heading-split">
        <div>
          <span className="eyebrow">THE TESTING LAB</span>
          <h2 id="simulator-heading">
            <span className="section-title-label">Testing Simulator</span>
            Don&apos;t just read about it.
            <br />
            <span>Put quality to the test.</span>
          </h2>
        </div>
        <p>
          Run a simulated test suite, then investigate
          <br />
          the kind of edge cases that hide in plain sight.
        </p>
      </div>
      <div className="lab-intro">
        <span className="small-badge">
          <Terminal size={13} /> Interactive demonstrations
        </span>
        <span>Simulated runs &middot; No production systems affected</span>
      </div>
      <div className="testing-lab">
        <InteractiveTestRunner />
        <BugSpotterLab />
      </div>
    </section>
  );
}
