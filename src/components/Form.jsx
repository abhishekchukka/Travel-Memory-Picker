// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import { useNavigate } from "react-router";
import BackButton from "./BackButton";
// import { useSearchParams } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigate = useNavigate();
  const { createCity, setCities } = useCities();
  const [cityName, setCityName] = useState("");
  const [IsLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [country, setCountry] = useState("");
  // const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = useUrlPosition();
  const [errorMsg, setErrorMsg] = useState("");
  const [position, setPosition] = useState({});
  // console.log(lat, lng);
  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          // setGeocodingError("");

          const res = await fetch(`${URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();

          if (!data.countryCode) throw new Error("Click on map !!!!!...");
          console.log(lat, lng);
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          setPosition({ lat, lng });
        } catch (err) {
          setErrorMsg(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: position,
    };
    // console.log(newCity);

    await createCity(newCity);
    navigate("/app/cities");
  }
  if (errorMsg) return <Message message={errorMsg}></Message>;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag} style={{ color: "black" }}>
          {emoji}
        </span>
      </div>

      <div className={styles.row}>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
        <p>
          {lat}, {lng}
        </p>
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
