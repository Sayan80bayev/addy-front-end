import { Link } from "react-router-dom";
import { simplifyTimestamp } from "../api";

export const showAdds = (advertisements) => {
  return (
    <div className="ctn">
      {advertisements.map((advertisement) => (
        <div key={advertisement.id} className="card-ctn">
          <div className="card">
            {/* Check if there are images */}
            {advertisement.images.length > 0 ? (
              // Display the first image if available
              <img
                src={`data:image/jpeg;base64,${advertisement.images[0].imageData}`}
                alt={`First Image`}
              />
            ) : (
              // Display a placeholder image if no images available
              <img
                src={process.env.PUBLIC_URL + "/empty.jpg"}
                alt={advertisement.title}
              />
            )}
            <div className="card-info">
              <Link to={"/view/" + advertisement.id} className="link_to_full">
                <h5>{advertisement.title}</h5>
              </Link>
              <p className="price">
                <b>{advertisement.price}</b>
              </p>
              <p>{advertisement.category.category_name}</p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <small>{simplifyTimestamp(advertisement.date)}</small>
                <div className="views">
                  <img
                    className="rec_icon "
                    src={process.env.PUBLIC_URL + "/view-eye-svgrepo-com.png"}
                  />
                  <h6 style={{ display: "block" }}>{advertisement.views}</h6>
                </div>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};