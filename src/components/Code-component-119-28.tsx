import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Camera, 
  Image as ImageIcon, 
  Music, 
  Type, 
  Palette, 
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LiquidEtherBackground } from './LiquidEtherBackground';
import { unsplash_tool } from '../tools/unsplash';

interface StoryUploadViewProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (story: StoryData) => void;
  preSelectedImage?: string;
}

interface StoryData {
  id: string;
  image: string;
  caption: string;
  music?: {
    title: string;
    artist: string;
    preview: string;
    duration: number;
  };
  textOverlay?: {
    text: string;
    color: string;
    position: { x: number; y: number };
    size: 'small' | 'medium' | 'large';
  };
  filters?: string[];
  timestamp: number;
}

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  preview: string;
  duration: number;
}

export function StoryUploadView({ isOpen, onClose, onUpload, preSelectedImage }: StoryUploadViewProps) {
  const [selectedImage, setSelectedImage] = useState(preSelectedImage || '');
  const [caption, setCaption] = useState('');
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null);
  const [textOverlay, setTextOverlay] = useState('');
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // AI-suggested music based on image content
  const suggestedMusic: MusicTrack[] = [
    {
      id: '1',
      title: 'Dreamy Vibes',
      artist: 'Chill Studio',
      genre: 'Lo-Fi',
      mood: 'Relaxed',
      preview: '/audio/dreamy-vibes.mp3', // Mock URL
      duration: 30
    },
    {
      id: '2',
      title: 'City Lights',
      artist: 'Urban Beats',
      genre: 'Electronic',
      mood: 'Energetic',
      preview: '/audio/city-lights.mp3', // Mock URL
      duration: 30
    },
    {
      id: '3',
      title: 'Golden Hour',
      artist: 'Nature Sounds',
      genre: 'Ambient',
      mood: 'Peaceful',
      preview: '/audio/golden-hour.mp3', // Mock URL
      duration: 30
    },
    {
      id: '4',
      title: 'Adventure Awaits',
      artist: 'Epic Journeys',
      genre: 'Cinematic',
      mood: 'Inspiring',
      preview: '/audio/adventure-awaits.mp3', // Mock URL
      duration: 30
    },
    {
      id: '5',
      title: 'Midnight Groove',
      artist: 'Jazz Collective',
      genre: 'Jazz',
      mood: 'Sophisticated',
      preview: '/audio/midnight-groove.mp3', // Mock URL
      duration: 30
    },
    {
      id: '6',
      title: 'Summer Breeze',
      artist: 'Acoustic Vibes',
      genre: 'Acoustic',
      mood: 'Happy',
      preview: '/audio/summer-breeze.mp3', // Mock URL
      duration: 30
    }
  ];

  const generateImageFromCamera = async () => {
    // Simulate camera capture - in real app would use camera API
    try {
      const newImage = await unsplash_tool({ query: 'photography moment capture' });
      setSelectedImage(newImage);
    } catch (error) {
      console.error('Failed to capture image:', error);
    }
  };

  const selectImageFromGallery = async () => {
    // Simulate image selection - in real app would use file picker
    try {
      const newImage = await unsplash_tool({ query: 'aesthetic photo gallery' });
      setSelectedImage(newImage);
    } catch (error) {
      console.error('Failed to select image:', error);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      const story: StoryData = {
        id: Date.now().toString(),
        image: selectedImage,
        caption,
        music: selectedMusic || undefined,
        textOverlay: textOverlay ? {
          text: textOverlay,
          color: '#ffffff',
          position: { x: 50, y: 50 },
          size: 'medium'
        } : undefined,
        timestamp: Date.now()
      };

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
      onUpload(story);
      onClose();
    } catch (error) {
      console.error('Failed to upload story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMusic = (track: MusicTrack) => {
    if (selectedMusic?.id === track.id) {
      setSelectedMusic(null);
      setIsPlaying(false);
    } else {
      setSelectedMusic(track);
      setIsPlaying(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background */}
        <LiquidEtherBackground variant="stories" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
            <h1 className="text-white font-semibold">Create Story</h1>
            <Button
              onClick={handleUpload}
              disabled={!selectedImage || isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
            >
              {isLoading ? (
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                'Share'
              )}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="absolute top-16 left-0 right-0 bottom-0 flex flex-col">
          {/* Image Selection */}
          {!selectedImage ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <motion.button
                    onClick={generateImageFromCamera}
                    className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="w-8 h-8" />
                  </motion.button>
                  <p className="text-white font-medium">Take Photo</p>
                </div>

                <div className="text-white/60">or</div>

                <div className="space-y-4">
                  <motion.button
                    onClick={selectImageFromGallery}
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ImageIcon className="w-8 h-8" />
                  </motion.button>
                  <p className="text-white font-medium">Choose from Gallery</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Image Preview */}
              <div className="flex-1 relative">
                <div className="w-full h-full relative">
                  <ImageWithFallback
                    src={selectedImage}
                    alt="Story"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Text Overlay */}
                  {textOverlay && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-lg px-4 py-2">
                        <p className="text-white font-semibold text-lg">{textOverlay}</p>
                      </div>
                    </div>
                  )}

                  {/* Music Indicator */}
                  {selectedMusic && (
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md rounded-full px-3 py-2 flex items-center space-x-2">
                      <Music className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">{selectedMusic.title}</span>
                      {isPlaying ? (
                        <motion.div
                          className="w-3 h-3 bg-white rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      ) : (
                        <div className="w-3 h-3 bg-white/60 rounded-full" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="bg-black/80 backdrop-blur-md p-4 space-y-4">
                {/* Caption */}
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Add a caption..."
                  className="bg-white/5 border-white/10 text-white placeholder-white/50"
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => setShowMusicSelector(!showMusicSelector)}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Music className="w-5 h-5 text-white" />
                      <span className="text-white text-sm font-medium">Music</span>
                    </motion.button>

                    <motion.button
                      onClick={() => setShowTextEditor(!showTextEditor)}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Type className="w-5 h-5 text-white" />
                      <span className="text-white text-sm font-medium">Text</span>
                    </motion.button>
                  </div>

                  <Button
                    onClick={() => setSelectedImage('')}
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    Change Photo
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Music Selector Modal */}
        <AnimatePresence>
          {showMusicSelector && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md rounded-t-3xl border-t border-white/10 max-h-96 overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Choose Music</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMusicSelector(false)}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-3 max-h-64 overflow-auto">
                  {suggestedMusic.map((track) => (
                    <motion.div
                      key={track.id}
                      onClick={() => toggleMusic(track)}
                      className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all ${
                        selectedMusic?.id === track.id 
                          ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{track.title}</p>
                        <p className="text-white/60 text-sm">{track.artist} • {track.genre}</p>
                        <p className="text-white/40 text-xs">{track.mood}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedMusic?.id === track.id && isPlaying ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Editor Modal */}
        <AnimatePresence>
          {showTextEditor && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md rounded-t-3xl border-t border-white/10"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Add Text</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTextEditor(false)}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    value={textOverlay}
                    onChange={(e) => setTextOverlay(e.target.value)}
                    placeholder="Enter your text..."
                    className="bg-white/5 border-white/10 text-white placeholder-white/50"
                  />

                  <div className="flex items-center justify-between">
                    <Button
                      onClick={() => setShowTextEditor(false)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}