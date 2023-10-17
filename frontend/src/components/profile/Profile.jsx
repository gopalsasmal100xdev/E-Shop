import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../constants/data";
import { useState } from "react";
import styles from "../../styles/styles";

const Profile = () => {
  const { loading, user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = () => {};
  const handleImage = () => {};

  return (
    <div className="">
      {loading && user ? (
        <h1>Loading..</h1>
      ) : (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              {user.avatar && (
                <img
                  src={`${SERVER_URL}/${user?.avatar?.url}`}
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                  alt="profile_image"
                />
              )}
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera
                    size={20}
                    className="cursor-pointer"
                    title="Change Profile"
                  />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0  cursor-not-allowed`}
                    required
                    disabled
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    disabled
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-not-allowed`}
                    required
                    disabled
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Zip Code</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-not-allowed`}
                    required
                    disabled
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address 1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-not-allowed`}
                    required
                    disabled
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Address 2</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-not-allowed`}
                    required
                    disabled
                    value={address2}
                    onChange={(e) => {
                      setAddress2(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              /> */}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
