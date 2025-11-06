"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
    const [user, setUser] = useState<any>(null);
    const [doctor, setDoctor] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [newSlot, setNewSlot] = useState("");
    const router = useRouter();

    // ✅ Listen for user login state
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
            else router.push("/login");
        });
        return () => unsub();
    }, [router]);

    // ✅ Fetch doctor data
    useEffect(() => {
        if (!user?.uid) return;

        const fetchDoctor = async () => {
            const docRef = doc(db, "doctors", user.uid);
            const snap = await getDoc(docRef);
            if (snap.exists()) setDoctor(snap.data());
        };

        fetchDoctor();
    }, [user?.uid]);

    // ✅ Fetch doctor appointments
    useEffect(() => {
        if (!user?.uid) return;

        const fetchAppointments = async () => {
            const q = query(
                collection(db, "appointments"),
                where("doctorId", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((d) => d.data());
            setAppointments(data);
        };

        fetchAppointments();
    }, [user?.uid]);

    // ✅ Add new time slot
    const addAvailability = async () => {
        if (!newSlot) return alert("Please select a valid time");
        if (!user?.uid) return alert("User not loaded yet");

        const docRef = doc(db, "doctors", user.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
            // ✅ If doctor exists, update
            await updateDoc(docRef, {
                availability: arrayUnion(newSlot),
            });
        } else {
            // 🆕 If doctor doesn’t exist, create it
            await setDoc(docRef, {
                name: user.displayName || user.email,
                email: user.email,
                availability: [newSlot],
            });
        }

        alert("Availability added!");
        setNewSlot("");
    };


    // ✅ Logout
    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    if (!user) return <p className="p-8 text-gray-500">Loading doctor dashboard...</p>;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
                <div>
                    <h1 className="text-2xl font-bold text-teal-600">
                        WholeYou Health — Doctor Panel
                    </h1>
                    <p className="text-gray-600 text-sm">
                        👩‍⚕️ Dr. {doctor?.name || user.email}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </header>

            {/* Dashboard Content */}
            <section className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Stats & Availability */}
                <div className="col-span-1 space-y-8">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <h3 className="text-gray-500 text-sm mb-2">Total Patients</h3>
                            <p className="text-3xl font-bold text-teal-600">
                                {appointments.length}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md text-center">
                            <h3 className="text-gray-500 text-sm mb-2">Upcoming Slots</h3>
                            <p className="text-3xl font-bold text-teal-600">
                                {doctor?.availability?.length || 0}
                            </p>
                        </div>
                    </div>

                    {/* Add Availability */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-bold mb-2 text-teal-700">Add Availability</h3>
                        <input
                            type="datetime-local"
                            className="border p-2 rounded-lg w-full mb-4"
                            value={newSlot}
                            onChange={(e) => setNewSlot(e.target.value)}
                        />
                        <button
                            onClick={addAvailability}
                            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                        >
                            Add Time Slot
                        </button>

                        <h3 className="text-lg font-bold mt-6 mb-2 text-teal-700">
                            Current Availability
                        </h3>
                        <ul className="list-disc ml-6 text-gray-700">
                            {doctor?.availability?.length ? (
                                doctor.availability.map((a: string, idx: number) => (
                                    <li key={idx}>{new Date(a).toLocaleString()}</li>
                                ))
                            ) : (
                                <p>No slots yet.</p>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Right Column - Patients List */}
                <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-bold text-teal-700 mb-4">
                        Your Appointments
                    </h3>

                    {appointments.length === 0 ? (
                        <p className="text-gray-500">No patients booked yet.</p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b bg-gray-100 text-left">
                                    <th className="p-3">Patient Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Time</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{appt.patientName}</td>
                                        <td className="p-3">{appt.patientEmail}</td>
                                        <td className="p-3">
                                            {new Date(appt.time).toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${appt.status === "confirmed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {appt.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </main>
    );
}
