
import './play-button.css';

interface PlayButtonProps {
  className?: string;
}
export default function PlayButton({className}: PlayButtonProps) {
  return (<svg viewBox="0 0 100 100" className={`play-button ${className}`}>
    <polygon points="8,0 92,50 8,100" className="triangle"></polygon>
    <polygon points="20,8 40,8 40,92 20,92" className="pauseboxes"></polygon>
    <polygon points="60,8 80,8 80,92 60,92" className="pauseboxes"></polygon>
  </svg>)
}
