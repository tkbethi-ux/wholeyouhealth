"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600">WholeYou Health</h1>
        <nav className="space-x-6">
          <Link href="#services" className="hover:text-blue-600">
            Services
          </Link>
          <Link href="#team" className="hover:text-blue-600">
            Our Doctors
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-110 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg4.jpg')" }}
      >
        {/* Optional overlay for contrast */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[0px]"></div>

        {/* Text content */}
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-bold mb-4 leading-tight text-blue-700 drop-shadow-sm">
            Your Health, Our Priority 💙
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-8 mx-auto">
            Book appointments, talk to certified doctors, and get care from the
            comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Book Appointment
            </Link>
            <Link
              href="/learn"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-blue-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>


      {/* Services Offered Section */}
      <section id="services" className="py-20 px-8 bg-white text-center">
        <h3 className="text-3xl font-semibold mb-4 text-blue-700">Services Offered</h3>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore a range of healthcare solutions — from telemedicine to personalized care — designed to meet your health needs conveniently and safely.
        </p>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Telemedicine",
              desc: "Connect instantly with certified doctors via secure video consultation from your home.",
            },
            {
              title: "Primary Care",
              desc: "Comprehensive health check-ups, preventive care, and long-term wellness management.",
            },
            {
              title: "Mental Health",
              desc: "Speak with licensed therapists and mental health professionals privately online.",
            },
            {
              title: "Hormone Therapy",
              desc: "Personalized hormone replacement treatments managed by expert clinicians.",
            },
            {
              title: "Weight Management",
              desc: "Guided programs using GLP-1 medications and nutritional support to achieve healthy goals.",
            },
            {
              title: "Online Consultations",
              desc: "Book same-day online consultations with primary care and specialist doctors.",
            },
            {
              title: "Digital Prescriptions",
              desc: "Receive prescriptions directly after your consultation — securely and instantly.",
            },
            {
              title: "IV-Hydration",
              desc: "Rehydrate, rejuvenate, and recover a fast, effective way to restore vital fluids.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-6 text-left"
            >
              <h4 className="text-xl font-semibold text-blue-700 mb-2">{s.title}</h4>
              <p className="text-gray-600 mb-4 text-sm">{s.desc}</p>
              <Link
                href="/services"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Know More →
              </Link>
            </div>
          ))}
        </div>
      </section>



      {/* Meet the Team Section */}
      <section id="team" className="py-20 px-8 bg-gray-50 text-center">
        <h3 className="text-3xl font-semibold mb-3">Top-rated Online Doctors</h3>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our board-certified physicians are among the best in virtual care. They’re committed to
          providing high-quality, personalized care you can trust.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Doctor 1 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <div className="bg-blue-100 rounded-lg h-64 mb-4 flex items-center justify-center">
              <img
                src="/images/thanmayie.jpg"
                alt="Thanmayie Bethi"
                className="object-cover object-center"
              />
            </div>
            <h4 className="text-lg font-semibold text-blue-700">
              Thanmayie Bethi, FNP-BC
            </h4>
            <p className="text-sm text-gray-600 mt-2">
              Family Nurse Practitioner who began practicing in 2020. Interested in a variety of clinical areas, including Family Practice, Pediatrics, Women's Health, and Acute Care/Urgent Care
            </p>
            <p className="text-blue-600 mt-3 font-medium cursor-pointer hover:underline">
              Meet the medical team →
            </p>
          </div>

          {/* Doctor 2 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <div className="bg-blue-100 rounded-lg h-64 mb-4 flex items-center justify-center">
              <span className="text-gray-400">[ Doctor Photo ]</span>
            </div>
            <h4 className="text-lg font-semibold text-blue-700">
              TBD
            </h4>
            <p className="text-sm text-gray-600 mt-2">
              TBD
            </p>
            <p className="text-blue-600 mt-3 font-medium cursor-pointer hover:underline">
              Meet the medical team →
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-6 mt-16">
        <p className="text-sm">
          © {new Date().getFullYear()} WholeYou Health. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
