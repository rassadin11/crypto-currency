import React from "react"
import Select from 'react-select'

export interface ISelectOption {
    value: string,
    label: string,
    price?: number
}

interface Props {
    options: ISelectOption[],
    value: ISelectOption | null,
    onChange: any,
    placeholder: string
}

const customStyles = {
    option: (provided: any) => ({
        ...provided,
        color: "#000",
        fontFamily: 'inherit'
    })
}

const ReactSelect = ({ options, value, onChange, placeholder }: Props) => {
    return (
        <div>
            <Select
                styles={customStyles}
                placeholder={placeholder}
                options={options}
                value={value}
                onChange={onChange}
            />
        </div>
    )
};

export default ReactSelect;