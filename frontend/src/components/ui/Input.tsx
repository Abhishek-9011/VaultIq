interface InputProps {
  reference?: any;
  placeholder: string;
}

export function Input({ reference, placeholder }: InputProps) {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded m-2"
      />
    </div>
  );
}
