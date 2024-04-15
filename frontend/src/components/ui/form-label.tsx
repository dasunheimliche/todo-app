import { Label } from "./label";

interface FormLabelProps extends React.ComponentProps<typeof Label> {
  children: React.ReactNode;
}

export default function FormLabel({ children, ...props }: FormLabelProps) {
  return (
    <Label {...props} className="font-semibold text-xs text-slate-600 mb-1">
      {children}
    </Label>
  );
}
