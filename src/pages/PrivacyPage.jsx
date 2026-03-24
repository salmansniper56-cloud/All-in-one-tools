export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="bg-white border rounded-xl p-6 space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Introduction</h2>
            <p>
              Welcome to onlinepakistan.live ("All in One Tools", "we", "us", or "our"). We are committed to protecting your privacy 
              and ensuring you understand how we collect, use, and safeguard your information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Information:</strong> Email address and profile details when you create an account.</li>
              <li><strong>User Content:</strong> Resume data, bios, scripts, and other content you create using our tools.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage analytics.</li>
              <li><strong>Cookies:</strong> We use cookies for functionality, analytics, and advertising purposes.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How We Use Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and improve our tools and services</li>
              <li>To save your work and preferences</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To display relevant advertisements</li>
              <li>To prevent abuse and ensure security</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Third-Party Advertising</h2>
            <p className="mb-2">
              We use Google AdSense to display advertisements. Google and its partners may use cookies to serve ads based on 
              your prior visits to our website or other websites. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google Ads Settings
              </a>.
            </p>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on user's prior visits. Users may opt out 
              of the use of the DART cookie by visiting the Google ad and content network privacy policy.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Storage and Security</h2>
            <p>
              Your data is stored securely using Firebase services. We implement appropriate security measures to protect 
              against unauthorized access, alteration, or destruction of your information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of personalized advertising</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at{' '}
              <a href="mailto:salmaandilqueer@gmail.com" className="text-blue-600 hover:underline">salmaandilqueer@gmail.com</a>.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect personal information from 
              children under 13 years of age.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated 
              revision date. Continued use of our services after changes constitutes acceptance of the new policy.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:salmaandilqueer@gmail.com" className="text-blue-600 hover:underline">salmaandilqueer@gmail.com</a>
            </p>
          </section>
          <p className="text-sm text-gray-500 pt-4 border-t">Last updated: March 24, 2026</p>
        </div>
      </main>
    </div>
  )
}
