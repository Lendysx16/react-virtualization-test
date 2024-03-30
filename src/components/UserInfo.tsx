import { useSelector } from "react-redux";
import { useGetOneUserQuery, useUpdateUserMutation } from "../store";
import { RootState } from "../store";
import { useForm } from "react-hook-form";
import { IUser } from "../types/userDTO";
import { useEffect } from "react";
type Props = {
    className?: string;
};

const inputClass = " p-2 border-2 border-black bg-[#f5f5f5]";
const UserInfo = ({ className }: Props) => {
    const userId = useSelector((state: RootState) => state.selectedUser.id);
    const { data, error, isLoading } = useGetOneUserQuery(userId);
    const { handleSubmit, register, setValue } = useForm<IUser>({
        defaultValues: data,
    });
    const [updateUserMutaion] = useUpdateUserMutation();
    useEffect(() => {
        if (data) {
            setValue("id", data?.id);
            setValue("name", data?.name);
            setValue("position", data?.position);
            setValue("department", data?.department);
            setValue("company", data?.company);
        }
    }, [setValue, data]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const updateUser = async (updatedInfo: IUser) => {
        await updateUserMutaion(updatedInfo).unwrap();
    };
    return (
        <div className={className}>
            {error ? (
                <div> No user selected</div>
            ) : (
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit(updateUser)}
                >
                    <input
                        {...register("name")}
                        placeholder="name"
                        className={inputClass}
                    />
                    <input
                        {...register("position")}
                        placeholder="position"
                        className={inputClass}
                    />
                    <input
                        {...register("department")}
                        placeholder="department"
                        className={inputClass}
                    />
                    <input
                        {...register("company")}
                        placeholder="company"
                        className={inputClass}
                    />
                    <button> submit changes</button>
                </form>
            )}
        </div>
    );
};

export default UserInfo;
