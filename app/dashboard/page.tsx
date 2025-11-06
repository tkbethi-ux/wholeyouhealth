"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-teal-600">WholeYou Health</h1>
        <button
          onClick={logout}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <section className="px-8 py-10">
        <h2 className="text-3xl font-semibold mb-2">Welcome back 👋</h2>
        <p className="text-gray-600 mb-8">{user.email}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Book Appointment */}
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-teal-600 mb-2">Book Appointment</h3>
            <p className="text-gray-600 mb-4">
              Schedule an online consultation with a doctor that fits your time.
            </p>
            <Link
              href="/book"
              className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Book Now
            </Link>
          </div>

          {/* Card 2: Upcoming Appointment */}
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-teal-600 mb-2">Upcoming Appointments</h3>
            <p className="text-gray-600 mb-4">
              No upcoming appointments yet. Book one today!
            </p>
            <button className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>

          {/* Card 3: Health Records */}
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-teal-600 mb-2">Health Records</h3>
            <p className="text-gray-600 mb-4">
              Store and view your prescriptions and previous reports.
            </p>
            <button className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Graph Section (Sample Placeholder) */}
      <section className="px-8 py-10 bg-gray-50 mt-10">
        <h3 className="text-2xl font-semibold mb-6 text-center">Your Health Overview</h3>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 bg-white rounded-xl shadow-md p-6 text-center">
            <h4 className="text-teal-600 font-bold mb-2">Consultations</h4>
            <p className="text-4xl font-bold">3</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-md p-6 text-center">
            <h4 className="text-teal-600 font-bold mb-2">Avg. Session Time</h4>
            <p className="text-4xl font-bold">28m</p>
            <p className="text-sm text-gray-500 mt-1">Across all doctors</p>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-md p-6 text-center">
            <h4 className="text-teal-600 font-bold mb-2">Satisfaction</h4>
            <p className="text-4xl font-bold text-green-500">94%</p>
            <p className="text-sm text-gray-500 mt-1">Patient feedback</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-8">
        © {new Date().getFullYear()} The WholeYou Health. Built with ❤️ For you
      </footer>
    </main>
  );
}
