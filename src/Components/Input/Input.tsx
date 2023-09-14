import React from "react";

const Input = (props: {
  label?: any;
  name?: any;
  step?: any;
  value?: any;
  handleChange?: any;
  type?: any;
  placeholder?: any;
  className?: any;
  errTxt?: string;
  onBlur?: any;
  disabled?: boolean;
  required?: boolean;
  horizontal?: boolean;
}) => {
  return (
    <div className={" flex " + (props.horizontal ? " items-center gap-[20px] w-[100%]" : " flex-col") }>
      <label className="text-[#333333] opacity-70 font-semibold text-[14px]">
        {props?.label}{" "}
        {props?.required && <span className="text-[red]">*</span>}
      </label>
      <input
        step={props?.step}
        name={props?.name}
        type={props?.type}
        className={
          "border-[1px] text-[14px] rounded-[4px] p-[10px] mt-[5px] " +
          props?.className
        }
        placeholder={props?.placeholder}
        value={props?.value}
        onChange={props?.handleChange}
        onBlur={props?.onBlur}
        disabled={Boolean(props?.disabled) || false}
      />
      {props?.errTxt && (
        <label className=" mt-[3px] animate-shake-fast font-sfTextSemiBold text-sm text-red-600">
          {props?.errTxt}{" "}
        </label>
      )}
    </div>
  );
};

export default Input;
