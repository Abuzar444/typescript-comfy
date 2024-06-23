import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FormInputs = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
};

const FormInput = ({ name, type, label, defaultValue }: FormInputs) => {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Input id={name} type={type} name={name} defaultValue={defaultValue} />
    </div>
  );
};
export default FormInput;
