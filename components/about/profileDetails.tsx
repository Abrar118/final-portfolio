import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MapHero, Route, Stopline } from "@/components/network/parts";
import { timeline } from "@/data/about/timeline";
import { achievements } from "@/data/about/achievements";
import { RESUME_URL } from "@/data/network";

const research = [
  {
    title: "Adaptive control of local LLM agents on consumer hardware",
    where: "M.Sc. thesis, MIST",
    when: "In progress",
  },
  {
    title: "Local LLM fallback stack",
    where: "Personal tooling that takes over from cloud AI tools when token quotas run out: llama.cpp, Ollama and quantized Qwen and Gemma models (9B–27B), tuned for quality, speed and memory on consumer hardware",
    when: "Ongoing",
  },
  {
    title: "AI-Enhanced Application for Incentivizing Waste Recycling: A Step towards Sustainable Environment",
    where: "2025 IEEE International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN 2025)",
    when: "2025",
  },
  {
    title: "Analysing Low-Resource Language Feedback Across Industries",
    where: "B.Sc. thesis, MIST. Multi-paradigm ML with a custom Romanized Bengali sentiment dataset",
    when: "2025",
  },
];

const record = achievements.filter((a) => a.type !== "Research");

export default function About() {
  return (
    <main>
      <MapHero height="tall">
        <div className="sign-grid sign-grid-project">
          <h1 className="sign-name">About</h1>
          <div className="sign-aside">
            <p>
              I&apos;m Abrar Mahir Esam, a software engineer based in Dhaka. I like understanding how things work, and making them work a little better.
            </p>
            <div className="sign-actions">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-sign">
                View résumé <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </MapHero>

      <Route line="C">
        <section className="route-section">
          <div className="page-wrap bio">
            <div className="prose-sign">
              <h2 className="section-title route-stop">The short version</h2>
              <p>
                At Bengal Byte I was one of the first engineers on Psycloud, a production clinical platform now serving over 1,000 users, and a principal architect of the product. I also architected a government personnel and duty-management platform running 300 concurrent users.
              </p>
              <p>
                I work end to end across Spring Boot (Java 21), FastAPI and Node.js behind React and Next.js, over PostgreSQL, MongoDB and Redis, and I publish open-source developer tooling in Rust.
              </p>
              <p>
                I&apos;m a Codeforces Specialist (peak rating 1425, 496 problems solved) and have mentored three batches of competitive programmers at the MIST Computer Club. I earned my B.Sc. in CSE from MIST with a CGPA of 3.56/4.00, and I&apos;m now pursuing my M.Sc. part-time.
              </p>
              <p>Outside software, I write poems and draw, from quick sketches to Inktober.</p>
            </div>
            <figure className="frame bio-portrait">
              <Image
                src="/hero-portrait.jpg"
                alt="Abrar Mahir Esam in a navy suit"
                width={669}
                height={1280}
                sizes="(max-width: 1024px) 70vw, 360px"
                className="frame-image"
              />
            </figure>
          </div>
        </section>

        <Stopline id="career" title="Career">
          <ol className="career">
            {timeline.map((item) => (
              <li key={item.company} className="career-stop">
                <div className="career-side">
                  <p className="data">{item.date}</p>
                  <p className="career-place">{item.location}</p>
                </div>
                <div>
                  <h3 className="career-company">{item.company}</h3>
                  <p className="career-title">{item.title}</p>
                  {item.stack && <p className="career-stack">{item.stack}</p>}
                  <p className="career-summary">{item.description}</p>
                  <ul className="career-points">
                    {item.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Stopline>

        <Stopline id="research" title="Research" field="M">
          <ul className="research">
            {research.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.where}</p>
                <p className="data">{r.when}</p>
              </li>
            ))}
          </ul>
        </Stopline>

        <Stopline id="record" title="Contests and awards">
          <table className="record">
            <thead className="sr-only">
              <tr>
                <th scope="col">Result</th>
                <th scope="col">Event</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {record.map((a) => (
                <tr key={`${a.title}-${a.organization}`}>
                  <th scope="row">{a.title}</th>
                  <td>
                    {a.organization}
                    <span>{a.description}</span>
                  </td>
                  <td className="data">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Stopline>

        <Stopline title="Education">
          <dl className="education">
            <div>
              <dt>M.Sc. in Computer Science and Engineering</dt>
              <dd>Part-time, Military Institute of Science and Technology</dd>
              <dd className="data">2025 – present</dd>
            </div>
            <div>
              <dt>B.Sc. in Computer Science and Engineering</dt>
              <dd>Military Institute of Science and Technology. CGPA 3.56/4.00</dd>
              <dd className="data">2021 – 2025</dd>
            </div>
          </dl>
        </Stopline>
      </Route>
    </main>
  );
}
