interface SelectProps {
  name?: string;
  options?: any[];
  onSelect: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
  clases?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean[]>>;
  targetIndex: number;
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../CSS/ComponentsCSS/MultipleSelectFilter.css";
const MultipleSelectFilter: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder,
  isOpen,
  setIsOpen,
  targetIndex,
}) => {
  console.log(options);

  return (
    <div className={"dropDown" + (isOpen ? " dropdownActive" : "")}>
      <header
        onClick={() => {
          setIsOpen((prevIsOpen) => {
            return prevIsOpen.map((value, index) =>
              index === targetIndex ? !value : false
            );
          });
        }}
      >
        <span>{placeholder}</span>
        <FontAwesomeIcon icon={faCaretDown} />
      </header>
      <div className="dropDownContent">
        <ul>
          {options?.map((element) => {
            return (
              <li>
                <div>{element.Name}</div>
                <input type="checkbox" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default MultipleSelectFilter;
