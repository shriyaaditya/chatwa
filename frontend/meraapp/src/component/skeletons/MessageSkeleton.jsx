import {motion} from 'framer-motion'


const MessageSkeleton = () => {
    // Create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null);
    const skeletonVariants = {
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
        
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
         <motion.div 
      className="flex-1 overflow-y-auto p-4 space-y-4"
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
    >
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"}`}
          variants={itemVariants}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full bg-base-300 animate-pulse" />
          </div>
          <div className="chat-header mb-1">
            <div className="w-20 h-3 bg-base-300 rounded animate-pulse" />
          </div>
          <div className="chat-bubble flex flex-col">
            <div className="w-32 h-4 bg-base-300 rounded animate-pulse mb-2" />
            <div className="w-24 h-4 bg-base-300 rounded animate-pulse" />
          </div>
        </motion.div>
      ))}
    </motion.div>
        {skeletonMessages.map((_, idx) => (
          <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <div className="skeleton w-full h-full rounded-full" />
              </div>
            </div>
  
            <div className="chat-header mb-1">
              <div className="skeleton h-4 w-16" />
            </div>
  
            <div className="chat-bubble bg-transparent p-0">
              <div className="skeleton h-16 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSkeleton;