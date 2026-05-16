import { Crown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProRequired({
  unlocked = false,
}: {
  unlocked?: boolean;
}) {
  // const showTooltip = required && !unlocked;

  const icon = (
    <Crown size={16} className={!unlocked ? "text-yellow-300" : ""} />
  );

  // if (!showTooltip) {
  //   return icon;
  // }
  //
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex cursor-pointer">{icon}</span>
        </TooltipTrigger>

        <TooltipContent>
          <p>Pro plan required</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
