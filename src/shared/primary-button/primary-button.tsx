"use client"

interface PrimaryButtonProps {
  text: string
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  isLoading?: boolean
}

const PrimaryButton = ({ text, disabled = false, onClick, type = "submit", isLoading = false }: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 px-4 rounded-2xl font-medium transition-all duration-200 ${
        disabled
          ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
          : "gradient-orange text-white hover:from-orange-600 hover:to-orange-700 active:scale-95"
      }`}
    >
      {isLoading && (
        <div className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
      )}
      {text}
    </button>
  )
}

export default PrimaryButton
