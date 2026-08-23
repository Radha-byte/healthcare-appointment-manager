import { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white border border-dashed border-slate-300 rounded-2xl">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <Icon size={22} className="text-slate-400" />
      </div>
      <p className="font-medium text-slate-900 mb-1">{title}</p>
      <p className="text-sm text-slate-500 max-w-xs">{description}</p>
    </div>
  );
}