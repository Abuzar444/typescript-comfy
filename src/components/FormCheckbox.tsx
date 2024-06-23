import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type FormCheckboxProps = {
  name: string;
  label?: string;
  defaultValue?: string;
};

const FormCheckhbox = ({ name, label, defaultValue }: FormCheckboxProps) => {
  const defaultCheckbox = defaultValue === "on" ? true : false;
  return (
    <div className='flex justify-between flex-end mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {name || label}
      </Label>
      <Checkbox id={name} name={name} defaultChecked={defaultCheckbox} />
    </div>
  );
};
export default FormCheckhbox;
