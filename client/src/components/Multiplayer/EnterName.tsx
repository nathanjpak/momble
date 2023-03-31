import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import socket from "../../socket";

export default function EnterName() {
  const { register, handleSubmit } = useForm();

  const roomId = useParams();

  const onSubmit = async (data: any) => {
    socket.emit("private-rooms:game-update", data.name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Enter your name:</p>
      <input {...register("name")} type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
