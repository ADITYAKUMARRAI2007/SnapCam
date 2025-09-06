import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Plus, Navigation, Search, Filter, Users, Compass, Home, Clock, UserPlus, Settings, Map, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Pin {
  id: string;
  x: number;
  y: number;
  image: string;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: number;
  author: string;
  authorAvatar: string;
  timestamp: number;
  isStory?: boolean;
}

interface MapViewProps {
  onCameraClick: () => void;
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
  userStreak?: number;
  onSettingsClick?: () => void;
}

interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  location: { x: number; y: number };
  isOnline: boolean;
  lastSeen: string;
  activity: string;
  badge?: string;
}

interface Place {
  id: string;
  name: string;
  category: string;
  location: { x: number; y: number };
  rating?: number;
  isTopPick?: boolean;
}

export function MapView({ onCameraClick, pins, onPinClick, userStreak = 0, onSettingsClick }: MapViewProps) {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [activeTab, setActiveTab] = useState<'memories' | 'visited' | 'popular' | 'favorites'>('memories');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [centerLocation, setCenterLocation] = useState({ x: 50, y: 50 });

  // Liquid ether animation styles
  const liquidEtherStyles = {
    background: `
      radial-gradient(circle at 20% 80%, rgba(120, 62, 255, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 100%)
    `,
    backgroundSize: '400% 400%, 300% 300%, 200% 200%, 100% 100%',
    animation: 'liquidEther 20s ease-in-out infinite',
  };

  const [friends] = useState<Friend[]>([
    {
      id: '1',
      username: 'alexandra_dreams',
      displayName: 'Alexandra',
      avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXIlMjBwcm9maWxlfGVufDF8fHx8MTc1Njc4MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: { x: 35, y: 25 },
      isOnline: true,
      lastSeen: '2m ago',
      activity: 'Downtown Coffee',
      badge: 'Top Pick'
    },
    {
      id: '2',
      username: 'cosmic_wanderer',
      displayName: 'Cosmic',
      avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXIlMjBwcm9maWxlfGVufDF8fHx8MTc1Njc4MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: { x: 70, y: 60 },
      isOnline: false,
      lastSeen: '1h ago',
      activity: 'Sunset Hills'
    },
    {
      id: '3',
      username: 'urban_explorer',
      displayName: 'Street Artist',
      avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXIlMjBwcm9maWxlfGVufDF8fHx8MTc1Njc4MTIzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: { x: 65, y: 80 },
      isOnline: true,
      lastSeen: 'now',
      activity: 'Art District',
      badge: 'Top Pick'
    }
  ]);

  const [places] = useState<Place[]>([
    {
      id: '1',
      name: 'Meghana Foods',
      category: 'Restaurant',
      location: { x: 20, y: 55 },
      isTopPick: true
    },
    {
      id: '2',
      name: 'MS Ecity Mall',
      category: 'Shopping',
      location: { x: 75, y: 65 },
      isTopPick: true
    },
    {
      id: '3',
      name: 'ES University',
      category: 'Education',
      location: { x: 55, y: 45 },
      isTopPick: true
    },
    {
      id: '4',
      name: 'Frozen Bean',
      category: 'Cafe',
      location: { x: 40, y: 70 }
    },
    {
      id: '5',
      name: 'Polar Bear',
      category: 'Restaurant',
      location: { x: 25, y: 75 },
      isTopPick: true
    }
  ]);

  const handlePinClick = (pin: Pin) => {
    setSelectedPin(pin);
    onPinClick(pin);
  };

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  // Add CSS animation for liquid ether
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes liquidEther {
        0%, 100% {
          background-position: 0% 50%, 0% 50%, 0% 50%, 0% 0%;
        }
        25% {
          background-position: 25% 75%, 50% 25%, 75% 50%, 0% 0%;
        }
        50% {
          background-position: 100% 100%, 100% 75%, 50% 100%, 0% 0%;
        }
        75% {
          background-position: 75% 25%, 50% 75%, 25% 50%, 0% 0%;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Satellite Map Background - Realistic satellite view */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="satellite" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
                  <!-- Base satellite terrain -->
                  <rect width="300" height="300" fill="#2a3f3a"/>
                  
                  <!-- Roads -->
                  <path d="M0,150 L300,150" stroke="#4a5568" stroke-width="3"/>
                  <path d="M150,0 L150,300" stroke="#4a5568" stroke-width="2"/>
                  <path d="M0,75 L300,75" stroke="#4a5568" stroke-width="1.5"/>
                  <path d="M0,225 L300,225" stroke="#4a5568" stroke-width="1.5"/>
                  <path d="M75,0 L75,300" stroke="#4a5568" stroke-width="1"/>
                  <path d="M225,0 L225,300" stroke="#4a5568" stroke-width="1"/>
                  
                  <!-- Buildings -->
                  <rect x="60" y="60" width="30" height="40" fill="#1a202c" opacity="0.8"/>
                  <rect x="200" y="80" width="25" height="35" fill="#1a202c" opacity="0.8"/>
                  <rect x="140" y="200" width="35" height="30" fill="#1a202c" opacity="0.8"/>
                  <rect x="250" y="180" width="20" height="45" fill="#1a202c" opacity="0.8"/>
                  <rect x="40" y="220" width="40" height="25" fill="#1a202c" opacity="0.8"/>
                  
                  <!-- Parks/Green areas -->
                  <circle cx="120" cy="120" r="25" fill="#2d5016" opacity="0.6"/>
                  <circle cx="230" cy="50" r="20" fill="#2d5016" opacity="0.6"/>
                  <circle cx="50" cy="280" r="15" fill="#2d5016" opacity="0.6"/>
                  
                  <!-- Water bodies -->
                  <ellipse cx="200" cy="250" rx="30" ry="15" fill="#1e3a8a" opacity="0.7"/>
                  
                  <!-- Parking lots -->
                  <rect x="100" y="160" width="20" height="15" fill="#374151" opacity="0.9"/>
                  <rect x="180" y="140" width="15" height="20" fill="#374151" opacity="0.9"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#satellite)"/>
            </svg>
          `)})`,
          transform: `scale(${zoomLevel})`,
          transformOrigin: `${centerLocation.x}% ${centerLocation.y}%`
        }}
      />

      {/* Floating Top Banner */}
      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
          <div className="flex items-center justify-between">
            {/* Location and Weather */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-white font-medium text-sm">Bangalore, India</span>
              </div>
              <div className="text-white/60 text-sm">•</div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl">☀️</span>
                <span className="text-white font-medium text-sm">28°C</span>
              </div>
            </div>

            {/* Settings Gear */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettingsClick}
              className="text-white hover:bg-white/10 rounded-full w-8 h-8"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* User Location (Center blue dot like Snapchat) */}
      <motion.div
        className="absolute z-20"
        style={{ 
          left: `${centerLocation.x}%`, 
          top: `${centerLocation.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-12 h-12 bg-blue-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full" />
          </div>
          <motion.div
            className="absolute inset-0 bg-blue-500/30 rounded-full"
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Friends on Map - Snapchat Style Circular Pins */}
      {friends.map((friend) => (
        <motion.div
          key={friend.id}
          className="absolute z-15 cursor-pointer"
          style={{ 
            left: `${friend.location.x}%`, 
            top: `${friend.location.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {/* Colorful Pin Background */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden">
                <ImageWithFallback
                  src={friend.avatar}
                  alt={friend.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Pin Icon Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xs">🔥</span>
            </div>
            
            {/* Online pulse */}
            {friend.isOnline && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-400"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>
      ))}

      {/* Places */}
      {places.map((place) => (
        <motion.div
          key={place.id}
          className="absolute z-10 cursor-pointer"
          style={{ 
            left: `${place.location.x}%`, 
            top: `${place.location.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="relative">
            {/* Place marker */}
            <div className="w-10 h-10 bg-purple-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            
            {/* Top Pick badge */}
            {place.isTopPick && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                Top Pick
              </div>
            )}
            
            {/* Place name */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-lg px-2 py-1 min-w-max">
              <p className="text-white font-medium text-sm">{place.name}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Memory Pins - Different Pin Types */}
      {pins.map((pin, index) => {
        const pinTypes = [
          { color: 'from-orange-500 to-red-500', icon: '🔥' }, // Streak pin
          { color: 'from-yellow-400 to-orange-500', icon: '⭐' }, // Inspo pin
          { color: 'from-blue-500 to-purple-500', icon: '🤝' }, // Duet pin
          { color: 'from-green-500 to-blue-500', icon: '📸' }, // Photo pin
        ];
        const pinType = pinTypes[index % pinTypes.length];
        
        return (
          <motion.div
            key={pin.id}
            className="absolute z-10 cursor-pointer"
            style={{ 
              left: `${pin.x}%`, 
              top: `${pin.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePinClick(pin)}
          >
            <div className="relative">
              {/* Colorful Pin with gradient */}
              <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${pinType.color} p-1 shadow-lg`}>
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={pin.image}
                    alt={pin.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Pin Type Icon */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs">{pinType.icon}</span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Chip Selector Row - Above Bottom Nav */}
      <div className="absolute bottom-20 left-0 right-0 z-30 px-4">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          {['Memories', 'Visited', 'Popular', 'Favorites'].map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase() as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.toLowerCase()
                  ? 'bg-white text-black shadow-lg' 
                  : 'bg-black/60 text-white backdrop-blur-md hover:bg-black/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'Memories' && <Clock className="w-4 h-4" />}
              {tab === 'Visited' && <MapPin className="w-4 h-4" />}
              {tab === 'Popular' && <Users className="w-4 h-4" />}
              {tab === 'Favorites' && <span className="text-red-500">♥</span>}
              <span>{tab}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Rounded Black Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="mx-4 mb-4 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Home */}
            <motion.button
              className="flex flex-col items-center space-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-6 h-6 text-white/60" />
              <span className="text-xs text-white/60">Home</span>
            </motion.button>

            {/* Camera */}
            <motion.button
              onClick={onCameraClick}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera className="w-7 h-7 text-black" />
            </motion.button>

            {/* Map */}
            <motion.button
              className="flex flex-col items-center space-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Map className="w-6 h-6 text-white" />
              <span className="text-xs text-white">Map</span>
            </motion.button>

            {/* Profile */}
            <motion.button
              className="flex flex-col items-center space-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <span className="text-xs text-white/60">Profile</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right Side Floating Buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 flex flex-col space-y-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 bg-black/60 backdrop-blur-md text-white hover:bg-black/80 rounded-full shadow-lg"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 bg-black/60 backdrop-blur-md text-white hover:bg-black/80 rounded-full shadow-lg"
          >
            <Layers className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Pin Details Modal */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-end z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPin(null)}
          >
            <motion.div
              className="w-full bg-black/90 backdrop-blur-md rounded-t-3xl p-6 max-h-80"
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={selectedPin.image}
                    alt={selectedPin.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <ImageWithFallback
                      src={selectedPin.authorAvatar}
                      alt={selectedPin.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-white font-medium">{selectedPin.author}</span>
                    <span className="text-gray-400 text-sm">• {formatTimeAgo(selectedPin.timestamp)}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{selectedPin.caption}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedPin.hashtags.map((tag) => (
                      <span key={tag} className="text-blue-400 text-sm">#{tag}</span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <span>❤️ {selectedPin.likes}</span>
                    <span>💬 {selectedPin.comments}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-4">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}