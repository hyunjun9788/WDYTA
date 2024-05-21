"use client";
import { TextFieldProps } from "@/shared/types/input";

const SIZE_MAP = {
  large: "w-[295px] md:w-[510px] lg:w-[540px]",
  small: "w-[295px] md:w-[360px]",
};

const TextFieldInput = ({
  id,
  placeholder,
  validation,
  size = "small",
  register,
  maxLength,
}: TextFieldProps) => {
  return (
    <input
      className={`${SIZE_MAP[size]} h-[55px] md:h-[60px] lg:h-[70px] px-[20px] py-[23px] rounded-[8px] border border-solid border-gray-35 bg-black-25 text-gray-F1 text-[14px] md:text-[16px] font-normal placeholder-gray-6E focus:border-main-blue focus:outline-none`}
      type="text"
      placeholder={placeholder}
      {...register(id, validation)}
      maxLength={maxLength}
    />
  );
};

export default TextFieldInput;
