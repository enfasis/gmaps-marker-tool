import { forwardRef } from "react";

function Input({ Icon, label, error, containerClass = "", ...props }, ref) {
  //Base
  let inputClass =
    "transition-all p-2 pl-0 w-full focus:outline-none no-autofill-bkg ";

  //Font
  inputClass += "tracking-wide font-bold ";
  //Border
  inputClass += "border-b ";
  //Color
  inputClass += "bg-transparent ";
  if (error) inputClass += "border-red-300 text-red-300 ";
  else inputClass += "border-gray-300 text-gray-600 ";

  let errorClass =
    "absolute -bottom-4 text-xs text-red-300 whitespace-nowrap truncate w-full ";

  // Hover
  inputClass += "hover:nm-flat-white-xs hover:pl-2 hover:rounded-lg ";

  // Focused
  inputClass += "focus:nm-flat-white-xs focus:pl-4 focus:rounded-xl ";

  // Placeholder
  inputClass += "placeholder-gray-400 placeholder-light ";

  // Font
  let labelClass =
    "tracking-wide whitespace-nowrap text-gradient bg-gradient-to-r from-gray-400 to-gray-500 ";
  labelClass += "lg:flex lg:ml-4 lg:static lg:text-sm ";
  labelClass += "absolute ml-10 -top-3 text-xs ";

  return (
    <div
      className={
        "pb-6 mt-3 flex flex-row items-center relative w-full" + containerClass
      }
    >
      {Icon && (
        <Icon className="h-8 w-8 text-center p-1 text-gray-400 nm-flat-white-xs rounded-2xl" />
      )}
      {label && <label className={labelClass}>{label}:</label>}
      <div className="flex flex-col w-full ml-4 relative">
        <input className={inputClass} {...props} ref={ref} />
        {error ? <div className={errorClass}>{error}</div> : null}
      </div>
    </div>
  );
}

export default forwardRef(Input);
