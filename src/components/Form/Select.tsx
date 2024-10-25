import { ChangeEventHandler } from "react";


interface Option {
    value: string;
    label: string;
}

export default function Select({
    fieldName,
    name,
    onChange,
    value,
    options
}: {
    fieldName: string;
    name: string;
    onChange: ChangeEventHandler;
    value: string;
    options: Option[];
}) {
    return (

        <div className="flex flex-col">

            <div className="text-sm text-rose-600">
                {fieldName}
            </div>

            <select
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm
                            appearance-none focus:outline-none focus:border-pink-500 cursor-pointer"
                name={name}
                onChange={onChange}
                value={value}
            >

                <option value="" hidden>
                    
                </option>

                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }

            </select>

        </div>

    );
}