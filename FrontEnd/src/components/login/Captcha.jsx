import React, { useEffect, useRef, useState } from 'react';

const TurnstileCaptcha = ({ onSuccess }) => {
  const captchaRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); // Track if Turnstile has loaded

  useEffect(() => {
    const loadTurnstileScript = () => {
      if (!window.turnstile) {
        const script = document.createElement('script');
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setIsLoaded(true); // Set loaded to true once the script is loaded
          renderCaptcha();
        };
        script.onerror = () => {
          console.error('Failed to load Turnstile script.');
        };
        document.body.appendChild(script);
      } else {
        renderCaptcha();
      }
    };

    const renderCaptcha = () => {
      if (captchaRef.current && window.turnstile) {
        try {
          window.turnstile.render(captchaRef.current, {
            sitekey: '0x4AAAAAAA1owqTEEqPaT6XY', // Replace with your Turnstile Site Key
            callback: (token) => {
              // Ensure onSuccess is a function before calling it
              if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(token);
              } else {
                console.error('onSuccess is not a valid function');
              }
            },
          });
        } catch (error) {
          console.error('Error rendering Turnstile CAPTCHA:', error);
        }
      }
    };

    loadTurnstileScript();

    return () => {
      // Cleanup script if component unmounts
      const script = document.querySelector(`script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]`);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [onSuccess]);

  return (
    <div>
      {isLoaded ? (
        <div ref={captchaRef} className="turnstile-widget"></div>
      ) : (
        <p>Loading CAPTCHA...</p> // Show loading message if Turnstile is not yet loaded
      )}
    </div>
  );
};

export default TurnstileCaptcha;
