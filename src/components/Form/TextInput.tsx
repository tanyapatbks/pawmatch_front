import { ChangeEventHandler } from "react";

export default function TextInput({
    fieldName,
    name,
    onChange,
    value,
    type = "text"
}: {
    fieldName: string;
    name: string;
    onChange: ChangeEventHandler;
    value: string | number;
    type?: "text" | "number";
}) {
    return (

        <div className="flex flex-col">
            
            <div className="text-sm text-rose-600">
                {fieldName}
            </div>
            
            <input
                name={name}
                value={value===0?undefined:value}
                onChange={onChange}
                type={type}
                className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm 
                            focus:outline-none focus:border-pink-500"
            />

        </div>

    );
}