import React from 'react'

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div className='flex gap-6'>
            <label
                className={`flex-1 flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-colors
                    ${selectedGender === "male"
                        ? "bg-blue-500/10 border-blue-500/60 text-blue-300"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"}`}
            >
                <span className='text-sm font-medium'>Male</span>
                <input
                    type="checkbox"
                    className='text-white checkbox checkbox-sm border-white/20'
                    checked={selectedGender === "male"}
                    onChange={() => onCheckboxChange("male")}
                />
            </label>

            <label
                className={`flex-1 flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-colors
                    ${selectedGender === "female"
                        ? "bg-blue-500/10 border-blue-500/60 text-blue-300"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"}`}
            >
                <span className='text-sm font-medium'>Female</span>
                <input
                    type="checkbox"
                    className='text-white checkbox checkbox-sm border-white/20'
                    checked={selectedGender === "female"}
                    onChange={() => onCheckboxChange("female")}
                />
            </label>
        </div>
    )
}

export default GenderCheckbox