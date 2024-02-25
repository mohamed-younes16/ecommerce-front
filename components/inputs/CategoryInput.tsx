import { IconType } from "react-icons";
import TooltipComp from "../ui/TooltipComp";
const CategoryInput = ({
  onClick,
  label,
  icon: Icon,
  selected = false,
  description,
  active,
}:
  | {
      onClick: () => void;
      label: string;
      icon: IconType;
      selected?: boolean;
      description: string;
      active: true;
    }
  | {
      onClick?: () => void;
      label: string;
      icon: IconType;
      selected?: boolean;
      description: string;
      active: false;
    }) => {
  return (
    <div>
      {active ? (
        <div
          onClick={() => onClick()}
          className={`flex justify-center flex-col  p-4 group relative  ${
            selected && "text-main "
          }    pb-2 hover:text-main transition  gap-2`}
        >
          <div>
            <Icon size={25} />
            <p>{label}</p>
          </div>
          <p className="text-foreground/70">{description}</p>

          <div
            className={`absolute transition-all w-full  border-4 rounded-sm border-main bottom-0
             h-full left-0 top-0  ${
               selected ? "scale-100 skew-x-0" : "skew-x-[60deg] scale-0 "
             }`}
          ></div>
        </div>
      ) : (
        <div
          className={`flex justify-start    group relative  ${
            selected && "!text-main "
          }    pb-2 hover:text-main transition  gap-2`}
        >
          <div>
            <Icon size={35} />
          </div>
          <div>
            <p>{label}</p>
            <p className="text-foreground/70  transition  group-hover:text-main">
              {description}
            </p>
          </div>
      
        </div>
      )}
    </div>
  );
};

export default CategoryInput;
