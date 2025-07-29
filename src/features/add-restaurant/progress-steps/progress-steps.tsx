interface ProgressStepsProps {
  currentStep: number
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step <= currentStep ? "bg-orange-500 text-white" : "bg-[#2A2730] text-gray-400 border border-[#3D3A46]"
              }`}
            >
              {step}
            </div>
            {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-orange-500" : "bg-[#2A2730]"}`} />}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Основная информация</span>
        <span>Время работы</span>
        <span>Контакты владельца</span>
      </div>
    </div>
  )
}
