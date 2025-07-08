import longLogo from '../assets/Proxima_Cloud_6-CSK-uDlf.png';
export default function AboutSection() {
  return (
    <section className="py-20 bg-slate-900/50" id="about">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="pr-0 md:pr-12">
            <h2 className="section-title text-4xl mb-4">About Proxima Cloud</h2>
            <p className="text-slate-400 text-lg mb-4">
              Founded by a team of passionate technologists, Proxima Cloud
              aims to bridge the gap between complex technology and business
              needs. Our mission is to provide stellar service and innovative
              solutions that help our clients thrive.
            </p>
            <p className="text-slate-400 text-lg">
              We believe in a collaborative approach, working closely with you
              to understand your universe and chart the best course for your
              digital journey.
            </p>
          </div>
          <div className="relative">
            <img
              alt="The Proxima Cloud team working"
              className="rounded-lg shadow-2xl w-full"
              src={longLogo}
            />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-500/20 rounded-full -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}