interface SpinnerProps {
  size?: string
  color?: string
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'h-8 w-8',
  color = 'border-gray-900',
}) => {
  return (
    <div
      className={`inline-block ${size} animate-spin rounded-full border-4 border-solid ${color} border-r-transparent`}
    ></div>
  )
}

export default Spinner
