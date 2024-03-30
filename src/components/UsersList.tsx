import { useEffect, useState } from "react";
import { useGetUsersQuery, RootState } from "../store";
import ListItem from "./ListItem";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
type Props = {
    className?: string;
};

const limit = 20;
export const UsersList = ({ className }: Props) => {
    const [start, setStart] = useState(0);
    const userId = useSelector((state: RootState) => state.selectedUser.id);
    const { data, isLoading, isFetching } = useGetUsersQuery({
        limit,
        start,
    });

    const { ref: fstUser, inView: inViewFstUser } = useInView({
        threshold: 0.05,
    });

    const { ref: lstUser, inView: inViewLstUser } = useInView({
        threshold: 0.25,
    });

    useEffect(() => {
        if (inViewFstUser) setStart((prev) => (prev >= 7 ? prev - 7 : prev));
    }, [inViewFstUser]);

    useEffect(() => {
        if (inViewLstUser) setStart((prev) => prev + 7);
    }, [inViewLstUser]);

    return (
        <div className={className}>
            {(isLoading || isFetching) && <div>Loading...</div>}
            {data?.map((user, index, arr) =>
                index === 1 ? (
                    <ListItem
                        ref={fstUser}
                        key={user.id}
                        user={user}
                        isSelected={user.id === userId}
                    />
                ) : index === arr.length - 2 ? (
                    <ListItem
                        ref={lstUser}
                        key={user.id}
                        user={user}
                        isSelected={user.id === userId}
                    />
                ) : (
                    <ListItem
                        key={user.id}
                        user={user}
                        isSelected={user.id === userId}
                    />
                )
            )}
        </div>
    );
};

export default UsersList;
