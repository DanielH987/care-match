'use client';

import ReactSelect from 'react-select';

interface SelectProps {
    label: string;
    value?: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled,
}) => {
    return (
        <div className="z-[100]">
            <label
                className="
                block 
                text-sm 
                font-medium 
                leading-6 
                text-gray-900
                "
            >
                {label}
            </label>
            <div className="mt-2">
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#FFF1EC', // Control background color
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: '#FFF1EC', // Dropdown menu background color
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? '#FFF1EC' : '#FFF1EC',
                            color: state.isSelected ? 'black' : 'black',
                            '&:hover': {
                                backgroundColor: '#FFE5D8',
                            },
                        }),
                    }}
                    classNames={{
                        control: () => 'text-sm',
                    }}
                />
            </div>
        </div>
    );
}

export default Select;