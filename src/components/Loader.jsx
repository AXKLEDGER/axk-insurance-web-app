'use client';

// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

// ==============================|| Elegant AxkInsurance Loader (Dynamic Theme) ||============================== //

export default function Loader({ message = 'Loading...' }) {
  const theme = useTheme();
  const [dots, setDots] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setDots(newDots);

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(to bottom, rgba(30, 30, 30, 0.85), rgba(0, 0, 0, 0.7))'
        : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(240, 240, 240, 0.7))',
      backdropFilter: 'blur(12px)',
      zIndex: 2001,
    },
    dot: {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(42, 161, 175, 0.4)'
        : 'rgba(42, 161, 175, 0.7)',
    },
    mainContent: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px',
      borderRadius: '16px',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(to bottom, #1F2937, #111827)'
        : 'linear-gradient(to bottom, #FFFFFF, #F0F0F0)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 4px 20px rgba(0, 0, 0, 0.3)'
        : '0 4px 20px rgba(200, 200, 200, 0.3)',
    },
    spinnerContainer: {
      position: 'relative',
      width: '96px',
      height: '96px',
    },
    spinnerRing: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      border: '4px solid transparent',
    },
    outerRing: {
      borderTopColor: '#2aa1af',
      animation: 'spin 1.6s linear infinite',
    },
    middleRing: {
      inset: '8px',
      borderTopColor: '#3cbbc9',
      animation: 'spinReverse 1.4s linear infinite',
    },
    innerRing: {
      inset: '16px',
      borderTopColor: '#1d8a97',
      animation: 'bounce 1.3s ease-in-out infinite',
    },
    centerPulse: {
      position: 'absolute',
      inset: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #2aa1af, #3cbbc9)',
      animation: 'pulse 1.8s ease-in-out infinite',
    },
    progressBar: {
      marginTop: '24px',
      width: '160px',
      height: '6px',
      backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB',
      borderRadius: '999px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #2aa1af, #3cbbc9, #1d8a97)',
      transition: 'width 0.3s ease-out',
    },
    message: {
      marginTop: '16px',
      fontSize: '20px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #2aa1af, #3cbbc9)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subText: {
      marginTop: '8px',
      color: theme.palette.text.secondary,
      fontSize: '14px',
      animation: 'pulse 2s ease-in-out infinite',
    },
  };

  return (
    <div style={styles.container}>
      {dots.map((dot) => (
        <div
          key={dot.id}
          style={{
            ...styles.dot,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animation: `float ${dot.speed}s infinite ease-in-out ${dot.delay}s`,
          }}
        />
      ))}

      <div style={styles.mainContent}>
        <div style={styles.spinnerContainer}>
          <div style={{ ...styles.spinnerRing, ...styles.outerRing }} />
          <div style={{ ...styles.spinnerRing, ...styles.middleRing }} />
          <div style={{ ...styles.spinnerRing, ...styles.innerRing }} />
          <div style={styles.centerPulse} />
        </div>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`,
            }}
          />
        </div>

        <div style={styles.message}>{message}</div>
        <div style={styles.subText}>Preparing your AxkInsurance experience...</div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(0.95); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}