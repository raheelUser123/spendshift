"use client";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { CheckCircle, Lock, ShieldCheck } from "lucide-react";
const leaks = [
  ["HIGH IMPACT", "Takeaway & Food Delivery", "$1,300"],
  ["HIGH IMPACT", "Insurance Overpayment", "$900"],
  ["MEDIUM IMPACT", "Subscriptions", "$650"],
  ["MEDIUM IMPACT", "Convenience Spending", "$540"],
  ["LOW IMPACT", "Internet & Mobile Plan", "$420"],
  ["LOCKED", "10+ Other Categories", "Unlock"],
];
export default function Results() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2300);
    return () => clearTimeout(t);
  }, []);
  async function pay() {
    setBusy(true);
    const answers = localStorage.getItem("spendshift_answers") || "[]";
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    const data = await res.json();
    if (data.url) location.href = data.url;
    else alert(data.error || "Stripe checkout failed");
    setBusy(false);
  }
  if (loading)
    return (
      <div className="auditPage">
        <Header simple />
        <div className="progressWrap">
          <div className="progressMeta">
            <b>Audit Progress</b>
            <span>Question 8 of 8</span>
          </div>
          <div className="bar">
            <span style={{ width: "100%" }} />
          </div>
        </div>
        <div className="analysisCard">
          <div className="icon" style={{ margin: "0 auto 20px" }}>
            <ShieldCheck />
          </div>
          <h2>Analysing your Answers...</h2>
          <p>
            We're scanning thousands of data points to find your biggest money
            leaks.
          </p>
          <div className="circle">
            <div>
              <strong>72%</strong>
              <br />
              <span>Analysing</span>
            </div>
          </div>
          <div className="checksList">
            <div className="row">
              Reviewing your spending patterns <CheckCircle color="#059625" />
            </div>
            <div className="row">
              Comparing against smart benchmarks <CheckCircle color="#059625" />
            </div>
            <div className="row">
              Identifying overpayment opportunities <span>○</span>
            </div>
            <div className="row">
              Calculating potential savings <span>●</span>
            </div>
          </div>
          <div className="safe">
            <Lock color="#059625" />
            <div>
              <b>Your data is safe with us</b>
              <p className="mini">
                We use bank-level encryption and never share your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="auditPage">
      <Header simple />
      <main className="container">
        <section className="resultsHero">
          <div>
            <h1 style={{ fontSize: 48 }}>
              We found your{" "}
              <span style={{ color: "#059625" }}>biggest money leaks</span>
            </h1>
            <p>
              Based on your answers, we identified areas where you could be
              overpaying every year.
            </p>
            <p>
              ✅ Your data is private & secure
              <br />✅ Fixed insights. Real savings.
            </p>
          </div>
          <div className="greenPanel">
            <span className="badge">Total Recoverable Cash Found</span>
            <h2 style={{ fontSize: 46 }}>$2,300 - $4,800/year</h2>
            <p>
              This is a range based on your feedback. Your actual savings may be
              higher or lower.
            </p>
            <button onClick={pay} className="btn white">
              {busy ? "Opening checkout..." : "Get My Full Savings Plan"}
            </button>
          </div>
        </section>
        <div className="leakTabs">
          {leaks.map((l) => (
            <div className="leakTab" key={l[1]}>
              <small>{l[0]}</small>
              <strong>{l[2]}</strong>
              <span>{l[1]}</span>
            </div>
          ))}
        </div>
        <h2>Your Top 3 money leaks</h2>
        <section className="mainResults">
          <div>
            {leaks.slice(0, 3).map((l, idx) => (
              <article className="panel leak" key={l[1]}>
                <span className="pill">
                  0{idx + 1} {l[0]}
                </span>
                <h3>{l[1]}</h3>
                <p>
                  Based on your answers, this category looks like one of your
                  strongest opportunities.
                </p>
                <div className="savings">Save {l[2]} per year</div>
                <p className="mini">
                  Full monthly action steps and scripts are included in your
                  unlocked report.
                </p>
              </article>
            ))}
            <div className="safe">
              <Lock color="#059625" />
              <div>
                <b>These are just the big ones.</b>
                <p>
                  Your full report includes personalised insights across 10+
                  categories.
                </p>
              </div>
            </div>
          </div>
          <aside className="panel reportBox">
            <span className="pill">Unlock Your Full Potential</span>
            <h2>Get your personalised action plan</h2>
            <p>
              ✅ See all money leaks
              <br />✅ Get exact savings
              <br />✅ Step-by-step action plan
              <br />✅ Track your progress
            </p>
            <div className="card">
              <b>Your Full Report</b>
              <div className="savings">$4,276</div>
              <p>
                Top leaks found: 12
                <br />
                Action plan steps: 18
              </p>
              <div className="locked">
                Claude AI generated report preview with scripts, cancellation
                templates, bill negotiation steps, subscription cleanup, weekly
                savings routine and 30-day plan.
              </div>
            </div>
            <button onClick={pay} className="unlock">
              {busy ? "Redirecting..." : "Unlock My Full Report"}
            </button>
            <p className="mini">
              Secure Stripe payment. Report generated by Claude AI.
            </p>
          </aside>
        </section>
      </main>
    </div>
  );
}
