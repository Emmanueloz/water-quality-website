
interface SelectProps {
    selectedValue: string,
    setSelectedValue: React.Dispatch<React.SetStateAction<string>>,
    options: { value: string, label: string }[]
}

const Select: React.FC<SelectProps> = ({ selectedValue, setSelectedValue, options }) => {

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <select
                value={selectedValue}
                onChange={handleSelectChange}
                className="p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
    );
};

export default Select;