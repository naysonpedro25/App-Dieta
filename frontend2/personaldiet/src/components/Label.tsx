
interface Props{
    id?: string;
    hmltFor: string;
}

export default function Label({id, hmltFor}: Props) {
  
    return (
      <label id={id} className="block text-sm font-medium text-gray-700" htmlFor={hmltFor}>
        Label
      </label>
    )
  
}
