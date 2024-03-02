import { Ref } from "react";

interface SelectProps {
  name: string;
  options?: any[];
  onSelect: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
  clases: string;
  selectedIndex?: number;
  ref?: Ref<HTMLElement>;
}
const CertainSelect: React.FC<SelectProps> = ({
  name,
  options,
  onSelect,
  placeholder,
  clases,
  selectedIndex,
}) => {
  return (
    <select
      name={name}
      onChange={(e) => onSelect(e.target.value)}
      className={clases}
    >
      <option value="" selected>
        {placeholder}
      </option>
      {options?.map((option: any, index: number) => (
        <option
          key={index}
          value={option.ID}
          selected={option.ID == selectedIndex}
        >
          {option.Name}
        </option>
      ))}
    </select>
  );
};

export default CertainSelect;
