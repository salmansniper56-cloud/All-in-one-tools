export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <div className="bg-white border rounded-xl p-6 space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Use of Service</h2>
            <p>
              By using this website, you agree to use it lawfully and not attempt to disrupt services or misuse user data.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">User Content</h2>
            <p>
              You retain ownership of your uploaded and written content. You are responsible for content legality and accuracy.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Limitations</h2>
            <p>
              Services are provided as-is. We do not guarantee job placement outcomes or uninterrupted uptime.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Changes to Service</h2>
            <p>
              Features may change over time. Continued use after updates means you accept revised terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact</h2>
            <p>For legal notices, contact hello@your-domain.com.</p>
          </section>
          <p className="text-sm text-gray-500">Last updated: March 24, 2026</p>
        </div>
      </main>
    </div>
  )
}
