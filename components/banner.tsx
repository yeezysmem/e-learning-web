import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-[#FFC265] border-[#E1A851] text-primary font-medium",
        success: "bg-green-400 border-green-500 text-green-900 font-medium",
        error: "bg-[#FF6B6B] border-[#E15353] text-primary font-medium",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
  error: AlertTriangle,
};

export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(
      bannerVariants({ variant }),
      "fixed bottom-0 left-0 w-full z-50" // Позиціонування банера
    )}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};
