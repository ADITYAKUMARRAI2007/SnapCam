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
    <div className="absolute bottom-0 left-0 right-0 glass-nav android-nav-bar-fix">
      <div className="flex items-center justify-around py-4 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          const isCamera = tab.id === 'camera';

          return (
            <button
              key={tab.id}
              className={`flex flex-col items-center p-3 min-h-[56px] min-w-[56px] rounded-xl transition-all duration-200 ${
                isCamera 
                  ? 'gradient-primary text-white shadow-modern-sm'
                  : isActive 
                    ? 'text-white bg-white/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={`w-6 h-6 ${isCamera ? 'text-white' : ''}`} />
              
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