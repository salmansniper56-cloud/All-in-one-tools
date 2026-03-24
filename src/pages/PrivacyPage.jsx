export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="bg-white border rounded-xl p-6 space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Information We Collect</h2>
            <p>
              We collect account details, resume content you enter, and technical data necessary for site functionality,
              security, and analytics.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How We Use Information</h2>
            <p>
              Data is used to provide product features, save your work, improve quality, and prevent abuse.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ads and Cookies</h2>
            <p>
              We may use cookies and ad technology partners, including Google AdSense, to show relevant advertisements.
              You can manage cookies via browser settings.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Rights</h2>
            <p>
              You can request access, correction, or deletion of your personal data by contacting support@your-domain.com.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Policy Updates</h2>
            <p>
              We may update this policy as the product evolves. Material updates will be reflected on this page.
            </p>
          </section>
          <p className="text-sm text-gray-500">Last updated: March 24, 2026</p>
        </div>
      </main>
    </div>
  )
}
