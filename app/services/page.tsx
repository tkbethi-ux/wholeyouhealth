"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Telemedicine",
      description:
        "Consult with certified healthcare professionals from the comfort of your home. Our virtual visits provide personalized care using secure video and chat — no waiting rooms, no delays.",
      details:
        "We handle a wide range of health concerns including cold & flu, infections, skin issues, and ongoing medication management. Appointments are available 7 days a week.",
      image: "/images/login.jpg",
    },
    {
      title: "Primary Care",
      description:
        "Your health journey starts with reliable primary care. Our providers manage your routine check-ups, chronic conditions, prescriptions, and wellness goals.",
      details:
        "Enjoy continuity of care with digital records and follow-up visits. We focus on preventive care — ensuring long-term wellness and early detection of potential health issues.",
      image: "/images/primary-care.jpg",
    },
    {
      title: "Mental Health",
      description:
        "Access compassionate, confidential support for stress, anxiety, depression, or burnout. Our licensed therapists and psychiatric professionals are available online.",
      details:
        "Choose therapy, medication management, or both — all tailored to your needs. Appointments are private, flexible, and stigma-free.",
      image: "/images/mental-health.jpg",
    },
    {
      title: "Hormone Therapy",
      description:
        "Balance your hormones and restore vitality with our evidence-based hormone replacement and optimization programs.",
      details:
        "Our experts help both men and women with customized hormone testing, treatment plans, and ongoing monitoring — for better energy, mood, and overall wellness.",
      image: "/images/harmone-therapy1.jpg",
    },
    {
      title: "Weight Management",
      description:
        "Medically guided programs to help you lose weight safely and effectively under the supervision of licensed healthcare providers.",
      details:
        "We offer lifestyle coaching, nutrition support, and prescriptions like GLP-1 medications where appropriate — to help you achieve sustainable results.",
      image: "/images/weight-management1.jpg",
    },
    {
      title: "Online Consultations",
      description:
        "Need quick advice? Schedule same-day virtual visits with our medical team for non-emergency conditions.",
      details:
        "Perfect for minor illnesses, refills, or general questions — all through secure video or chat without leaving home.",
      image: "/images/consultations1.jpg",
    },
    {
      title: "Digital Prescriptions",
      description:
        "Receive your prescriptions electronically — safely and instantly — to your preferred local or mail-order pharmacy.",
      details:
        "We ensure accuracy, compliance, and convenience. Refills and renewals can be requested directly from your patient dashboard.",
      image: "/images/prescriptions1.jpg",
    },
       {
      title: "IV-Hydration",
      description:
       "Rehydrate, rejuvenate, and recover with our IV Hydration Therapy — a fast, effective way to restore vital fluids, vitamins, and electrolytes directly into your bloodstream.",
      details:
        "Boost energy, improve immune function, and relieve fatigue or hangover symptoms. Treatments may include vitamin C, B-complex, magnesium, and other nutrients based on your needs. Whether you're recovering from illness, dehydration, travel, or stress, IV Hydration offers quick relief and replenishment.",
      image: "/images/hydration.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* ---------- HEADER ---------- */}
      <header className="w-full bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
          {/* Logo / Title */}
          <Link href="/" className="text-2xl font-bold text-teal-700">
            WholeYou Health
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-teal-600 transition">
              Home
            </Link>
            <Link href="/services" className="text-teal-600 font-semibold">
              Services
            </Link>
            <Link href="/login" className="hover:text-teal-600 transition">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------- PAGE HEADER ---------- */}
      <section className="text-center py-16 px-6 md:px-20">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">Our Services</h1>
        <p className="text-gray-700 max-w-3xl mx-auto">
          At <strong>WholeYou Health</strong>, we provide accessible, holistic, and
          evidence-based healthcare — fully online and designed to fit your life.
          Explore our range of services below.
        </p>
      </section>

      {/* ---------- SERVICES GRID ---------- */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 md:px-20 pb-16">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative h-60 w-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-left">
              <h2 className="text-2xl font-semibold text-teal-700 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-700 mb-3">{service.description}</p>
              <p className="text-gray-600 text-sm mb-4">{service.details}</p>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                Book Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
