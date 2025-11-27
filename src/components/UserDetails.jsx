import { useEffect, useState } from "react";
import {
  X,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  CreditCard,
  User,
  Globe,
} from "lucide-react";

const UserDetails = ({ onClose, user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
      className={`group hover:shadow-md transition-all duration-200 bg-white border border-gray-200 rounded-xl p-4 ${
        fullWidth ? "col-span-full" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
          <Icon size={18} className="text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-sm font-semibold text-gray-900 break-words">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
          <h2 className="text-2xl font-bold text-white">User Profile</h2>
          <p className="text-blue-100 text-sm mt-1">
            Complete profile information
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
              </div>
              <p className="text-gray-500 mt-4 font-medium">
                Loading profile...
              </p>
            </div>
          ) : userDetails ? (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-gray-200">
                <div className="relative">
                  <img
                    src={userDetails.image}
                    alt={userDetails.firstName}
                    className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {userDetails.firstName} {userDetails.lastName}
                  </h3>
                  <p className="text-gray-600 font-medium mb-2">
                    @{userDetails.username}
                  </p>
                  <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full">
                    {userDetails.role || "Customer"}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <section>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    label="Age & Gender"
                    value={`${userDetails.age} years • ${userDetails.gender}`}
                  />
                </div>
              </section>

              {/* Address */}
              <section>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  Location
                </h4>
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        {userDetails.address.address}
                      </p>
                      <p className="text-gray-600">
                        {userDetails.address.city}, {userDetails.address.state}{" "}
                        {userDetails.address.postalCode}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {userDetails.address.country}
                      </p>
                    </div>
                  </div>
                  {userDetails.address.coordinates && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <Globe size={14} />
                        GPS: {userDetails.address.coordinates.lat},{" "}
                        {userDetails.address.coordinates.lng}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Company */}
              {userDetails.company && (
                <section>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                    Employment
                  </h4>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <Briefcase className="text-blue-600 mt-1" size={20} />
                      <div>
                        <p className="font-bold text-gray-900 text-lg mb-1">
                          {userDetails.company.name}
                        </p>
                        <p className="text-blue-600 font-semibold mb-1">
                          {userDetails.company.title}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          {userDetails.company.department}
                        </p>
                        <p className="text-gray-500 text-sm">
                          📍 {userDetails.company.address.address},{" "}
                          {userDetails.company.address.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Bank Details */}
              {userDetails.bank && (
                <section>
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                    Financial Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              {/* Physical & Additional Info */}
              <section>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  Additional Details
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100">
                    <p className="text-2xl font-bold text-blue-600 mb-1">
                      {userDetails.height}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      Height (cm)
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
                    <p className="text-2xl font-bold text-purple-600 mb-1">
                      {userDetails.weight}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      Weight (kg)
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-green-100">
                    <p className="text-sm font-bold text-green-600 mb-1 capitalize">
                      {userDetails.eyeColor}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      Eye Color
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-100">
                    <p className="text-sm font-bold text-amber-600 mb-1 capitalize">
                      {userDetails.hair.color}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      Hair Color
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <InfoCard
                    icon={Globe}
                    label="University"
                    value={userDetails.university}
                    fullWidth
                  />
                  <InfoCard
                    icon={Globe}
                    label="Blood Group"
                    value={userDetails.bloodGroup}
                  />
                </div>
              </section>
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="text-red-600" size={32} />
              </div>
              <p className="text-gray-600 font-medium">
                Failed to load user details
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Please try again later
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
