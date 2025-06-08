import React, { useState, useEffect } from "react";
import {
  Brain,
  Twitter,
  Youtube,
  FileText,
  Search,
  Zap,
  Shield,
  ArrowRight,
  Menu,
  X,
  Star,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import demoVideo from "../assets/demo.mp4";
const VaultIQLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Centralized Knowledge Hub",
      description:
        "Gather all your digital content from Twitter, YouTube, Google Docs, and more in one intelligent workspace.",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Powerful Search",
      description:
        "Find exactly what you need with advanced search capabilities across all your saved content.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quick Access",
      description:
        "Transform scattered information into an organized system for instant access to your knowledge.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description:
        "Your data remains yours. Enterprise-grade security ensures your second brain stays protected.",
    },
  ];

  const integrations = [
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      color: "text-blue-400",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      color: "text-red-500",
    },
    {
      name: "Google Docs",
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-600",
    },
    {
      name: "And More",
      icon: <Star className="w-6 h-6" />,
      color: "text-yellow-500",
    },
  ];

  const benefits = [
    "Never lose important information again",
    "Connect ideas across different platforms",
    "Discover patterns in your saved content",
    "Access your knowledge from anywhere",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 text-slate-900 overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-2xl border-b border-slate-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                VaultIQ
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => {
                  navigate("/signin");
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200">
            <div className="px-6 py-4 space-y-4">
              <a
                href="#features"
                className="block hover:text-purple-600 transition-colors text-slate-700"
              >
                Features
              </a>
              <a
                href="#integrations"
                className="block hover:text-purple-600 transition-colors text-slate-700"
              >
                Integrations
              </a>
              <a
                href="#pricing"
                className="block hover:text-purple-600 transition-colors text-slate-700"
              >
                Pricing
              </a>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-100 border border-purple-200 rounded-full px-6 py-2 mb-8">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">
                Your Digital Second Brain is Here
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Centralize Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent">
                Digital Knowledge
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform scattered content from Twitter, YouTube, and Google Docs
              into an organized, searchable knowledge base in one centralized
              location.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-purple-300 text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-200/50 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-pink-200/50 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-blue-200/50 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Supercharge Your Mind
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              VaultIQ transforms how you collect, organize, and discover
              knowledge from across the digital landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 hover:bg-white hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Connect Everything
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Seamlessly import content from your favorite platforms and create
              connections between ideas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 text-center hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`${integration.color} mb-4 flex justify-center`}
                >
                  {integration.icon}
                </div>
                <h3 className="font-semibold text-slate-800">
                  {integration.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-slate-800">
                  Your Knowledge,{" "}
                  <span className="text-purple-600">Unified</span>
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 backdrop-blur-sm border border-purple-200">
                  <div className="text-center">
                    <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2 text-slate-800">
                      Smart Organization
                    </h4>
                    <p className="text-slate-600 text-sm">
                      Advanced categorization and tagging help you organize your
                      content, making it easy to find and connect related
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                See VaultIQ in Action
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Watch how VaultIQ transforms your scattered digital content into
              an organized, searchable knowledge base.
            </p>
          </div>

          <div className="relative">
            {/* Video Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                {/* Uncomment and replace with your actual video */}

                <video
                  className="w-full h-full object-cover"
                  controls
                  poster=""
                >
                  <source src={demoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Or embed YouTube/Vimeo video */}
                {/* 
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                  title="VaultIQ Demo"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                */}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
          </div>

          {/* Demo Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Import Content
              </h3>
              <p className="text-slate-600 text-sm">
                Connect your Twitter, YouTube, and Google Docs accounts
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Organize Content
              </h3>
              <p className="text-slate-600 text-sm">
                Automatically categorize and tag your content for easy discovery
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Search & Discover
              </h3>
              <p className="text-slate-600 text-sm">
                Find exactly what you need with powerful search functionality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
            Ready to Build Your
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Second Brain
            </span>
            ?
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Join thousands of knowledge workers who have transformed their
            digital lives with VaultIQ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-300 py-12 px-6 lg:px-8 bg-white/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                VaultIQ
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              <a href="#" className="hover:text-purple-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-slate-500 mt-8">
            © 2025 VaultIQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VaultIQLanding;
