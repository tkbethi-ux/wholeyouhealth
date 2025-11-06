"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayRemove,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function BookAppointment() {
  const [user, setUser] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Patient form data
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientIssue, setPatientIssue] = useState("");

  const router = useRouter();

  // ✅ Fetch logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPatientEmail(currentUser.email || "");
      } else {
        router.push("/login");
      }
    });
    return () => unsub();
  }, [router]);

  // ✅ Fetch doctors + their availability
  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnap = await getDocs(collection(db, "doctors"));
      const docs = querySnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setDoctors(docs);
      setLoading(false);
    };
    fetchDoctors();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // ✅ Step 1: Select slot and open form
  const handleConfirmBooking = () => {
    if (!user || !selectedDoctor || !selectedSlot) {
      alert("Please select a doctor and a time slot first.");
      return;
    }
    setShowForm(true);
  };

  // ✅ Step 2: Submit form to Firestore
  const handleSubmitBooking = async (e: any) => {
    e.preventDefault();

    if (!patientName || !patientPhone || !patientIssue) {
      alert("Please fill in all required fields.");
      return;
    }

    await addDoc(collection(db, "appointments"), {
      patientId: user.uid,
      patientName,
      patientPhone,
      patientEmail,
      patientIssue,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      time: selectedSlot,
      createdAt: new Date().toISOString(),
    });

    await updateDoc(doc(db, "doctors", selectedDoctor.id), {
      availability: arrayRemove(selectedSlot),
    });

    setShowForm(false);

    // ✅ Redirect to confirmation page
    router.push("/confirmation");
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Loading doctors...</div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-teal-600">Book Appointment</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Main Section */}
      <section className="p-8">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
          Find Your Doctor 🩺
        </h1>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {doctors.length === 0 ? (
            <p className="text-center text-gray-600 col-span-3">
              No doctors available yet.
            </p>
          ) : (
            doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-teal-700 mb-2">
                  Dr. {doctor.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {doctor.specialty || "General Practitioner"}
                </p>

                <h3 className="text-sm font-semibold mb-2 text-gray-700">
                  Available Slots:
                </h3>
                {doctor.availability && doctor.availability.length > 0 ? (
                  <ul className="space-y-2">
                    {doctor.availability.map((slot: string, idx: number) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setSelectedSlot(slot);
                          }}
                          className={`w-full text-left border rounded-lg p-2 ${
                            selectedSlot === slot &&
                            selectedDoctor?.id === doctor.id
                              ? "bg-teal-600 text-white"
                              : "hover:bg-teal-100"
                          }`}
                        >
                          {new Date(slot).toLocaleString()}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No available times.
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Confirm button */}
        {selectedDoctor && selectedSlot && (
          <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-4 flex justify-between items-center">
            <p className="text-gray-800">
              Selected: <strong>Dr. {selectedDoctor.name}</strong> at{" "}
              <strong>{new Date(selectedSlot).toLocaleString()}</strong>
            </p>
            <button
              onClick={handleConfirmBooking}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </section>

      {/* Popup Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">
              Enter Your Details 📝
            </h2>

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
              <textarea
                placeholder="Describe your issue"
                value={patientIssue}
                onChange={(e) => setPatientIssue(e.target.value)}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
