import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
  onClick?: () => void;
  label?: string;
  className?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({ onClick, label = 'Back', className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handle = () => {
    if (onClick) return onClick();

    // Public routes: fall back to browser back behavior
    const publicRoutes = ['/', '/auth/callback'];
    if (publicRoutes.includes(location.pathname)) {
      navigate(-1);
      return;
    }

    // Default: go to dashboard for authenticated sub-pages
    navigate('/dashboard');
  };

  return (
    <button
      onClick={handle}
      aria-label={label}
      className={`inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-accent/5 transition ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
