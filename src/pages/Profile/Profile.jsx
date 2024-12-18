import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Button,
  Card,
  Input,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import { auth } from "../../firebase/firebase.config"; // Make sure this import is correct
import { sendEmailVerification } from "firebase/auth";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);

  // Reload user data when component mounts to ensure emailVerified is up-to-date
  useEffect(() => {
    const reloadUserData = async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
      }
    };
    reloadUserData();
  }, []);

  // Mock data for orders and wishlist (replace with actual data)
  const orders = [
    { id: 1, date: "2024-03-20", status: "Delivered", total: 150 },
    { id: 2, date: "2024-03-15", status: "Processing", total: 85 },
  ];

  const wishlist = [
    { id: 1, name: "Product 1", price: 49.99 },
    { id: 2, name: "Product 2", price: 29.99 },
  ];

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await updateUserProfile(name);
      setIsEditing(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update profile",
        text: error.message,
        showConfirmButton: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    if (!auth.currentUser) return;
    setIsSendingVerification(true);

    try {
      await sendEmailVerification(auth.currentUser);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Verification email sent!",
        text: "Please check your inbox (and spam folder).",
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Error sending verification email:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to send verification email",
        text: error.message,
        showConfirmButton: true,
      });
    } finally {
      setIsSendingVerification(false);
    }
  };

  const data = [
    {
      label: "Profile",
      value: "profile",
      icon: FaUser,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-32 h-32 rounded-full mx-auto border-4 border-primary"
              />
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            ) : (
              <p className="text-lg font-medium">{user?.displayName}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-lg">{user?.email}</p>
          </div>

          {/* Account Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Status
            </label>
            <p className="text-lg flex items-center gap-2">
              {user?.emailVerified ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <>
                  <span className="text-red-500">Not Verified</span>
                  <Button
                    size="sm"
                    color="blue"
                    onClick={handleSendVerificationEmail}
                    disabled={isSendingVerification}
                  >
                    {isSendingVerification
                      ? "Sending..."
                      : "Send Verification Email"}
                  </Button>
                </>
              )}
            </p>
          </div>

          {/* Account Created */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Member Since
            </label>
            <p className="text-lg">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            {isEditing ? (
              <>
                <Button
                  color="red"
                  onClick={() => {
                    setIsEditing(false);
                    setName(user?.displayName || "");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary"
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button className="bg-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      label: "Orders",
      value: "orders",
      icon: FaShoppingBag,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Order History</h3>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${order.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No orders found</p>
          )}
        </div>
      ),
    },
    {
      label: "Wishlist",
      value: "wishlist",
      icon: FaHeart,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">My Wishlist</h3>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlist.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-primary">${item.price}</p>
                    </div>
                    <Button className="bg-primary">Add to Cart</Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Your wishlist is empty</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-32 mb-8">
      <Helmet>
        <title>Sunnah Store | Profile</title>
      </Helmet>

      <Card className="max-w-4xl mx-auto p-8">
        <Tabs value="profile">
          <TabsHeader>
            {data.map(({ label, value, icon: Icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="mt-6">
            {data.map(({ value, content }) => (
              <TabPanel key={value} value={value}>
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
