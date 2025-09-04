"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For search

  // Fetch schools from your API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/school");
        const data = await res.json();
        setSchools(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    fetchSchools();
  }, []);

  // Filter schools by search term
  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-100 backdrop-blur-lg  p-6">
      <h2 className="text-3xl text-blue-950 font-bold text-center mb-6">
        Schools List
      </h2>
      {/* Search Box */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name, city, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      {/* Schools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden relative"
          >
            {/* School Image */}
            <img
              src={school.image || "/images/default-school.jpg"}
              alt={school.name}
              className="w-full h-48 object-cover transform transition duration-300 hover:scale-110 hover:brightness-90"
            />

            {/* Optional + icon top-right */}
            <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
              <span className="text-blue-500 text-xl font-bold">+</span>
            </div>

            {/* School Info */}
            <div className="p-4 space-y-1">
              {/* Rating and Type */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>⭐️⭐️⭐️⭐️☆</span>
                <span>{school.type || ""}</span>
              </div>

              {/* City */}
              <p className="text-sm text-blue-500">{school.city}</p>

              {/* Name */}
              <h3 className="text-lg font-semibold">{school.name}</h3>

              {/* Address */}
              <p className="text-gray-400 text-sm">{school.address}</p>
            </div>

            {/* Apply Now Button */}
            <div className="p-4">
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Apply Now
              </button>
            </div>
          </div>
        ))}

        {filteredSchools.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No schools found.
          </p>
        )}
      </div>
    </div>
  );
}
