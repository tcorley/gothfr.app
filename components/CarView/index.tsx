import { useEffect } from "react";
import useGoogleSheets from "use-google-sheets";
import CircleType from "circletype";
import styles from "../../styles/CarView.module.css";

type Totals = {
  paid: string;
  initialAmount: string;
  remaining: string;
};

type Payment = {
  amount: string;
  date: string;
};

type Props = {
  onLogout: () => void;
};

export default function CarView({ onLogout }: Props) {
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    sheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
    sheetsNames: ["payments", "totals"],
  });

  useEffect(() => {
    const heading = new CircleType(document.getElementById("heading"));
    const updateRadius = () => heading.radius(heading.element.offsetWidth / 2);
    window.addEventListener("resize", updateRadius);
    updateRadius();
  }, []);

  let paidAmount;
  let lastPayment;
  let initialAmount;
  let remainingAmount;

  if (data.length) {
    const totals = (data[1].data[0] as unknown) as Totals;
    paidAmount = totals.paid;
    initialAmount = totals.initialAmount;
    remainingAmount = totals.remaining;
    lastPayment = data[0].data[data[0].data.length - 1];
  }

  return (
    <div>
      <h1 id="heading">HANK YOU VERY MUCH!</h1>
      <img
        src="/xbfront.webp"
        width="500"
        height="256"
        className={styles.scion}
      />
      <div className={styles.card}>
        {loading && <p>loading</p>}
        {data.length > 0 && (
          <p>
            So far you've paid{" "}
            <span className={styles.emphasis}>${paidAmount}</span> of{" "}
            <span className={styles.emphasis}>${initialAmount}</span>, which
            leaves <span className={styles.emphasis}>${remainingAmount}</span>.
            Your last payment was{" "}
            <span className={styles.emphasis}>${lastPayment.amount}</span> on{" "}
            <span className={styles.emphasis}>{lastPayment.date}</span>.
          </p>
        )}
        <div className={styles.flex}>
          <a href={"sms:" + process.env.NEXT_PUBLIC_PHONE_NUMBER}>
            <img src="/moneypayment.gif" width="150" />
          </a>
          <span className={styles.divider} />
          <div className={styles.flex} onClick={onLogout}>
            <img src="/bomb.gif" width="100" height="100" />
            <p>logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
