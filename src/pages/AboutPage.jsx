import { FileText, ShieldCheck, Rocket, Users, Wrench, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About All in One Tools</h1>
        <p className="text-gray-700 text-lg mb-8">
          All in One Tools (onlinepakistan.live) is your go-to destination for free online productivity tools. 
          We help creators, students, job seekers, and professionals complete daily digital tasks faster and more efficiently.
          Our mission is to provide high-quality, accessible tools without requiring technical expertise or expensive subscriptions.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <InfoCard
            icon={<Rocket className="w-5 h-5 text-blue-600" />}
            title="Our Mission"
            text="Make powerful digital tools accessible to everyone. We believe productivity shouldn't be limited by budget or technical skills."
          />
          <InfoCard
            icon={<ShieldCheck className="w-5 h-5 text-green-600" />}
            title="Quality Standards"
            text="We prioritize user privacy, transparent practices, and reliable tools. Your data stays yours, and our tools work when you need them."
          />
          <InfoCard
            icon={<Users className="w-5 h-5 text-purple-600" />}
            title="Who We Serve"
            text="Content creators, students, job seekers, small business owners, freelancers, and anyone who needs quick, reliable online tools."
          />
          <InfoCard
            icon={<Wrench className="w-5 h-5 text-orange-600" />}
            title="Our Tools"
            text="Bio generator, YouTube script writer, hashtag generator, image compressor, audio converter, PDF to Word, resume builder, and more."
          />
        </div>

        <section className="bg-white border rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Creator Tools</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bio Generator - Create professional bios instantly</li>
                <li>YouTube Script Generator - Write engaging video scripts</li>
                <li>Hashtag Generator - Find trending hashtags for social media</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Utility Tools</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Image Compressor - Reduce file sizes without losing quality</li>
                <li>Audio Converter - Convert between audio formats</li>
                <li>PDF to Word - Convert PDFs to editable documents</li>
                <li>File Converter - Transform between CSV, JSON, and text</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Tools</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Resume Builder - Create professional resumes</li>
                <li>CV Maker - Build detailed curriculum vitae</li>
                <li>Cover Letter Builder - Write compelling cover letters</li>
                <li>ATS Checker - Optimize for applicant tracking systems</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>QR Code Generator</li>
                <li>Color Palette Generator</li>
                <li>Invoice Generator</li>
                <li>And more...</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white border rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Editorial & Content Principles</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Provide original, practical utilities that solve real problems</li>
            <li>Keep interfaces clean, simple, and easy to understand</li>
            <li>Maintain transparency about how tools work and what data we collect</li>
            <li>Regularly update tools to ensure quality and relevance</li>
            <li>Never mislead users about features or capabilities</li>
            <li>Respect user privacy and handle data responsibly</li>
          </ul>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Support Our Work</h2>
              <p className="text-gray-700">
                All in One Tools is free to use, supported by advertisements. By using our tools, you help us continue 
                developing new features and maintaining existing ones. Thank you for being part of our community!
              </p>
            </div>
          </div>
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
