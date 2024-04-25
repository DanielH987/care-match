import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
  label: string;
}

const MobileItem: React.FC<MobileItemProps> = ({ 
  href, 
  icon: Icon, 
  label,
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return ( 
    <Link 
      onClick={handleClick} 
      href={href} 
      className={clsx(`
        group 
        flex 
        items-center 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-start 
        p-4 
        text-gray-500 
        hover:text-black 
        hover:bg-[#FFE5D8]
      `,
        active && 'bg-[#FFE5D8] text-black',
      )}>
      <Icon className="h-6 w-6" />
      {label}
    </Link>
   );
}
 
export default MobileItem;