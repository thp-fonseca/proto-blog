import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@workspace/ui/components/card";

export interface ProfileCardProps {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  onEdit?: () => void;
}

export default function ProfileCard({
  name,
  email,
  avatar,
  bio = "No bio provided",
  skills = [],
  onEdit,
}: Readonly<ProfileCardProps>) {
  if (!name ||!email) return (<>
    <h1>User not Found!</h1>
  </>);
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={avatar ?? "/placeholder.svg?height=64&width=64"}
            alt={`${name}'s avatar`}
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{bio}</p>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {onEdit && (
          <Button onClick={onEdit} className="w-full mt-4">
            Edit Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
