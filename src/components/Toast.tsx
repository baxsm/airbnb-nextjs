import { ToastIcons } from "./Icons";
import { cn } from "@/libs/utils";
import { HTMLAttributes, SVGProps } from "react";
import hotToast, { Toaster as HotToaster } from "react-hot-toast";

export const Toaster = HotToaster;

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

export function Toast({ visible, className, ...props }: ToastProps) {
  return (
    <div
      className={cn(
        "min-h-16 mb-2 flex w-[350px] flex-row items-center gap-4 rounded-md bg-white px-6 py-4 shadow-lg",
        visible && "animate-in slide-in-from-bottom-5",
        className
      )}
      {...props}
    />
  );
}

interface ToastIconProps extends Partial<SVGProps<SVGSVGElement>> {
  type: keyof typeof ToastIcons;
}

Toast.Icon = function ToastIcon({ type, className, ...props }: ToastIconProps) {
  const Icon = ToastIcons[type];

  if (!Icon) {
    return null;
  }

  return (
    <div className="flex items-center justify-center rounded-full">
      <Icon className={cn("text-xl text-white", className)} {...props} />
    </div>
  );
};

interface ToastTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

Toast.Title = function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <p className={cn("text-sm font-medium", className)} {...props} />;
};

interface ToastDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

Toast.Description = function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return <p className={cn("text-sm opacity-80", className)} {...props} />;
};

interface ToastOpts {
  title?: string;
  message: string;
  type?: "success" | "error" | "default";
  duration?: number;
  icon?: keyof typeof ToastIcons;
}

export function toast(opts: ToastOpts) {
  const {
    title,
    message,
    type = "default",
    duration = 3000,
    icon = type,
  } = opts;

  return hotToast.custom(
    ({ visible }) => (
      <Toast
        visible={visible}
        className={cn({
          "bg-red-600 text-white": type === "error",
          "bg-green-600 text-white": type === "success",
          "bg-gray-950 bg-opacity-70 text-white": type === "default",
        })}
      >
        <Toast.Icon type={icon} />
        <div className="flex flex-col justify-center">
          <Toast.Title>{title}</Toast.Title>
          {message && <Toast.Description>{message}</Toast.Description>}
        </div>
      </Toast>
    ),
    { duration }
  );
}
