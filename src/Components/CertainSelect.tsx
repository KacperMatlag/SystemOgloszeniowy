interface SelectProps{
    name:string,
    options: any[],
    onSelect: (value: string) => void,
    placeholder: string,
    clases: string,
}
const CertainSelect: React.FC<SelectProps> = ({ name, options, onSelect, placeholder,clases }) => {
  return (
    <select name={name} onChange={(e) => onSelect(e.target.value)} className={clases}>
      <option value="" selected>
        {placeholder}
      </option>
      {options.map((option: any, index: number) => (
        <option key={index} value={option.ID}>
          {option.Name}
        </option>
      ))}
    </select>
  );
};

export default CertainSelect;