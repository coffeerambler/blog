import { Badge } from "@/components/ui/badge";
import { statusLabel, type PublishStatus } from "@/lib/publish";

const CLASS: Record<PublishStatus, string> = {
  draft: "border-white/20 bg-transparent text-cream/70",
  in_review: "border-amber/50 bg-amber/15 text-amber",
  approved: "border-amber/30 bg-amber text-background",
};

export function AdminStatusBadge({ status }: { status: PublishStatus }) {
  return (
    <Badge variant="outline" className={CLASS[status]}>
      {statusLabel(status)}
    </Badge>
  );
}
