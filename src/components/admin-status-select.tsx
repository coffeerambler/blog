import { cn } from "@/lib/utils";
import { PUBLISH_STATUSES, statusLabel, type PublishStatus } from "@/lib/publish";

export function AdminStatusSelect({
  name = "status",
  defaultValue,
  value,
  onChange,
  id = "status",
}: {
  name?: string;
  defaultValue?: PublishStatus;
  value?: PublishStatus;
  onChange?: (status: PublishStatus) => void;
  id?: string;
}) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={value ? undefined : defaultValue}
      value={value}
      onChange={onChange ? (event) => onChange(event.target.value as PublishStatus) : undefined}
      className={cn(
        "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-cream shadow-xs outline-none",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
      )}
    >
      {PUBLISH_STATUSES.map((status) => (
        <option key={status} value={status} className="bg-background text-cream">
          {statusLabel(status)}
        </option>
      ))}
    </select>
  );
}
