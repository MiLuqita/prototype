import { TaskStatus } from "@/modules/tasks/types";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: TaskStatus }) {
  const tone = status === TaskStatus.Completed ? "success" : status === TaskStatus.Disputed || status === TaskStatus.Cancelled ? "danger" : status === TaskStatus.PaymentPending || status === TaskStatus.CompletionPending ? "warning" : "brand";
  return <Badge tone={tone}>{status}</Badge>;
}
