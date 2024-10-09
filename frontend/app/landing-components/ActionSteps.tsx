import React, { useRef, useState, useEffect } from "react";

const ActionSteps = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Update the state to indicate that we are in the client environment
  }, []);

  const handleVideoClick = (videoSrc: string) => {
    setActiveVideoSrc(videoSrc);
  };

  const handleCloseModal = () => {
    setActiveVideoSrc(null);
  };

  return (
    <div className="grid grid-cols-8">
      <div className="flex justify-end col-span-1 mb-10">
        <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase ">
          1
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10 w-full">
        <div className="w-full sm:w-3/4 md:w-1/2 pr-8">
          <h3 className="text-4xl mb-4 font-neue-machina font-light uppercase ">
            Tagging social media contents.
          </h3>
          <p className="mb-4 font-light font-neue-machina">
            Using a well-trained AI model, we can detect and <span className="text-orange-300">tag
            deepfakes and AI-generated content </span>after starting up the toolkit extension. The model will also 
            <span className="text-orange-300"> tag the authenticity of the content</span> based on timestamps and similarity.
          </p>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2">
          {/* Add your code visualization component here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* Placeholder for code visualization */}
            <div className="h-64 bg-gray-700 rounded-lg">
                <img src="/assets/tagging.jpeg" alt="Blockchain" className="w-full h-full object-cover p-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end col-span-1 mb-10">
        <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase">
          2
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10">
        <div className="w-full sm:w-3/4 md:w-1/2 pr-8">
          <h3 className="text-2xl sm:text-4xl mb-4 font-neue-machina font-light uppercase">
            Content hashing timestamps.
          </h3>
          <p className="mb-4 font-light font-neue-machina">
            By leveraging blockchain technology, we can create a <span className="text-orange-300">unique hash for
            each content </span>. This hash is a unique identifier for the contents and can
            be used to <span className="text-orange-300">verify the authenticity of the video</span>. Similar videos of
            later blockheight will be <span className="text-orange-300">detected and tagged </span>to ensure copyrights and authenticity.
          </p>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2">
          {/* Add your code visualization component here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* Placeholder for code visualization */}
            <div className="h-64 bg-gray-700 rounded-lg">
                <img src="/assets/images/blockchain.png" alt="Blockchain" className="w-full h-full object-cover p-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end col-span-1 mb-10">
        <span className="rounded-full bg-orange-300 text-black w-16 h-16 mr-5 mt-5 flex justify-center items-center text-4xl font-neue-machina font-light uppercase">
          3
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center col-span-7 border-l-2 border-gray-400 border-dashed pl-5 pb-10">
        <div className="w-full sm:w-3/4 md:w-1/2 pr-8">
          <h3 className="text-2xl sm:text-4xl sm:text-8xlmb-4 font-neue-machina font-light uppercase">
            Entirely humanless.
          </h3>
          <p className="mb-4 font-light font-neue-machina">
            All the <span className="text-orange-300">processing is done on the blockchain</span>, so you don&apos;t need
            to worry about the human factor. The model is trained on a large
            dataset of videos and is able to <span className="text-orange-300">detect and cancel out deepfakes and
            AI-generated content</span>.
          </p>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2">
          {/* Add your code visualization component here */}
          <div className="bg-gray-800 p-4 rounded-lg">
            {/* Placeholder for code visualization */}
            <div className="h-64 bg-gray-700 rounded-lg">
                <img src="/assets/OnchainAI.jpg" alt="AI" className="w-full h-full object-cover p-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end col-span-1 mb-10"></div>
      <a
        href="#"
        className="bg-orange-300 text-black px-7 py-4 rounded-sm hover:underline w-[150px] mt-10 font-neue-machina font-light"
      >
        Try it now
      </a>

      {/* Video Pop-up Modal */}
      {activeVideoSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-black p-6 rounded-lg shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              &times;
            </button>
            <video
              src={activeVideoSrc}
              className="w-full h-full max-w-4xl"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionSteps;
