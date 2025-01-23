import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import type { IconType } from "react-icons/lib";

interface SkillCardProps {
  Icon: IconType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
}

export default function SkillsCard({
  Icon,
  name,
  description,
  color,
  bgColor,
}: SkillCardProps) {
  return (
    <Card
      className="w-full transition-all hover:shadow-lg bg-card/20 border-border hover:border-gray-600
    hover:bg-card"
    >
      <CardContent className="py-3 pr-8">
        <div className="flex items-start gap-3">
          <div
            className={"rounded p-2"}
            style={{ color: color.trim(), backgroundColor: bgColor.trim() }}
          >
            {typeof Icon === "string" ? (
              <Image
                src={Icon}
                alt={name}
                width={40}
                height={40}
                layout="fixed"
              />
            ) : (
              <Icon size={40} />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
