import classes from "./avatar.module.css";
import Image, { ImageProps } from "next/image";
import { join } from "@bot-messages/util-shared";

const sizes = {
 sm: { width: 35, height: 35 },
 md: { width: 100, height: 100 },
 lg: { width: 300, height: 300 },
 mini: { width: 22, height: 22 },
};

export default function Avatar({
 className = "",
 size = "md",
 ...props
}: ImageProps & {
 size?: keyof typeof sizes;
}) {
 const { width, height } = sizes[size];
 return (
  <Image
   alt="avatar user"
   width={width}
   height={height}
   {...props}
   className={join(classes.avatar, className)}
  />
 );
}
