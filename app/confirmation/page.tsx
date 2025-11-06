export default function ConfirmationPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-white text-gray-900">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-teal-700 mb-4">
          Appointment Confirmed ✅
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your appointment has been successfully booked.
          <br />
          You will receive a confirmation email shortly.
        </p>
        <a
          href="/dashboard"
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
        >
          Back to Dashboard
        </a>
      </div>
    </main>
  );
}
