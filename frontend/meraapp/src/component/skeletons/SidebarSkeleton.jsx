import { Users } from "lucide-react";
import { motion } from "framer-motion";


const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
        <motion.aside
      className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="border-b border-base-300 w-full p-5" variants={itemVariants}>
        <div className="flex items-center gap-2">
          <div className="size-6 bg-base-300 rounded animate-pulse" />
          <div className="w-20 h-4 bg-base-300 rounded animate-pulse hidden lg:block" />
        </div>
      </motion.div>

      <motion.div className="overflow-y-auto w-full py-3" variants={containerVariants}>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="w-full p-3 flex items-center gap-3"
            variants={itemVariants}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className="size-12 bg-base-300 rounded-full animate-pulse" />
            </div>
            <div className="hidden lg:block flex-1">
              <div className="w-24 h-4 bg-base-300 rounded animate-pulse mb-2" />
              <div className="w-16 h-3 bg-base-300 rounded animate-pulse" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.aside>
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;