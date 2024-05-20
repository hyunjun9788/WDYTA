import { PropsWithChildren } from "react";

interface ButtonProps extends React.ComponentProps<'button'> {
  size : string;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({size, onClick, disabled = false, children} : PropsWithChildren<ButtonProps>) => {

  let buttonClass = `flex py-6  justify-center items-center gap-[10px] flex-shrink-0 rounded-lg whitespace-nowrap`;
  let pClass = '';

  switch (size) {
    case 'L' : 
      buttonClass += ' w-[640px] h-[65px]';
      pClass += 'text-lg';
      break;
    case 'M' :
      buttonClass += ' w-[440px] h-[55px]';
      pClass += 'text-base';
      break;
    case 'S' :
      buttonClass += ' w-[335px] h-[50px]';
      pClass += 'text-base';
      break;
  }

  if (disabled) {
    buttonClass += ' bg-gray-35';
    pClass += ' text-gray-6E';
  } else {
    buttonClass += ' bg-main-gradation';
    pClass += ' text-white';
  }


  

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}  
    >
      <p className={pClass}>
        {children}
      </p>
    </button>
  );
};

/* 사용법 
크기를 L, M, S로 두고, disabled의 경우에는 boolean 값으로 disabled를 설정하시면 됩니다.
onClick Prop을 활용하여 다음 동작을 결정하시면 됩니다.
      <PrimaryButton size="S" disabled={true}>
        스몰 비활성화
      </PrimaryButton>
  와 같이 사용하시면 children props로 값이 전달됩니다. 
*/

export default PrimaryButton;