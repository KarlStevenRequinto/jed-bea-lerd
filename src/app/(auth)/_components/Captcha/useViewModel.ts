import { useEffect, useRef, useState, useCallback } from "react";

export const useCaptchaViewModel = (onCaptchaIdChange?: (captchaId: string) => void) => {
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw CAPTCHA on canvas with visual styling matching Figma
  const drawCaptcha = useCallback((code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas ref not available");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("Canvas context not available");
      return;
    }

    console.log("Drawing CAPTCHA:", code);

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background - light gray with gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#e6e6e6");
    gradient.addColorStop(0.5, "#ebebeb");
    gradient.addColorStop(1, "#e0e0e0");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add heavier noise for texture
    for (let i = 0; i < 12000; i++) {
      const grayValue = 180 + Math.random() * 75;
      ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${Math.random() * 0.4})`;
      const size = Math.random() * 2;
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        size,
        size
      );
    }

    // Draw CAPTCHA text with more variation
    const characters = code.split("");
    const totalWidth = width * 0.85;
    const startX = width * 0.075;
    const charSpacing = totalWidth / characters.length;

    // Random fonts for more abstract look
    const fonts = [
      "'Georgia', serif",
      "'Times New Roman', serif",
      "'Courier New', monospace",
      "'Arial', sans-serif",
      "'Verdana', sans-serif"
    ];

    characters.forEach((char, index) => {
      const x = startX + charSpacing * index + charSpacing / 2;
      const baseY = height / 2;
      const y = baseY + (Math.random() - 0.5) * 30; // More vertical variation

      ctx.save();
      ctx.translate(x, y);

      // More rotation for difficulty
      const rotation = (Math.random() - 0.5) * 0.5;
      ctx.rotate(rotation);

      // Random font and size for each character
      const fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
      const fontSize = 85 + Math.random() * 25; // Random size between 85-110
      ctx.font = `bold ${fontSize}px ${fontFamily}`;

      const grayShade = 70 + Math.random() * 30;
      ctx.fillStyle = `rgb(${grayShade}, ${grayShade}, ${grayShade})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 2 + Math.random() * 2;
      ctx.strokeStyle = `rgba(${grayShade + 20}, ${grayShade + 20}, ${grayShade + 20}, 0.7)`;

      // Draw with outline and slight blur effect
      ctx.strokeText(char, 0, 0);
      ctx.fillText(char, 0, 0);

      // Add ghosting effect
      ctx.globalAlpha = 0.15;
      ctx.fillText(char, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
      ctx.globalAlpha = 1.0;

      ctx.restore();
    });

    // Add more complex distortion lines
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 2;

    // Horizontal wavy lines
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${80 + Math.random() * 40}, ${80 + Math.random() * 40}, ${80 + Math.random() * 40}, 0.5)`;
      const startY = Math.random() * height;
      ctx.moveTo(0, startY);

      for (let x = 0; x < width; x += 10) {
        const y = startY + Math.sin(x / 25 + Math.random() * 2) * 15;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Add curved lines that cross the text
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${90 + Math.random() * 30}, ${90 + Math.random() * 30}, ${90 + Math.random() * 30}, 0.4)`;
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height
      );
      ctx.stroke();
    }

    ctx.globalAlpha = 1.0;
  }, []);

  // Fetch new CAPTCHA from API
  const fetchCaptcha = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/captcha/generate");

      if (!response.ok) {
        console.error("CAPTCHA API returned error status:", response.status);
        // Fallback to a simple code if API fails
        const fallbackCode = "ABC123";
        setCaptchaCode(fallbackCode);
        setCaptchaId("fallback-" + Date.now());
        return;
      }

      const data = await response.json();
      setCaptchaCode(data.code);
      setCaptchaId(data.captchaId);

      // Notify parent component of new captcha ID
      if (onCaptchaIdChange) {
        onCaptchaIdChange(data.captchaId);
      }
    } catch (error) {
      console.error("Error fetching CAPTCHA:", error);
      // Fallback to a simple code if API fails
      const fallbackCode = "ABC123";
      setCaptchaCode(fallbackCode);
      setCaptchaId("fallback-" + Date.now());
    } finally {
      setIsLoading(false);
    }
  }, [onCaptchaIdChange]);

  // Load CAPTCHA on mount
  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  // Draw captcha whenever code changes and canvas is ready
  useEffect(() => {
    if (captchaCode && canvasRef.current) {
      // Small delay to ensure canvas is fully rendered
      setTimeout(() => {
        drawCaptcha(captchaCode);
      }, 10);
    }
  }, [captchaCode, drawCaptcha]);

  // Handle refresh button click
  const handleRefresh = () => {
    fetchCaptcha();
  };

  return {
    captchaCode,
    captchaId,
    isLoading,
    canvasRef,
    handleRefresh,
  };
};
