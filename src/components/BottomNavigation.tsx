import React from 'react';
import { Home, MapIcon, Camera, Users, User, Search, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userStreak?: number;
  userLevel?: number;
  userPoints?: number;
}

const tabs = [
  { id: 'feed', icon: Home, label: 'Home' },
  { id: 'friends', icon: Search, label: 'Search' },
  { id: 'camera', icon: Plus, label: 'Create' },
  { id: 'map', icon: MapIcon, label: 'Map' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNavigation({ currentTab, onTabChange, userStreak = 0, userLevel = 1, userPoints = 0 }: BottomNavigationProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-gray-800 android-nav-bar-fix">
      <div className="flex items-center justify-around py-4 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          const isCamera = tab.id === 'camera';

          return (
            <button
              key={tab.id}
              className={`flex flex-col items-center p-3 min-h-[56px] min-w-[56px] ${
                isCamera 
                  ? 'bg-white text-black rounded-lg'
                  : isActive 
                    ? 'text-white' 
                    : 'text-gray-500'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={`w-6 h-6 ${isCamera ? 'text-black' : ''}`} />
              
              {!isCamera && (
                <span className="text-xs mt-1 font-medium">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}