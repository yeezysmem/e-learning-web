import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataCardProps {
  value: number;
  label: string;
  shouldFortmat?: boolean;
}

export const DataCard = ({ value, label, shouldFortmat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl">
            {shouldFortmat ? "$" + value : value}
        </div>
      </CardContent>
    </Card>
  );
};
