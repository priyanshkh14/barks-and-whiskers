import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">About Barks & Whiskers</h1>

      <p className="text-lg text-gray-700 mb-6">
        Barks & Whiskers is a passionate initiative dedicated to finding loving homes for dogs, cats, and other animals in need.
        We connect shelters, rescues, and pet lovers through a user-friendly platform that makes adoption and rehoming easier than ever.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-12">
        <div>
          <h2 className="text-2xl font-semibold text-red-500 mb-2">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is simple: ensure every animal has a safe, loving home. We believe in responsible adoption and pet care,
            and we strive to empower individuals and families to adopt rather than shop.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-red-500 mb-2">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Browse adoptable dogs and cats</li>
            <li>Search and filter by location and breed</li>
            <li>Expert articles on pet care and adoption</li>
            <li>Rehome your pet with dignity and ease</li>
          </ul>
        </div>
      </div>

      <div className="bg-red-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-red-700 mb-2">Join Our Mission</h3>
        <p className="text-gray-700 mb-4">
          Whether you are looking to adopt a furry friend or rehome a beloved pet, Barks & Whiskers is here to help.
          Join our community and make a difference in an animals life today.
        </p>
        <Link
          to="/search"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Start Adopting
        </Link>
      </div>
    </div>
  );
}
