import { CircleDashed } from "lucide-react";

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <CircleDashed size={48} className="animate-spin" />
  </div>
);

export default Loading;