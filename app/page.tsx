"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { Cover } from "@/components/ui/cover";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 font-sans">
      <header className="bg-gray-800 flex items-center p-2 justify-between">
        <div className="absolute inset-0 z-10 overflow-hidden">
          <Boxes />
        </div>
        <div className="ml-2 animate-fadeIn ">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <div className="container text-slate-100 mx-auto flex justify-end items-center">
          <nav className="animate-slideIn">
            <ul className="flex space-x-6 z-20 relative">
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white">
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-3xl text-center animate-fadeInUp relative z-10">
              <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                Ace Your Interview with AI <br /> at{" "}
                <Cover>Interview AIssist</Cover>
              </h1>

              <p className="mx-auto mt-4 max-w-xl sm:text-xl">
                Prepare for your next big interview with personalized AI-driven
                mock interviews and feedback.
              </p>

              <Link href="/dashboard">
                <Button className="bg-yellow-400 text-gray-950 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-300 mt-10 animate-bounce">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        {/* Features Section */}
        <section
          id="features"
          className=" bg-gradient-to-b from-gray-900 via-gray-600 to-gray-200 py-20"
        >
          <div className="container mx-auto text-center animate-fadeIn">
            <h2 className="text-3xl font-bold mb-8 text-gray-400">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Realistic Mock Interviews
                </h3>
                <p className="text-gray-600">
                  Experience interviews tailored to your field with AI-powered
                  questions and realistic scenarios.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Personalized Feedback
                </h3>
                <p className="text-gray-600">
                  Receive detailed feedback and improvement tips based on your
                  performance in mock interviews.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Progress Tracking
                </h3>
                <p className="text-gray-600">
                  Track your progress and see how you improve over time with our
                  comprehensive analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 py-20"
        >
          <div className="container mx-auto text-center animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">About Us</h2>
            <p className="text-lg text-gray-700">
              Interview AIssist is dedicated to helping professionals succeed in
              their interviews through innovative AI technology. Our platform
              provides realistic mock interviews, personalized feedback, and
              progress tracking to ensure you’re always prepared.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gray-50 py-20">
          <div className="container mx-auto text-center animate-fadeIn">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Contact Us
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Have any questions or need support? Reach out to us!
            </p>
            <a
              href="mailto:contact@interviewaissist.com"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-400"
            >
              Email Us
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-purple-500 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Interview AIssist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
