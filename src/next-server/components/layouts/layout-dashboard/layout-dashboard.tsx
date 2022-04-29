import { ReactNode } from "react";

export default function LayoutDashboard({
 gridRight = null,
 gridLeft = null,
}: {
 gridRight: ReactNode;
 gridLeft: ReactNode;
}) {
 return (
  <div className="bg-whiter min-h-screen">
   <div className="flex flex-row">
    <div className="w-1/3">{gridLeft}</div>
    <div className="w-2/3">{gridRight}</div>
   </div>
  </div>
 );
}
