import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  CreditCard,
  User,
  Globe,
  Edit,
  Settings,
  Award,
  TrendingUp,
  Sparkles,
  Shield,
  ArrowLeft,
} from "lucide-react";

const UserDetails = ({ user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/users/${user?.id || 1}`
      );
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const InfoCard = ({ icon: Icon, label, value, fullWidth = false }) => (
    <div
      className={`group hover:shadow-lg transition-all duration-200 bg-white border border-gray-200 rounded-2xl p-5 ${
        fullWidth ? "col-span-full" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
          <Icon size={20} className="text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            {label}
          </p>
          <p className="text-base font-bold text-gray-900 break-words">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-20">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-violet-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-violet-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
        </div>
        <p className="text-gray-600 mt-4 font-bold text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="text-red-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to load profile
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't retrieve the user details. Please try again later.
          </p>
          <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-violet-600">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-3 rounded-xl font-bold hover:bg-white/30 transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 pb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 rounded-3xl blur-2xl opacity-40"></div>
              <img
                src={userDetails.image}
                alt={userDetails.firstName}
                className="relative w-40 h-40 rounded-3xl object-cover ring-8 ring-white shadow-2xl"
              />
              <div className="absolute -bottom-3 -right-3 bg-green-500 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-3 border border-white/30">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
                <span className="text-sm font-bold">
                  {userDetails.role || "Premium Member"}
                </span>
              </div>
              <h1 className="text-5xl font-black mb-2">
                {userDetails.firstName} {userDetails.lastName}
              </h1>
              <p className="text-xl text-purple-100 font-medium mb-4">
                @{userDetails.username}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="bg-white text-violet-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                  <Edit size={18} />
                  Edit Profile
                </button>
                <button className="bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all flex items-center gap-2">
                  <Settings size={18} />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <Award className="h-10 w-10 mx-auto mb-3 text-yellow-300" />
              <div className="text-3xl font-black text-white mb-1">
                {userDetails.age}
              </div>
              <div className="text-sm text-purple-200 font-medium">
                Years Old
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-green-300" />
              <div className="text-3xl font-black text-white mb-1">4.8</div>
              <div className="text-sm text-purple-200 font-medium">
                User Rating
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <Sparkles className="h-10 w-10 mx-auto mb-3 text-pink-300" />
              <div className="text-3xl font-black text-white mb-1">Active</div>
              <div className="text-sm text-purple-200 font-medium">
                Account Status
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {/* Contact Information */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-10 bg-violet-600 rounded-full"></div>
              <h2 className="text-3xl font-black text-gray-900">
                Contact Information
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoCard
                icon={Mail}
                label="Email Address"
                value={userDetails.email}
              />
              <InfoCard
                icon={Phone}
                label="Phone Number"
                value={userDetails.phone}
              />
              <InfoCard
                icon={Calendar}
                label="Date of Birth"
                value={userDetails.birthDate}
              />
              <InfoCard
                icon={User}
                label="Gender"
                value={userDetails.gender}
              />
            </div>
          </section>

          {/* Location */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-10 bg-violet-600 rounded-full"></div>
              <h2 className="text-3xl font-black text-gray-900">Location</h2>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-2xl">
                  <MapPin className="text-blue-600" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Primary Address
                  </h3>
                  <p className="text-lg text-gray-700 font-semibold mb-1">
                    {userDetails.address.address}
                  </p>
                  <p className="text-gray-600">
                    {userDetails.address.city}, {userDetails.address.state}{" "}
                    {userDetails.address.postalCode}
                  </p>
                  <p className="text-gray-500 mt-1">
                    {userDetails.address.country}
                  </p>
                </div>
              </div>
              {userDetails.address.coordinates && (
                <div className="pt-6 border-t-2 border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Globe size={16} />
                    <span className="text-sm font-medium">
                      GPS Coordinates: {userDetails.address.coordinates.lat},{" "}
                      {userDetails.address.coordinates.lng}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Employment */}
          {userDetails.company && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-10 bg-violet-600 rounded-full"></div>
                <h2 className="text-3xl font-black text-gray-900">
                  Employment Details
                </h2>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-50 rounded-2xl">
                    <Briefcase className="text-violet-600" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      {userDetails.company.name}
                    </h3>
                    <p className="text-xl text-violet-600 font-bold mb-2">
                      {userDetails.company.title}
                    </p>
                    <p className="text-gray-600 font-medium mb-4">
                      {userDetails.company.department}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={16} />
                      <span className="text-sm">
                        {userDetails.company.address.address},{" "}
                        {userDetails.company.address.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Financial Information */}
          {userDetails.bank && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-10 bg-violet-600 rounded-full"></div>
                <h2 className="text-3xl font-black text-gray-900">
                  Financial Information
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard
                  icon={CreditCard}
                  label="Card Number"
                  value={`•••• •••• •••• ${userDetails.bank.cardNumber.slice(
                    -4
                  )}`}
                />
                <InfoCard
                  icon={CreditCard}
                  label="Card Type"
                  value={userDetails.bank.cardType}
                />
                <InfoCard
                  icon={Globe}
                  label="Currency"
                  value={userDetails.bank.currency}
                />
                <InfoCard
                  icon={CreditCard}
                  label="IBAN"
                  value={userDetails.bank.iban}
                  fullWidth
                />
              </div>
            </section>
          )}

          {/* Physical Attributes & Additional Info */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-10 bg-violet-600 rounded-full"></div>
              <h2 className="text-3xl font-black text-gray-900">
                Additional Details
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
              <div className="bg-blue-50 rounded-3xl p-6 text-center border-2 border-blue-200 hover:scale-105 transition-transform">
                <p className="text-4xl font-black text-blue-600 mb-2">
                  {userDetails.height}
                </p>
                <p className="text-sm text-gray-700 font-bold">Height (cm)</p>
              </div>
              <div className="bg-purple-50 rounded-3xl p-6 text-center border-2 border-purple-200 hover:scale-105 transition-transform">
                <p className="text-4xl font-black text-purple-600 mb-2">
                  {userDetails.weight}
                </p>
                <p className="text-sm text-gray-700 font-bold">Weight (kg)</p>
              </div>
              <div className="bg-green-50 rounded-3xl p-6 text-center border-2 border-green-200 hover:scale-105 transition-transform">
                <p className="text-lg font-black text-green-600 mb-2 capitalize">
                  {userDetails.eyeColor}
                </p>
                <p className="text-sm text-gray-700 font-bold">Eye Color</p>
              </div>
              <div className="bg-amber-50 rounded-3xl p-6 text-center border-2 border-amber-200 hover:scale-105 transition-transform">
                <p className="text-lg font-black text-amber-600 mb-2 capitalize">
                  {userDetails.hair.color}
                </p>
                <p className="text-sm text-gray-700 font-bold">Hair Color</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard
                icon={Globe}
                label="University"
                value={userDetails.university}
              />
              <InfoCard
                icon={Globe}
                label="Blood Group"
                value={userDetails.bloodGroup}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;