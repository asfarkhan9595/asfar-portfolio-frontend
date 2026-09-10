import { ChevronDown } from 'lucide-react';

export default function ArchitectureDiagram({ layers }) {
  if (!layers || layers.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-0">
      {layers.map((layer, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="min-w-[200px] max-w-[280px] rounded-lg border border-slate-200 bg-white p-4 text-center dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {layer.label}
            </p>
            {layer.description && (
              <p className="mt-1 text-xs text-slate-500">{layer.description}</p>
            )}
          </div>
          {i < layers.length - 1 && (
            <div className="py-1 text-emerald-500">
              <ChevronDown className="h-5 w-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
