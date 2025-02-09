'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Camera, Save } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || '',
    email: authUser?.email || '',
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  return (
    <div className="min-h-screen pt-20 bg-background text-foreground relative overflow-hidden">
      {/* Moving birds and trees SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Sky */}
        <rect width="1000" height="1000" fill="currentColor" className="text-primary/10" />

        {/* Trees */}
        {[...Array(5)].map((_, i) => (
          <g key={i} className="text-primary/30">
            <motion.path
              d={`M${200 + i * 150},1000 L${250 + i * 150},800 L${300 + i * 150},1000 Z`}
              fill="currentColor"
              animate={{
                y: [0, -10, 0],
                transition: { duration: 3, repeat: Infinity, delay: i * 0.5 }
              }}
            />
          </g>
        ))}

        {/* Realistic Birds */}
        {[...Array(10)].map((_, i) => (
          <motion.path
            key={i}
            d="M0,0 Q10,-10 20,0 Q30,10 40,0"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
            initial={{ x: -50, y: 100 + i * 100 }}
            animate={{
              x: 1050,
              y: [100 + i * 100, 150 + i * 100, 100 + i * 100],
              transition: { duration: 12, repeat: Infinity, delay: i * 2 }
            }}
          />
        ))}
      </svg>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto p-4 py-8 relative z-10"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl p-6 space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-muted-foreground">Your profile information</p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                src={selectedImg || authUser?.profilePic || "/placeholder.svg?height=128&width=128"}
                alt="Profile picture"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary/30"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:bg-primary/90
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-primary-foreground" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <InfoField 
              icon={<User className="w-4 h-4" />} 
              label="Full Name" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <InfoField 
              icon={<Mail className="w-4 h-4" />} 
              label="Email Address" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={isUpdatingProfile}
            >
              <Save className="w-4 h-4" />
              {isUpdatingProfile ? "Updating..." : "Save Changes"}
            </button>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-muted rounded-xl p-6"
          >
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-primary/20">
                <span className="text-muted-foreground">Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function InfoField({ icon, label, name, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </label>
      <motion.input
        whileHover={{ scale: 1.02 }}
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 bg-muted rounded-full border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
}

export default Profile

