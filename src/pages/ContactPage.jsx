export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-8">
          Questions, feedback, business inquiries, or policy requests are welcome.
          We typically respond within 2 business days.
        </p>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Support Email</h2>
            <a href="mailto:salmaandilqueer@gmail.com" className="text-blue-600 hover:underline">
              salmaandilqueer@gmail.com
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Instagram</h2>
            <a
              href="https://instagram.com/beingsalmanbutt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @beingsalmanbutt
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Business Contact (WhatsApp)</h2>
            <a
              href="https://wa.me/923339321473"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              +923339321473
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Address</h2>
            <p className="text-gray-700">Gulrez, Rawalpindi, Punjab</p>
          </div>
        </section>
      </main>
    </div>
  )
}
