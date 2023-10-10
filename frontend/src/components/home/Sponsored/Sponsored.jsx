import styles from "../../../styles/styles";
import { sponsoredCompanies } from "../../../static/data";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 cursor-pointer rounded-xl mb-12`}>
      <div className="flex justify-between w-full">
        {sponsoredCompanies &&
          sponsoredCompanies.map((com) => (
            <div className="flex items-start" key={com.id}>
              <img
                src={com.image_url}
                alt="companies_logos"
                style={{ width: "150px", objectFit: "contain" }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sponsored;
