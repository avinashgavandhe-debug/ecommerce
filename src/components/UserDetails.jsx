import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { X } from "lucide-react";
const UserDetails = ({ onClose }) => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${user.id}`);
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : userDetails ? (
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <img
                src={userDetails.image}
                alt={userDetails.firstName}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {userDetails.firstName} {userDetails.lastName}
                </h3>
                <p className="text-gray-600">@{userDetails.username}</p>
                <p className="text-sm text-gray-500">{userDetails.role || 'Customer'}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-medium text-gray-800">{userDetails.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="font-medium text-gray-800">{userDetails.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                  <p className="font-medium text-gray-800">{userDetails.birthDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Age</p>
                  <p className="font-medium text-gray-800">{userDetails.age} years</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Gender</p>
                  <p className="font-medium text-gray-800 capitalize">{userDetails.gender}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Blood Group</p>
                  <p className="font-medium text-gray-800">{userDetails.bloodGroup}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Address</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800 mb-2">
                  {userDetails.address.address}
                </p>
                <p className="text-gray-600">
                  {userDetails.address.city}, {userDetails.address.state} {userDetails.address.postalCode}
                </p>
                <p className="text-gray-600">{userDetails.address.country}</p>
                {userDetails.address.coordinates && (
                  <p className="text-sm text-gray-500 mt-2">
                    Coordinates: {userDetails.address.coordinates.lat}, {userDetails.address.coordinates.lng}
                  </p>
                )}
              </div>
            </div>

            {/* Company Information */}
            {userDetails.company && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Company</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800 mb-1">{userDetails.company.name}</p>
                  <p className="text-gray-600 mb-1">{userDetails.company.title}</p>
                  <p className="text-sm text-gray-500">{userDetails.company.department}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {userDetails.company.address.address}, {userDetails.company.address.city}
                  </p>
                </div>
              </div>
            )}

            {/* Bank Information */}
            {userDetails.bank && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Bank Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Card Number</p>
                    <p className="font-medium text-gray-800">**** **** **** {userDetails.bank.cardNumber.slice(-4)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Card Type</p>
                    <p className="font-medium text-gray-800">{userDetails.bank.cardType}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Currency</p>
                    <p className="font-medium text-gray-800">{userDetails.bank.currency}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">IBAN</p>
                    <p className="font-medium text-gray-800 text-sm">{userDetails.bank.iban}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Physical Attributes */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Physical Attributes</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Height</p>
                  <p className="font-medium text-gray-800">{userDetails.height} cm</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Weight</p>
                  <p className="font-medium text-gray-800">{userDetails.weight} kg</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Eye Color</p>
                  <p className="font-medium text-gray-800 capitalize">{userDetails.eyeColor}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Hair</p>
                  <p className="font-medium text-gray-800 capitalize">{userDetails.hair.color}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">University</p>
                  <p className="font-medium text-gray-800">{userDetails.university}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">IP Address</p>
                  <p className="font-medium text-gray-800">{userDetails.ip}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">MAC Address</p>
                  <p className="font-medium text-gray-800 text-sm">{userDetails.macAddress}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">User Agent</p>
                  <p className="font-medium text-gray-800 text-xs">{userDetails.userAgent}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Failed to load user details
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;