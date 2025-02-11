export function Button({ variant = "primary", children, ...props }) {
    const baseStyles = "px-8 py-3 rounded-full font-medium transition-colors"
    const variants = {
      primary: "bg-[#32B768] text-white hover:bg-[#2EA55E]",
      outline: "border border-[#E5E7EB] text-gray-700 hover:bg-gray-50",
    }
  
    return (
      <button className={`${baseStyles} ${variants[variant]}`} {...props}>
        {children}
      </button>
    )
  }
  
  