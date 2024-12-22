import React, { useEffect, useRef, useState } from 'react';

const TurnstileCaptcha = ({ onSuccess }) => {
  const captchaRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    const loadTurnstileScript = () => {
      if (!window.turnstile) {
        const script = document.createElement('script');
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setIsLoaded(true); 
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
            sitekey: '0x4AAAAAAA1owqTEEqPaT6XY', 
            callback: (token) => {
              
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
        <p>Loading CAPTCHA...</p> 
      )}
    </div>
  );
};

export default TurnstileCaptcha;
