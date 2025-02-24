import { Button } from '@workspace/ui/components/button';

interface SocialButtonProps {
  readonly icon: React.ReactNode;
  readonly text: string;
  readonly onClick?: () => void;
}

export default function SocialButton({ icon, text, onClick }: SocialButtonProps) {
  return (
    <Button variant="outline" className="w-full" onClick={onClick}>
      <span className="w-5 h-5 mr-2">{icon}</span>
      {text}
    </Button>
  );
}
