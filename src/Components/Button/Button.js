import { useRouter } from "next/router";
import { IoAdd } from "react-icons/io5";

const Button = ({
  primary,
  secondary,
  danger,
  special,
  small,
  disabled,
  active,
  onClick = () => {},
  href,
  size = "xs",
  className = "",
  children,
  type = "button",
  ...props
}) => {
  const router = useRouter();
  let baseStyle =
    "transform transition-transform rounded-xl focus:outline-none  inline-block ";

  baseStyle += small ? "p-2 " : "p-3 ";

  let textStyle = "w-full h-full font-bold tracking-wide text-center ";

  const isDisabled = (disabled, active, color, type) => {
    if (active) return "cursor-default nm-inset-" + color + "-" + size + " ";
    const style = "nm-" + type + "-" + color + "-" + size + " ";
    if (!disabled)
      return (
        style + "active:nm-inset-" + color + "-" + size + " focus:scale-105 "
      );
    else return style;
  };

  if (special) {
    baseStyle += isDisabled(disabled, active, "white", "flat");
    if (primary)
      textStyle += "text-gradient bg-gradient-to-r from-blue-400 to-blue-700 ";
    if (secondary)
      textStyle += "text-gradient bg-gradient-to-r from-gray-400 to-gray-700 ";
    if (danger) {
      textStyle += "text-gradient bg-gradient-to-r from-red-300 to-red-600 ";
    }
  } else {
    if (primary) {
      baseStyle += isDisabled(disabled, active, "blue", "convex");
      textStyle +=
        "text-gradient bg-gradient-to-r from-white via-gray-100 to-white ";
    }
    if (secondary) {
      baseStyle += isDisabled(disabled, active, "gray", "convex");
      textStyle += "text-gradient bg-gradient-to-r from-white to-gray-100 ";
    }
    if (danger) {
      baseStyle += isDisabled(disabled, active, "red", "convex");
      textStyle += "text-gradient bg-gradient-to-r from-white  to-red-100 ";
    }
  }

  // Disabled
  if (disabled) baseStyle += "opacity-70 cursor-not-allowed ";
  else if (!active) baseStyle += "active:scale-95  hover:scale-105 ";

  baseStyle += className;

  return (
    <button
      className={baseStyle}
      type={type}
      onClick={(ev) => {
        if (!disabled && href) router.push(href);
        if (disabled) ev.preventDefault();
        else onClick();
        ev.stopPropagation();
      }}
      {...props}
    >
      <div className={textStyle}>{children}</div>
    </button>
  );
};

export default Button;
