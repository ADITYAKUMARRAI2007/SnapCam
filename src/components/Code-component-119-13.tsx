import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface LiquidEtherBackgroundProps {
  variant?: 'feed' | 'map' | 'profile' | 'chat' | 'camera' | 'settings' | 'friends' | 'stories';
  className?: string;
}

export function LiquidEtherBackground({ variant = 'feed', className = '' }: LiquidEtherBackgroundProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'feed':
        return {
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 60% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #0f172a 100%)
          `,
          backgroundSize: '400% 400%, 300% 300%, 500% 500%, 350% 350%, 100% 100%'
        };
      case 'map':
        return {
          background: `
            radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #1a2e1a 0%, #1e3a8a 25%, #065f46 50%, #1a2e1a 100%)
          `,
          backgroundSize: '450% 450%, 350% 350%, 400% 400%, 300% 300%, 100% 100%'
        };
      case 'profile':
        return {
          background: `
            radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 10% 10%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #1e1b4b 0%, #581c87 25%, #be185d 50%, #1e1b4b 100%)
          `,
          backgroundSize: '380% 380%, 420% 420%, 350% 350%, 400% 400%, 100% 100%'
        };
      case 'chat':
        return {
          background: `
            radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 45% 55%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #064e3b 0%, #1e3a8a 25%, #0c4a6e 50%, #064e3b 100%)
          `,
          backgroundSize: '420% 420%, 380% 380%, 450% 450%, 320% 320%, 100% 100%'
        };
      case 'camera':
        return {
          background: `
            radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 60% 40%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #451a03 0%, #7c2d12 25%, #991b1b 50%, #451a03 100%)
          `,
          backgroundSize: '360% 360%, 400% 400%, 380% 380%, 340% 340%, 100% 100%'
        };
      case 'settings':
        return {
          background: `
            radial-gradient(circle at 35% 65%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 65% 35%, rgba(75, 85, 99, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 90% 90%, rgba(107, 114, 128, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #1f2937 0%, #374151 25%, #4b5563 50%, #1f2937 100%)
          `,
          backgroundSize: '390% 390%, 360% 360%, 410% 410%, 350% 350%, 100% 100%'
        };
      case 'friends':
        return {
          background: `
            radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 10% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #581c87 0%, #be185d 25%, #1e40af 50%, #581c87 100%)
          `,
          backgroundSize: '400% 400%, 370% 370%, 390% 390%, 360% 360%, 100% 100%'
        };
      case 'stories':
        return {
          background: `
            radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #7c2d12 0%, #be185d 25%, #7c3aed 50%, #7c2d12 100%)
          `,
          backgroundSize: '350% 350%, 410% 410%, 380% 380%, 400% 400%, 100% 100%'
        };
      default:
        return {
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e1b4b 25%, #312e81 50%, #0f172a 100%)
          `,
          backgroundSize: '400% 400%, 300% 300%, 500% 500%, 100% 100%'
        };
    }
  };

  const styles = getVariantStyles();

  // Add CSS animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes liquidEther {
        0%, 100% {
          background-position: 0% 50%, 0% 50%, 0% 50%, 0% 50%, 0% 0%;
        }
        25% {
          background-position: 25% 75%, 50% 25%, 75% 50%, 100% 0%, 0% 0%;
        }
        50% {
          background-position: 100% 100%, 100% 75%, 50% 100%, 0% 100%, 0% 0%;
        }
        75% {
          background-position: 75% 25%, 50% 75%, 25% 50%, 50% 50%, 0% 0%;
        }
      }
      
      @keyframes liquidEtherSlow {
        0%, 100% {
          background-position: 0% 50%, 0% 50%, 0% 50%, 0% 50%, 0% 0%;
        }
        33% {
          background-position: 30% 70%, 70% 30%, 50% 80%, 80% 20%, 0% 0%;
        }
        66% {
          background-position: 70% 30%, 30% 70%, 80% 50%, 20% 80%, 0% 0%;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <>
      {/* Main liquid ether background */}
      <motion.div
        className={`absolute inset-0 opacity-90 ${className}`}
        style={{
          ...styles,
          animation: 'liquidEther 25s ease-in-out infinite',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 2 }}
      />
      
      {/* Secondary slower moving layer for depth */}
      <motion.div
        className={`absolute inset-0 opacity-60 ${className}`}
        style={{
          background: `
            radial-gradient(circle at 60% 40%, rgba(139, 92, 246, 0.2) 0%, transparent 70%),
            radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)
          `,
          backgroundSize: '200% 200%, 150% 150%',
          animation: 'liquidEtherSlow 35s ease-in-out infinite reverse',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 3, delay: 0.5 }}
      />
      
      {/* Overlay for contrast */}
      <div className={`absolute inset-0 bg-black/20 ${className}`} />
    </>
  );
}