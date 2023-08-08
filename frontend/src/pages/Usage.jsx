import { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import styles from "./Usage.module.css";
import ComparisonModal from "./Visualization";

export default function Usage() {
  const [electricityTotal, setElectricityTotal] = useState(0);
  const [gasTotal, setGasTotal] = useState(0);
  const [devices, setDeviceList] = useState([]);
  const [postcodes, setPostcodes] = useState([]);
  const [electricityData, setElectricityData] = useState([]);
  const [gasData, setGasData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [year, setYear] = useState("");
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const years = Array.from(
      new Set(electricityData.map((item) => item.year))
    ).sort();

    setYearOptions(years);
    // Set the first year in the list as the default year
    if (years.length > 0) setYear(years[0]);
  }, [electricityData]);

  useEffect(() => {
    if (comparisonData.length > 0) {
      // Open the modal when we have comparison data
      setIsModalOpen(true);
    }
  }, [comparisonData]);

  useEffect(() => {
    fetch("http://localhost:3004/gas")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGasData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3004/electricity")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setElectricityData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3004/postcodes")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPostcodes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    setDeviceList((devices) => devices.filter((device) => device.id !== id));
  }

  function handleDevice(device) {
    setDeviceList((devices) => [...devices, device]);
  }

  useEffect(() => {
    const totalElectricity = devices.reduce((total, device) => {
      return device.type === "electricity"
        ? total + device.power * device.usage
        : total;
    }, 0);

    const totalGas = devices.reduce((total, device) => {
      return device.type === "gas"
        ? total + device.power * device.usage
        : total;
    }, 0);

    setElectricityTotal(totalElectricity * 365);
    setGasTotal(totalGas * 365);
  }, [devices]);

  const handleCompare = () => {
    const yourHomeData = {
      name: "Your Home",
      electricity: electricityTotal,
      gas: gasTotal,
    };

    // Filter data based on selected year
    const electricityYearData = electricityData.filter(
      (data) => data.year === year
    );

    // Combine data
    const combinedData = electricityYearData.map((edata) => {
      const gdata = gasData.find(
        (g) => g.year === year && g.suburb === edata.suburb
      );
      return {
        name: edata.suburb,
        electricity: edata.emissionPerYear,
        gas: gdata ? gdata.emissionPerYear : 0,
      };
    });

    const comparisonData = [yourHomeData, ...combinedData];
    setComparisonData(comparisonData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <PageNav />
      <section className={styles.usage}>
        {isModalOpen && (
          <ComparisonModal data={comparisonData} onClose={closeModal} />
        )}
        <div className={styles.sidebar}>
          <FormAddDevice toAdd={handleDevice} postcodes={postcodes} />
        </div>

        <div className="">
          {devices.length > 0 && (
            <DeviceTable devices={devices} onDelete={handleDelete} />
          )}
        </div>
        {devices.length > 0 && (
          <div>
            <div className={styles.msg}>
              {gasTotal > 0 && (
                <p>
                  Your total Gas carbon footprint emission for a whole year
                  would be approx{" "}
                  <span
                    className={gasTotal > 300 ? styles.danger : styles.good}
                  >
                    {gasTotal}
                  </span>
                </p>
              )}
            </div>
            <div className={styles.msg}>
              {electricityTotal > 0 && (
                <p>
                  Your total Electricity carbon footprint emission for a whole
                  year would be approx{" "}
                  <span
                    className={
                      electricityTotal > 300 ? styles.danger : styles.good
                    }
                  >
                    {electricityTotal}
                  </span>
                </p>
              )}
            </div>
            <div style={{ marginTop: "2rem" }}>
              <label>Choose year to compare with your neighbour</label>
              <select
                name="year"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.compare}>
              <Button onclick={handleCompare}>
                Compare with your Neighbours
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function DeviceTable({ devices, onDelete }) {
  return (
    <table className={styles.devicelist}>
      <thead>
        <tr>
          <th>Device Name</th>
          <th>Emission Type</th>
          <th>Usage (Hrs)</th>
          <th>Power Consumption (KWH)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.name}</td>
            <td>{device.type}</td>
            <td>{device.usage}</td>
            <td>{device.power}</td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button onClick={() => onDelete(device.id)}>❌</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function isValidFloat(value) {
  return /^\d*(\.\d+)?$/.test(value);
}

function isValidAlphanumeric(value) {
  return /^[a-zA-Z0-9]+$/.test(value);
}
function Button({ children, disabled, onclick }) {
  return (
    <button
      className={disabled ? styles.buttonDisabled : styles.button}
      disabled={disabled}
      onClick={onclick}
    >
      {children}
    </button>
  );
}

function FormAddDevice({ toAdd, postcodes }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("electricity");
  const [usage, setUsage] = useState("");
  const [power, setPower] = useState("");
  const [count, setCount] = useState(1);
  const [postcode, setPostcode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValidFloat(usage) || !isValidFloat(power)) {
      alert("Please enter a number for usage and power consumption.");
      return;
    }

    if (!isValidAlphanumeric(name)) {
      alert("Please enter correct device name.");
      return;
    }

    setCount((c) => c + 1);
    if (!name || !usage || !power) return;
    const id = count;
    const device = {
      id,
      name,
      type,
      usage: Number(usage),
      power: Number(power),
    };
    toAdd(device);
    setName("");
    setType("gas");
    setUsage("");
    setPower("");
  }

  const isDisabled = !name || !usage || !power;
  return (
    <form className="form-add-device" onSubmit={handleSubmit}>
      <label>Device Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your device name"
      />
      <label>Emission Type</label>
      <select
        name="selectList"
        id="selectList"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="electricity">Electricity</option>
        <option value="gas">Gas</option>
      </select>
      <label>Usage (Hrs)</label>
      <input
        type="text"
        value={usage}
        onChange={(e) => setUsage(e.target.value)}
        placeholder="Enter your daily usage of device"
      />
      <label>Power Consumtion of device (KWH) </label>
      <input
        type="text"
        value={power}
        onChange={(e) => setPower(e.target.value)}
        placeholder="Enter your device power consumption"
      />
      <label>Postcode</label>
      <select
        name="postcode"
        id="postcode"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
      >
        {postcodes.map(({ postcode, suburb }) => {
          let displayedSuburb = suburb.split(";").slice(0, 2).join(";");
          if (suburb.split(";").length > 2) {
            displayedSuburb += "...";
          }

          return (
            <option key={postcode} value={postcode}>
              {postcode} - {displayedSuburb}
            </option>
          );
        })}
      </select>
      <Button disabled={isDisabled}>Add Device</Button>
    </form>
  );
}
