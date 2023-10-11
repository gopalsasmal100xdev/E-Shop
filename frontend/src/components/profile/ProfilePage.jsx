import { useSelector } from "react-redux";
function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  return <div>ProfilePage Welcome {user.name}</div>;
}

export default ProfilePage;
