// @ts-ignore
// @ts-nocheck
import { useFormContext } from 'react-hook-form'
import { FaKey, FaMailBulk, FaIdCard, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
export const FormInput = ({
  name,
  label,
  type,
  rules,
  placeholder,
  disabled = false,
}: {
  name: string
  label: string
  type: string
  rules: any
  placeholder: string
  disabled?: boolean
}) => {
  function getIcon() {
    switch (type) {
      case 'email':
        return <FaMailBulk />
      case 'password':
        return <FaKey />
      case 'text':
        return <FaIdCard />
    }
  }

  const {
    register,
    formState: { errors },
  } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const effectiveType = type === 'password' && showPassword ? 'text' : type
  return (
    <>
      <div className="mb-6">
        <label
          htmlFor={name}
          className="mb-3 block text-sm font-medium text-white"
        >
          {label}
        </label>
        <div className="flex items-center justify-start rounded-lg border border-white bg-black p-2.5">

          <span className="text-2xl text-white me-2">{getIcon()}</span>
          {name === "role" ? (

            <select
              id={name}
              className="w-full border-0 bg-black text-white"
              {...register(name, rules)}
            >
              <option value="">Select Role</option>
              <option value="Instructor" className="bg-black text-white">
                Instructor
              </option>
              <option value="Student" className="bg-black text-white">
                Student
              </option>
            </select>
          ) : (

            <input
              id={name}
              type={type}
              placeholder={placeholder}
              className="flex-1 border-0 bg-transparent outline-0 py-1.5 text-sm text-white placeholder:text-gray-600"
              {...register(name, rules)}
              disabled={disabled}
            />

          )}
        </div>
        {errors[name] && (
          <span className="text-red-700"> {errors[name]?.message}</span>
        )}
      </div>
    </>
  )
}
