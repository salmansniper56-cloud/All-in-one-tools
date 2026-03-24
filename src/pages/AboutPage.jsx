import { FileText, ShieldCheck, Rocket, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About All in One Tools</h1>
        <p className="text-gray-700 text-lg mb-8">
          All in One Tools helps creators, students, and professionals complete daily digital tasks faster.
          We focus on practical web tools with clean interfaces and direct outputs.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <InfoCard
            icon={<Rocket className="w-5 h-5 text-blue-600" />}
            title="Our Mission"
            text="Make career tools accessible to everyone with simple, high-quality, and free-first features."
          />
          <InfoCard
            icon={<ShieldCheck className="w-5 h-5 text-green-600" />}
            title="Our Standards"
            text="We prioritize trustworthy content, transparent practices, and user privacy."
          />
          <InfoCard
            icon={<Users className="w-5 h-5 text-purple-600" />}
            title="Who We Serve"
            text="Students, fresh graduates, experienced professionals, and career switchers."
          />
          <InfoCard
            icon={<FileText className="w-5 h-5 text-orange-600" />}
            title="What We Offer"
            text="Bio generation, script writing, hashtag ideas, image compression, audio conversion, and file changing tools."
          />
        </div>

        <section className="bg-white border rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Editorial & Product Principles</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Provide original and practical utility, not thin or scraped content.</li>
            <li>Keep product features clear and avoid misleading claims.</li>
            <li>Update pages regularly to maintain quality and accuracy.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

function InfoCard({ icon, title, text }) {
  return (
    <article className="bg-white border rounded-xl p-5">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-700">{text}</p>
    </article>
  )
}
