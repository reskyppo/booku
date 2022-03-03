import { ImSad } from "react-icons/im";

interface Props {
  content: string;
}

export const Empty = ({ content }: Props) => {
  return (
    <div className="h-96 flex flex-col justify-center items-center">
      <ImSad size={70} />
      <h1 className="my-4 text-3xl font-semibold">
        Sorry, there is no your {content} in here!
      </h1>
    </div>
  );
};