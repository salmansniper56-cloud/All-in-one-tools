import { FileText, Sparkles, CheckCircle, Zap, Users, ArrowRight, Shield, Wand2, Star, Cloud, BarChart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

const HIRING_BRANDS = [
  { name: 'Google', logo: 'https://cdn.simpleicons.org/google' },
  { name: 'Amazon', logo: 'https://cdn.simpleicons.org/amazon' },
  { name: 'Microsoft', logo: 'https://cdn.simpleicons.org/microsoft' },
  { name: 'Meta', logo: 'https://cdn.simpleicons.org/meta' },
  { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple' },
  { name: 'Netflix', logo: 'https://cdn.simpleicons.org/netflix' },
  { name: 'Spotify', logo: 'https://cdn.simpleicons.org/spotify' },
  { name: 'Adobe', logo: 'https://cdn.simpleicons.org/adobe' },
  { name: 'Airbnb', logo: 'https://cdn.simpleicons.org/airbnb' },
  { name: 'Shopify', logo: 'https://cdn.simpleicons.org/shopify' },
  { name: 'Uber', logo: 'https://cdn.simpleicons.org/uber' },
  { name: 'Tesla', logo: 'https://cdn.simpleicons.org/tesla' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen luxury-surface">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur border-b border-slate-200/70 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-slate-900 title-font tracking-tight">All in One Tools</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/about" className="text-gray-600 hover:text-gray-800 px-2 py-2 font-medium hidden md:inline-block">
              About
            </a>
            <a href="/contact" className="text-gray-600 hover:text-gray-800 px-2 py-2 font-medium hidden md:inline-block">
              Contact
            </a>
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-600 hover:text-gray-800 px-4 py-2 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Resume and CV Builder
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-6 leading-tight title-font tracking-tight">
              Elegantly Designed
              <span className="block text-blue-700">Resumes That Get Interviews</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              Pick a premium template, add your details, and export an ATS-friendly resume or CV.
              Built-in writing tools help you finish faster without compromising quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-xl shadow-blue-200"
              >
                Start Building
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/builder/new?view=cv')}
                className="px-8 py-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-semibold"
              >
                Create New CV
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-600" /> ATS-friendly templates</span>
              <span className="inline-flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-600" /> Resume and CV modes</span>
              <span className="inline-flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-600" /> Download instantly</span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-5 shadow-xl shadow-slate-100 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Live CV Previews</h3>
              <span className="text-xs uppercase tracking-wide text-slate-500">Animated</span>
            </div>
            <div className="grid grid-cols-2 gap-3 h-[360px] overflow-hidden">
              <div className="cv-float-track-up space-y-3">
                <TemplateCard name="Modern" accent="bg-blue-600" tag="ATS" />
                <TemplateCard name="Executive" accent="bg-indigo-700" tag="Pro" />
                <TemplateCard name="Modern" accent="bg-blue-600" tag="ATS" />
                <TemplateCard name="Executive" accent="bg-indigo-700" tag="Pro" />
              </div>
              <div className="cv-float-track-down space-y-3">
                <TemplateCard name="Classic" accent="bg-slate-700" tag="Formal" />
                <TemplateCard name="Tech" accent="bg-cyan-600" tag="Developer" />
                <TemplateCard name="Classic" accent="bg-slate-700" tag="Formal" />
                <TemplateCard name="Tech" accent="bg-cyan-600" tag="Developer" />
              </div>
            </div>
            <button
              onClick={() => navigate('/builder/new')}
              className="w-full mt-4 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Use These Templates
            </button>
          </div>
        </div>
      </section>

      {/* Hired Brands */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs sm:text-sm uppercase tracking-[0.22em] text-slate-500 font-semibold mb-4">
            Our customers are hired by these brands
          </p>
          <div className="brand-marquee">
            <div className="brand-marquee-track">
              {[...HIRING_BRANDS, ...HIRING_BRANDS].map((brand, index) => (
                <span key={`${brand.name}-${index}`} className="brand-logo-chip" title={brand.name}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="brand-logo-image"
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery Section */}
      <section className="px-6 py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 title-font tracking-tight italic">
              CV templates that get you noticed — and hired
            </h2>
          </div>

          {/* Template Carousel */}
          <div className="relative">
            {/* Left Arrow */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50 transition z-10 hidden md:flex">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 px-2">
              <GalleryCard name="Anna Rodriguez" jobTitle="Housekeeper" company="Hyatt Regency Seattle" templateStyle="modern" ats />
              <GalleryCard name="Mike Beckinsale" jobTitle="Finance Officer" company="Sterling Systems" templateStyle="classic" />
              <GalleryCard name="Alex Simone" jobTitle="Accountant" company="Morrison & Associates" templateStyle="creative" ats />
              <GalleryCard name="Jack Clark" jobTitle="Office Administrator" company="Hunter Realty" templateStyle="minimal" />
            </div>

            {/* Right Arrow */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50 transition z-10 hidden md:flex">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Color Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {['bg-blue-500', 'bg-sky-400', 'bg-orange-400', 'bg-amber-400', 'bg-green-500', 'bg-emerald-400', 'bg-teal-400', 'bg-cyan-400', 'bg-violet-400', 'bg-pink-400'].map((color, i) => (
              <button key={i} className={`w-6 h-6 rounded-full ${color} hover:scale-110 transition shadow-sm`} />
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/builder/new?view=cv')}
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline"
            >
              View all templates <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          <ProofCard quote="I got interview calls in one week after using this builder." author="Amina, Marketing" />
          <ProofCard quote="Template quality looks premium and ATS checks are much better now." author="Arman, Software Engineer" />
          <ProofCard quote="CV mode plus cover letters in one flow made applying much easier." author="Sadia, Finance Analyst" />
        </div>
      </section>

      {/* Trustpilot Reviews Section */}
      <TrustpilotReviews />

      {/* Features */}
      <section className="px-6 py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Core Tool Categories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-yellow-500" />}
              title="AI Writing Assistant"
              description="Get AI-powered suggestions for your summary, skills, and experience bullets."
            />
            <FeatureCard
              icon={<Wand2 className="w-6 h-6 text-green-500" />}
              title="YouTube Script Generator"
              description="Generate structured video scripts with hooks, sections, and calls to action."
            />
            <FeatureCard
              icon={<Cloud className="w-6 h-6 text-blue-500" />}
              title="Image Compressor"
              description="Compress images quickly in-browser and download optimized outputs."
            />
            <FeatureCard
              icon={<BarChart className="w-6 h-6 text-purple-500" />}
              title="Hashtag Generator"
              description="Create platform-aware hashtags for Instagram, YouTube, LinkedIn, and X."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-pink-500" />}
              title="Audio Converter"
              description="Convert audio files into supported output formats directly in the browser."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-cyan-500" />}
              title="File Changer"
              description="Convert CSV, JSON, and text content between practical data formats."
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-slate-900 mb-10 title-font tracking-tight">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StepCard step="1" title="Pick Template" text="Select a template style and switch anytime without losing content." />
            <StepCard step="2" title="Fill Details" text="Add resume or CV details with ready sections like skills, projects, and references." />
            <StepCard step="3" title="Download & Share" text="Export your document and start applying immediately." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqRow
              question="Can I switch templates after filling my data?"
              answer="Yes. You can switch templates any time and keep your content."
            />
            <FaqRow
              question="Can I create both Resume and CV?"
              answer="Yes. You can choose Resume or CV mode and manage both in one dashboard."
            />
            <FaqRow
              question="Is there a cover letter option?"
              answer="Yes. The cover letter section is available in your dashboard and builder flow."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 title-font tracking-tight">
            Ready to Build a Better Resume?
          </h2>
          <p className="text-slate-200 text-lg mb-8">
            Open the builder, choose your template, and publish a standout CV in minutes.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-bold text-white">All in One Tools</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-sm">
            <a href="/about" className="hover:text-white">About</a>
            <a href="/contact" className="hover:text-white">Contact</a>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
          </div>
          <p className="text-sm">
            © 2026 All in One Tools. Use practical tools with confidence.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2 title-font tracking-tight">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

function TemplateCard({ name, accent, tag }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 hover:bg-white transition hover:shadow-sm">
      <div className="aspect-[4/5] rounded-lg bg-white border p-3 space-y-2">
        <div className={`h-8 rounded ${accent}`}></div>
        <div className="h-2 rounded bg-slate-200 w-4/5"></div>
        <div className="h-2 rounded bg-slate-100 w-full"></div>
        <div className="h-2 rounded bg-slate-100 w-5/6"></div>
        <div className="h-2 rounded bg-slate-100 w-4/6"></div>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-800">{name}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">{tag}</span>
      </div>
    </div>
  )
}

function GalleryCard({ name, jobTitle, company, templateStyle = 'modern', ats = false }) {
  const templateColors = {
    modern: { header: 'bg-orange-500', sidebar: 'bg-gray-800' },
    classic: { header: 'bg-sky-500', sidebar: 'bg-white' },
    creative: { header: 'bg-cyan-600', sidebar: 'bg-gray-100' },
    minimal: { header: 'bg-gray-500', sidebar: 'bg-gray-50' },
  }
  const colors = templateColors[templateStyle] || templateColors.modern

  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group">
      <div className="aspect-[3/4] bg-slate-100 p-3">
        <div className="h-full bg-white rounded-lg border shadow-sm overflow-hidden">
          {/* Mini CV Preview */}
          {templateStyle === 'modern' && (
            <div className="h-full flex">
              <div className="w-1/3 bg-gray-800 p-2">
                <div className={`h-4 rounded ${colors.header} mb-2`}></div>
                <div className="h-1.5 rounded bg-white/30 w-4/5 mb-1"></div>
                <div className="h-1.5 rounded bg-white/20 w-3/4 mb-1"></div>
                <div className="h-1.5 rounded bg-white/20 w-2/3"></div>
                <div className="mt-3 h-1 rounded bg-white/20 w-full mb-1"></div>
                <div className="h-1 rounded bg-white/15 w-5/6"></div>
              </div>
              <div className="w-2/3 p-2">
                <div className={`h-2 rounded ${colors.header} w-2/3 mb-2`}></div>
                <div className="h-1.5 rounded bg-slate-200 w-full mb-1"></div>
                <div className="h-1.5 rounded bg-slate-200 w-5/6 mb-1"></div>
                <div className="h-1.5 rounded bg-slate-100 w-4/5 mb-2"></div>
                <div className={`h-1.5 rounded ${colors.header} w-1/3 mb-1`}></div>
                <div className="h-1.5 rounded bg-slate-200 w-full mb-1"></div>
                <div className="h-1.5 rounded bg-slate-200 w-4/5"></div>
              </div>
            </div>
          )}
          {templateStyle === 'classic' && (
            <div className="h-full p-2">
              <div className="flex items-center gap-2 border-b pb-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div>
                  <div className="h-2 rounded bg-gray-700 w-20 mb-1"></div>
                  <div className={`h-1.5 rounded ${colors.header} w-14`}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="w-10 text-right"><div className="h-1 bg-gray-200 rounded"></div></div>
                  <div className={`w-0.5 ${colors.header}`}></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 rounded bg-slate-200 w-full"></div>
                    <div className="h-1.5 rounded bg-slate-100 w-4/5"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 text-right"><div className="h-1 bg-gray-200 rounded"></div></div>
                  <div className={`w-0.5 ${colors.header}`}></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 rounded bg-slate-200 w-full"></div>
                    <div className="h-1.5 rounded bg-slate-100 w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {templateStyle === 'creative' && (
            <div className="h-full flex">
              <div className="w-1/4 bg-gray-50 p-1.5 border-r">
                <div className="h-1 rounded bg-gray-400 w-3/4 mb-1"></div>
                <div className="h-1 rounded bg-gray-300 w-full mb-1"></div>
                <div className="h-1 rounded bg-gray-300 w-2/3 mb-2"></div>
                <div className={`h-0.5 rounded ${colors.header} w-full mb-0.5`}></div>
                <div className={`h-0.5 rounded ${colors.header} w-4/5 mb-0.5`}></div>
                <div className={`h-0.5 rounded ${colors.header} w-3/5`}></div>
              </div>
              <div className="w-3/4 p-2">
                <div className="h-1 rounded bg-gray-400 w-1/4 mb-0.5"></div>
                <div className="h-2 rounded bg-gray-700 w-1/2 mb-2"></div>
                <div className={`h-1 rounded ${colors.header} w-1/4 mb-1`}></div>
                <div className="h-1.5 rounded bg-slate-200 w-full mb-1"></div>
                <div className="h-1.5 rounded bg-slate-200 w-5/6 mb-1"></div>
                <div className="h-1.5 rounded bg-slate-100 w-4/5"></div>
              </div>
            </div>
          )}
          {templateStyle === 'minimal' && (
            <div className="h-full flex">
              <div className="w-2/3 p-2">
                <div className="h-1 rounded bg-gray-400 w-1/4 mb-0.5"></div>
                <div className="h-2 rounded bg-gray-700 w-1/2 mb-2"></div>
                <div className={`h-1 rounded ${colors.header} w-1/3 mb-1`}></div>
                <div className="h-1.5 rounded bg-slate-200 w-full mb-1"></div>
                <div className="h-1.5 rounded bg-slate-200 w-5/6 mb-1"></div>
                <div className="h-1.5 rounded bg-slate-100 w-4/5 mb-2"></div>
                <div className={`h-1 rounded ${colors.header} w-1/4 mb-1`}></div>
                <div className="h-1.5 rounded bg-slate-200 w-full"></div>
              </div>
              <div className="w-1/3 bg-gray-50 p-1.5">
                <div className="w-6 h-6 rounded-full bg-gray-200 mx-auto mb-2"></div>
                <div className="bg-white rounded border border-gray-200 p-1 mb-1">
                  <div className="h-0.5 rounded bg-gray-400 w-2/3 mb-0.5"></div>
                  <div className="h-0.5 rounded bg-gray-300 w-full mb-0.5"></div>
                  <div className="h-0.5 rounded bg-gray-300 w-4/5"></div>
                </div>
                <div className="bg-white rounded border border-gray-200 p-1">
                  <div className="h-0.5 rounded bg-gray-400 w-1/2 mb-0.5"></div>
                  <div className="h-0.5 rounded bg-gray-300 w-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 border-t bg-white group-hover:bg-slate-50 transition">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">{name}</h4>
            <p className="text-xs text-slate-600">{jobTitle}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{company}</p>
          </div>
          {ats && (
            <span className="text-[10px] inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              <Star className="w-2.5 h-2.5" /> ATS
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

function StepCard({ step, title, text }) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center mb-3">{step}</div>
      <h3 className="font-semibold text-slate-900 mb-1 title-font tracking-tight">{title}</h3>
      <p className="text-slate-600 text-sm">{text}</p>
    </article>
  )
}

function ProofCard({ quote, author }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-slate-700 leading-relaxed">"{quote}"</p>
      <p className="text-sm text-slate-500 mt-4">{author}</p>
    </article>
  )
}

function FaqRow({ question, answer }) {
  return (
    <article className="bg-white border rounded-xl p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{question}</h3>
      <p className="text-gray-700">{answer}</p>
    </article>
  )
}

const TRUSTPILOT_REVIEWS = [
  {
    id: 1,
    name: 'Clara Schneider',
    rating: 5,
    title: 'Thank you ResumeLeader',
    review: 'I think like many other people I used the same resume successfully for several years, now with the advancement of technology I was able to give it a "facelift" thank you for creating an amazing user friendly platform.',
    time: '4 hours ago',
    avatar: 'CS'
  },
  {
    id: 2,
    name: 'Arthur James',
    rating: 5,
    title: "I've been writing my own resume for too long...",
    review: "I've been writing my resume for 14 years and wish this program had existed in high school. I've learned a lot from the formatting and detailed job descriptions.",
    time: '6 hours ago',
    avatar: 'AJ'
  },
  {
    id: 3,
    name: 'Emma Novak',
    rating: 5,
    title: 'Amazing service',
    review: 'Resume leader was amazing to use and easy to navigate. I would highly recommend it for beginners or people who have trouble with building a resume from scratch.',
    time: '12 hours ago',
    avatar: 'EN'
  },
  {
    id: 4,
    name: 'Michael Chen',
    rating: 5,
    title: 'Got my dream job!',
    review: 'After using this platform, I received 3 interview calls within the first week. The ATS-friendly templates really made a difference in getting past the initial screening.',
    time: '1 day ago',
    avatar: 'MC'
  },
  {
    id: 5,
    name: 'Sarah Williams',
    rating: 5,
    title: 'Best resume builder out there',
    review: 'I have tried many resume builders but this one stands out. The templates are modern, professional, and the AI suggestions helped me craft better bullet points.',
    time: '2 days ago',
    avatar: 'SW'
  },
  {
    id: 6,
    name: 'David Park',
    rating: 5,
    title: 'Simple and effective',
    review: 'Very intuitive interface. I was able to create a professional CV in under 30 minutes. The export options are great and the PDF quality is excellent.',
    time: '3 days ago',
    avatar: 'DP'
  }
]

function TrustpilotReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reviewsPerPage = 3
  const totalPages = Math.ceil(TRUSTPILOT_REVIEWS.length / reviewsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const visibleReviews = TRUSTPILOT_REVIEWS.slice(
    currentIndex * reviewsPerPage,
    currentIndex * reviewsPerPage + reviewsPerPage
  )

  return (
    <section className="px-6 py-16 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-slate-900 mb-10 title-font tracking-tight italic">
          ResumeLeader, as told by our users
        </h2>

        {/* Trustpilot Badge & Avatars Row */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            {/* Trustpilot Logo */}
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 18.27L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" fill="#00B67A"/>
              </svg>
              <span className="text-xl font-bold text-slate-800">Trustpilot</span>
            </div>
            <div className="h-8 w-px bg-slate-300"></div>
            <span className="text-lg font-semibold text-slate-700">Excellent</span>
          </div>

          {/* User Avatars */}
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {['https://randomuser.me/api/portraits/women/44.jpg', 
                'https://randomuser.me/api/portraits/men/32.jpg',
                'https://randomuser.me/api/portraits/women/68.jpg',
                'https://randomuser.me/api/portraits/men/75.jpg',
                'https://randomuser.me/api/portraits/women/89.jpg'
              ].map((src, i) => (
                <img 
                  key={i}
                  src={src} 
                  alt="" 
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-700 flex items-center justify-center text-white text-xs font-medium">
                FN
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-600 flex items-center justify-center text-white text-xs font-medium">
                KJ
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Previous Button */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50 transition z-10"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6 px-4">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50 transition z-10"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === currentIndex ? 'bg-slate-800' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
      {/* Name */}
      <h4 className="font-semibold text-slate-900 text-lg">{review.name}</h4>
      
      {/* Star Rating */}
      <div className="flex gap-0.5 my-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-6 h-6 flex items-center justify-center ${
              i < review.rating ? 'bg-[#00B67A]' : 'bg-slate-200'
            }`}
          >
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
        ))}
      </div>

      {/* Title */}
      <h5 className="font-semibold text-slate-800 mt-3">{review.title}</h5>
      
      {/* Review Text */}
      <p className="text-slate-600 text-sm mt-2 leading-relaxed">{review.review}</p>
      
      {/* Time */}
      <p className="text-slate-400 text-xs mt-4">{review.time}</p>
    </article>
  )
}
