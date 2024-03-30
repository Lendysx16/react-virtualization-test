import { forwardRef, memo } from "react";
import { IUser } from "../types/userDTO";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../store";
type Props = {
    user: IUser;
    isSelected: boolean;
};

const ListItem = memo(
    forwardRef<HTMLDivElement, Props>(({ isSelected, user }, ref) => {
        const dispatch = useDispatch();
        return (
            <div
                ref={ref}
                className={`cursor-pointer w-full min-h-[60px] md:min-h-[120px] border-b-2 border-black flex items-center justify-center ${
                    isSelected ? "bg-orange-100" : ""
                }`}
                key={user.id}
                onClick={() => dispatch(setSelectedUser({ id: user.id }))}
            >
                {user.name}
            </div>
        );
    })
);

export default ListItem;
