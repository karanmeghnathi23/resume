import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const DialogOverlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => (
  <div 
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-100",
      className
    )} 
    {...props} 
  />
);

const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement> & { onClose?: () => void }> = ({ 
  className, 
  children, 
  onClose,
  ...props 
}) => (
  <div 
    className={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
      className
    )} 
    {...props}
  >
    {children}
    {onClose && (
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    )}
  </div>
);

const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => (
  <div 
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )} 
    {...props} 
  />
);

const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => (
  <div 
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )} 
    {...props} 
  />
);

const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ 
  className, 
  ...props 
}) => (
  <h3 
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )} 
    {...props} 
  />
);

const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  className, 
  ...props 
}) => (
  <p 
    className={cn(
      "text-sm text-muted-foreground",
      className
    )} 
    {...props} 
  />
);

const Dialog: React.FC<DialogProps> = ({
  open = false,
  onClose,
  children,
}) => {
  if (!open) return null;
  
  return (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContent onClose={onClose}>
        {children}
      </DialogContent>
    </>
  );
};

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
};