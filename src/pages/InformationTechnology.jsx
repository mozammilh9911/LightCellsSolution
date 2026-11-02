import {
  ArrowUpRight,
  BrainCircuit,
  BookOpen,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Headphones,
  HeartPulse,
  Microscope,
  Network,
  PanelTop,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import "./InformationTechnology.css";

const IT_CAPABILITIES = [
  {
    id: "application-engineering",
    icon: Code2,
    title: "Application engineering",
    description:
      "Design, build, and modernize business applications around the needs of the people who use them.",
  },
  {
    id: "cloud-infrastructure",
    icon: Cloud,
    title: "Cloud and infrastructure",
    description:
      "Plan cloud foundations, migration paths, and infrastructure operations for changing workloads.",
  },
  {
    id: "data-analytics",
    icon: Database,
    title: "Data and analytics",
    description:
      "Connect data sources and shape them into useful reporting, analysis, and decision support.",
  },
  {
    id: "ai-automation",
    icon: BrainCircuit,
    title: "AI and automation",
    description:
      "Identify practical opportunities to apply AI and automation to repeatable business processes.",
  },
  {
    id: "cybersecurity",
    icon: ShieldCheck,
    title: "Security and resilience",
    description:
      "Strengthen security practices, continuity planning, and the reliability of essential systems.",
  },
  {
    id: "integration-modernization",
    icon: Network,
    title: "Integration and modernization",
    description:
      "Bring systems together and evolve legacy platforms in manageable, well-understood steps.",
  },
];

const DELIVERY_STEPS = [
  {
    number: "01",
    title: "Understand",
    description: "Map the goals, constraints, users, and systems involved.",
  },
  {
    number: "02",
    title: "Shape",
    description: "Agree on a practical solution, sequence, and measures of progress.",
  },
  {
    number: "03",
    title: "Build",
    description: "Deliver in clear increments, with feedback built into the work.",
  },
  {
    number: "04",
    title: "Improve",
    description: "Review what is working and refine systems as needs change.",
  },
];

const WEB_APP_SERVICES = [
  {
    icon: PanelTop,
    title: "Web design",
    description:
      "Plan clear page structures and responsive interfaces that make it easier for visitors to find what they need.",
  },
  {
    icon: Code2,
    title: "Web development",
    description:
      "Build responsive websites and web applications with maintainable code and a solid foundation for growth.",
  },
  {
    icon: Smartphone,
    title: "App creation",
    description:
      "Shape mobile and web apps around your users, workflows, and the systems they need to connect with.",
  },
  {
    icon: Headphones,
    title: "Web support",
    description:
      "Get help with troubleshooting, compatibility checks, routine maintenance, and day-to-day site issues.",
  },
  {
    icon: RefreshCw,
    title: "Updates and improvements",
    description:
      "Keep content, features, integrations, and software current as your organization and customer needs change.",
  },
];

const IT_INDUSTRIES = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    description:
      "Digital tools and connected workflows to support care teams and the people they serve.",
  },
  {
    icon: Microscope,
    title: "Life sciences and research",
    description:
      "Technology that helps research teams organize information and improve laboratory workflows.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Websites and applications that make learning, collaboration, and administration easier.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business services",
    description:
      "Modern applications and integrations that help organizations serve customers and operate effectively.",
  },
];

const IT_RESOURCES = [
  {
    icon: BookOpen,
    title: "Plan a website or app",
    description:
      "Explore our web and app services to understand how we can support your next digital project.",
    link: "#web-app-services",
    linkText: "Explore web & app services",
  },
  {
    icon: Network,
    title: "Understand our approach",
    description:
      "See how we move from understanding your needs to building and improving a solution.",
    link: "#how-we-work",
    linkText: "See how we work",
  },
  {
    icon: Headphones,
    title: "Get answers and support",
    description:
      "Review common questions or contact our team to discuss your technology needs.",
    link: "#it-faq",
    linkText: "Read common questions",
  },
];

const IT_CAROUSEL_SLIDES = [
  {
    id: 1,
    tag: "WEB DESIGN & DEVELOPMENT",
    title: "Digital experiences made for people and business.",
    description:
      "Plan a clear online presence, then build it into a responsive website that can grow with your needs.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "Explore web services",
    primaryLink: "#web-app-services",
    secondaryBtnText: "Talk to our team",
    secondaryLink: "/contact",
  },
  {
    id: 2,
    tag: "APPLICATION ENGINEERING",
    title: "Useful apps start with a clear understanding of the work.",
    description:
      "Create web and mobile applications that connect users, workflows, and the systems they rely on.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "View capabilities",
    primaryLink: "#it-capabilities",
    secondaryBtnText: "Discuss an app",
    secondaryLink: "/contact",
  },
  {
    id: 3,
    tag: "SUPPORT & CONTINUOUS IMPROVEMENT",
    title: "Keep your digital tools ready for what comes next.",
    description:
      "Get practical help with site support, maintenance, updates, and improvements as your priorities change.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "How we work",
    primaryLink: "#how-we-work",
    secondaryBtnText: "Get support",
    secondaryLink: "/contact",
  },
];

const IT_FAQS = [
  {
    question: "Can you help with an existing website or application?",
    answer:
      "Yes. Share the current setup and the changes you need, and we can discuss a suitable next step.",
  },
  {
    question: "Can you support both design and development?",
    answer:
      "We can help shape the structure and visual experience, then develop the site or application around the agreed requirements.",
  },
  {
    question: "Do you provide ongoing website support?",
    answer:
      "Support can include updates, troubleshooting, routine maintenance, and incremental improvements. Contact us to discuss scope.",
  },
];

export default function InformationTechnology() {
  return (
    <div className="information-technology-page">
      <Carousel slides={IT_CAROUSEL_SLIDES} />
<section className="it-intro-section" id="it-overview">
        <div className="it-intro-inner">
          <div className="it-intro-copy">
            <span className="it-section-label">WHO WE ARE</span>
            <h2>Technology should make the important work easier.</h2>
            <p>
              We help organizations plan and improve the digital tools behind
              their services, teams, and everyday operations. Our work starts
              with your goals and the systems already in place.
            </p>
          </div>
          <aside className="it-overview-panel">
            <span className="it-section-label">HOW WE HELP</span>
            <h3>Connect people, process, and platforms.</h3>
            <p>
              From a new website to a complex modernization effort, we focus on
              clear requirements, useful delivery steps, and support beyond launch.
            </p>
            <div className="it-overview-points">
              <span>Websites and applications</span>
              <span>Cloud, data, and integration</span>
              <span>Support and ongoing updates</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="it-capabilities-section" id="it-capabilities">
        <div className="it-content-width">
          <div className="it-section-heading">
            <span className="it-section-label">CAPABILITIES</span>
            <h2>Build the pieces your next step depends on.</h2>
            <p>
              Bring a specific challenge or explore the capability areas that
              can support your technology roadmap.
            </p>
          </div>

          <div className="it-capabilities-grid">
            {IT_CAPABILITIES.map(({ id, icon: Icon, title, description }) => (
              <article className="it-capability-item" id={id} key={id}>
                <span className="it-capability-icon">
                  <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="it-web-services-section" id="web-app-services">
        <div className="it-content-width">
          <div className="it-section-heading">
            <span className="it-section-label">WEB & APP SERVICES</span>
            <h2>From the first sketch to the next update.</h2>
            <p>
              Get the design, development, and ongoing help you need to keep
              your digital presence useful and up to date.
            </p>
          </div>

          <div className="it-web-services-grid">
            {WEB_APP_SERVICES.map(({ icon: Icon, title, description }) => (
              <article className="it-web-service-item" key={title}>
                <span className="it-capability-icon">
                  <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="it-web-services-action">
            <Link to="/contact" className="it-web-services-link">
              Discuss a website or app <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="it-industries-section" id="it-industries">
        <div className="it-content-width">
          <div className="it-section-heading">
            <span className="it-section-label">INDUSTRIES</span>
            <h2>Technology shaped around your industry.</h2>
            <p>
              We consider the people, workflows, and requirements behind your
              work to build practical digital solutions.
            </p>
          </div>

          <div className="it-industries-grid">
            {IT_INDUSTRIES.map(({ icon: Icon, title, description }) => (
              <article className="it-capability-item" key={title}>
                <span className="it-capability-icon">
                  <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="it-resources-section" id="it-resources">
        <div className="it-content-width">
          <div className="it-section-heading">
            <span className="it-section-label">RESOURCES</span>
            <h2>Find a useful next step.</h2>
            <p>
              Explore our services, learn about our delivery approach, or get
              answers to common questions.
            </p>
          </div>

          <div className="it-resources-grid">
            {IT_RESOURCES.map(({ icon: Icon, title, description, link, linkText }) => (
              <article className="it-resource-item" key={title}>
                <span className="it-capability-icon">
                  <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={link}>
                  {linkText} <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="it-delivery-section" id="how-we-work">
        <div className="it-content-width">
          <div className="it-section-heading">
            <span className="it-section-label">HOW WE WORK</span>
            <h2>Make progress visible at every stage.</h2>
            <p>
              A shared plan and regular checkpoints help keep technology
              initiatives connected to the outcome they are meant to support.
            </p>
          </div>

          <div className="it-delivery-grid">
            {DELIVERY_STEPS.map((step) => (
              <article className="it-delivery-step" key={step.number}>
                <span className="it-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="it-context-section">
        <div className="it-context-inner">
          <div className="it-context-copy">
            <span className="it-section-label">BUILT AROUND YOUR CONTEXT</span>
            <h2>Start with the work. Choose technology to fit.</h2>
            <p>
              Whether you are connecting business applications, making better
              use of data, or improving a research workflow, the right approach
              begins with the people and decisions involved.
            </p>
          </div>
          <div className="it-context-list">
            <div><span>01</span><p>Business operations</p></div>
            <div><span>02</span><p>Customer-facing services</p></div>
            <div><span>03</span><p>Research and laboratory workflows</p></div>
          </div>
        </div>
      </section>

      <section className="it-faq-section" id="it-faq">
        <div className="it-faq-inner">
          <div className="it-section-heading">
            <span className="it-section-label">FAQ</span>
            <h2>Common questions about getting started.</h2>
          </div>
          <div className="it-faq-list">
            {IT_FAQS.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="it-contact-band">
        <div className="it-contact-inner">
          <div>
            <span className="it-section-label">START A CONVERSATION</span>
            <h2>Need a website, app, or ongoing support?</h2>
          </div>
          <Link to="/contact" className="it-contact-link">
            Contact Us <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}