interface InputProps {
    placeholder: string;
    name: string;
    register: any;
  }
  
  export default function Input(props: InputProps, {...rest}) {
    return (
      <input
        className="rounded p-4 text-xl w-full"
        name={props.name}
        placeholder={props.placeholder}
        ref={props.register}
        {...rest}
      />
    );
  }