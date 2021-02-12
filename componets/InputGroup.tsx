import classNames from "classnames";

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  error: string | undefined;
  setValue: (str: string) => void;
  value: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  error,
  className,
  placeholder,
  setValue,
  value,
  type,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        className={classNames(
          "w-full p-3 transition duration-200 border border-gray-300 rounded outline-none focus:bg-white hover:bg-white bg-gray-50",
          {
            "border-red-500": error,
          }
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default InputGroup;
